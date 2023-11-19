import { Injectable } from '@nestjs/common';
import {
  AssignmentCompletionRate,
  StudentProgressResponse,
  UserAssignment,
} from './reports.interface';
import { Assignment } from 'src/assignments/assignments.interface';
import { Result } from 'src/results/results.interface';
import { Module } from 'src/modules/modules.interface';
import { quickSort } from 'src/common/utils/quickSort';
import { roundToOneDecimal } from 'src/common/utils/maths';
import { Answer } from 'src/database/entities/answer.model';

@Injectable()
export class ReportsService {
  static getStudentAssignmentCompletion(
    assignments: Assignment[],
  ): AssignmentCompletionRate {
    const { totalQuestions, totalAnswers } = assignments.reduce(
      (totals, assignment) => {
        totals.totalQuestions += assignment.scenario.questions.length;
        totals.totalAnswers += assignment.scenario.questions.reduce(
          (total, question) => total + question.answers.length,
          0,
        );
        return totals;
      },
      { totalQuestions: 0, totalAnswers: 0 },
    );

    const completion = this.calculateCompletionRate(
      totalAnswers,
      totalQuestions,
    );
    return { totalAnswers, totalQuestions, completion };
  }

  static calculateCompletionRate(totalAnswers: number, totalQuestions: number) {
    if (totalAnswers === 0 && totalQuestions === 0) {
      return 0;
    } else if (totalAnswers >= totalQuestions) {
      return 100;
    } else {
      return (totalAnswers / totalQuestions) * 100;
    }
  }

  static processStudentAssignments(tenantUserAssignmentResults, callback) {
    const userProgress: StudentProgressResponse[] =
      tenantUserAssignmentResults.map((user: UserAssignment) => {
        return callback(user);
      });
    return userProgress;
  }

  static getStudentProgress(user) {
    const { totalAnswers, completion } =
      ReportsService.getStudentAssignmentCompletion(user.assignments);
    const bestScore = ReportsService.getStudentBestStore(user.assignments);

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      completionRate: completion,
      attempts: totalAnswers,
      timeSpent: null,
      bestScore: bestScore,
      assignments: user.assignments.length,
    };
  }

  static getStudentBestStore(assignments: Assignment[]) {
    const allResults: Result[] = assignments.flatMap((assignment) =>
      assignment.scenario.questions.flatMap((question) =>
        question.answers
          .map((answer) => answer.result)
          .filter((result) => result !== null),
      ),
    );

    const bestScore = quickSort(allResults, 'pronunciation', 'DESC')[0];
    return bestScore ? bestScore.pronunciation : null;
  }

  static calculateModuleCompletion(modules: Module[]) {
    return modules.map((module) => {
      const totalAssignment = module.scenarios.reduce(
        (total, scenario) => total + scenario.assignments.length,
        0,
      );

      const totalCompletion = module.scenarios
        .flatMap((scenario) => scenario.assignments)
        .filter((assignment) =>
          assignment.scenario.questions.every(
            (question) => question.answers.length !== 0,
          ),
        ).length;

      return {
        id: module.id,
        name: module.name,
        totalAssignment,
        totalCompletion,
        completionRate: totalCompletion / totalAssignment,
      };
    });

    // const results = [];

    // for (const module of modules) {
    //   let totalAssignment = 0;
    //   // let totalAttempts = 0;
    //   let totalCompletion = 0;
    //   for (const scenario of module.scenarios) {
    //     totalAssignment += scenario.assignments.length;

    //     for (const assignment of scenario.assignments) {
    //       // totalAttempts += 0;
    //       const completed = assignment.scenario.questions.every(
    //         (question) => question.answers.length !== 0,
    //       );

    //       if (completed) {
    //         totalCompletion += 1;
    //       }
    //     }
    //   }

    //   const moduleCompletion = {
    //     id: module.id,
    //     name: module.name,
    //     totalAssignment,
    //     totalCompletion,
    //     completionRate: totalCompletion / totalAssignment,
    //   };

    //   results.push(moduleCompletion);
    // }

    // return results;
  }

  static getTopOrBottomModuleCompletions(data, order, sortkey, number = 5) {
    const sortedResults = quickSort(data, sortkey, order);
    return sortedResults.splice(0, number);
  }

  static calculateAverageScores(results) {
    // let totalClarity = 0;
    // let totalIntonation = 0;
    // let totalPace = 0;

    // for (let i = 0; i < results.length; i++) {
    //   totalClarity += Number(results[i].pronunciation);
    //   totalIntonation += Number(results[i].intonation);
    //   totalPace += Number(results[i].pace);
    // }

    const totalScores = results.reduce(
      (totals, result) => {
        totals.totalClarity += Number(result.pronunciation);
        totals.totalIntonation += Number(result.intonation);
        totals.totalPace += Number(result.pace);
        return totals;
      },
      { totalClarity: 0, totalIntonation: 0, totalPace: 0 },
    );

    const avgClarity = roundToOneDecimal(
      totalScores.totalClarity / results.length,
    );
    const avgIntonation = roundToOneDecimal(
      totalScores.totalIntonation / results.length,
    );
    const avgPace = roundToOneDecimal(totalScores.totalPace / results.length);

    return { avgClarity, avgIntonation, avgPace };
  }

  static tallyPracticeFrequency(data: { [key: number]: Answer[] }) {
    const practiceFrequencyTally = {
      '0 - 5': 0,
      '6 - 10': 0,
      '11 - 20': 0,
      '21 - 30': 0,
      '31 - 40': 0,
      '41 +': 0,
    };

    function tally(frequency: number) {
      if (frequency <= 5) {
        practiceFrequencyTally['0 - 5']++;
      } else if (frequency >= 6 && frequency <= 10) {
        practiceFrequencyTally['6 - 10']++;
      } else if (frequency >= 11 && frequency <= 20) {
        practiceFrequencyTally['11 - 20']++;
      } else if (frequency >= 21 && frequency <= 30) {
        practiceFrequencyTally['21 - 30']++;
      } else if (frequency >= 31 && frequency <= 40) {
        practiceFrequencyTally['31 - 40']++;
      } else if (frequency >= 41) {
        practiceFrequencyTally['41 +']++;
      }
    }

    for (const [, val] of Object.entries(data)) {
      tally(val.length);
    }

    return Object.entries(practiceFrequencyTally).map(
      ([frequency, amount]) => ({
        frequency,
        amount,
      }),
    );
  }

  static calculateAssignmenetCompletion(assignments: Assignment[]) {
    const scenarioCompletionTally = new Map();

    // create the tally
    for (const assignment of assignments) {
      const questions = assignment.scenario.questions;
      const scenarioId = assignment.scenario.id;

      for (const question of questions) {
        const OBJ_KEY = `${scenarioId} + ${question.id}`;

        if (!scenarioCompletionTally.has(OBJ_KEY)) {
          const scenario = {
            id: assignment.scenario.id,
            name: assignment.scenario.name,
          };
          scenarioCompletionTally.set(OBJ_KEY, {
            totalAssignedQuestions: 1,
            totalCompletedQuestions: 0,
            completionRate: 0,
            question,
            scenario,
          });
        } else {
          const tally = scenarioCompletionTally.get(OBJ_KEY);
          tally.totalAssignedQuestions++;
          if (question.answers.length >= 1) {
            tally.totalCompletedQuestions++;
          }
        }
      }
    }

    // Calculate completion rates after all assignments have been processed
    for (const tally of scenarioCompletionTally.values()) {
      tally.completionRate = this.calculateCompletionRate(
        tally.totalCompletedQuestions,
        tally.totalAssignedQuestions,
      );
    }

    return Array.from(scenarioCompletionTally.values());
  }

  static getRequiredAttentionMetadata(data) {
    return data.map((row) => {
      const question = {
        id: row.question.id,
        name: row.question.content,
      };

      const flapMapResults = (question) => {
        return question.answers
          .flatMap((answer) => answer.result)
          .filter((result) => result !== null);
      };

      const getHighestScore = (results) => {
        return roundToOneDecimal(
          Math.max(...results.map((result) => result.pronunciation)),
        );
      };

      const getAvgScores = (results) => {
        return ReportsService.calculateAverageScores(results);
      };

      const results = flapMapResults(row.question);
      const { avgClarity, avgIntonation, avgPace } = getAvgScores(results);

      return {
        scenario: row.scenario,
        question,
        attempts: row.question.answers.length,
        completion: row.completionRate,
        passRate: null,
        timeSpent: null,
        highestScore: getHighestScore(results),
        avgClarity,
        avgIntonation,
        avgPace,
      };
    });
  }
}
