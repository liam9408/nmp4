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
    let totalQuestions = 0;
    let totalAnswers = 0;

    for (const assignment of assignments) {
      for (const question of assignment.scenario.questions) {
        totalQuestions += 1;
        totalAnswers += question.answers.length;
      }
    }

    const completion = this.calculateCompletionRate(
      totalAnswers,
      totalQuestions,
    );
    return { totalAnswers, totalQuestions, completion };
  }

  static calculateCompletionRate(totalAnswers: number, totalQuestions: number) {
    return totalAnswers === 0 && totalQuestions === 0
      ? 0
      : totalAnswers >= totalQuestions
      ? 100
      : totalAnswers / totalQuestions;
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
      timeSpent: '',
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
    const results = [];

    for (const module of modules) {
      let totalAssignment = 0;
      // let totalAttempts = 0;
      let totalCompletion = 0;
      for (const scenario of module.scenarios) {
        totalAssignment += scenario.assignments.length;

        for (const assignment of scenario.assignments) {
          // totalAttempts += 0;
          const completed = assignment.scenario.questions.every(
            (question) => question.answers.length !== 0,
          );

          if (completed) {
            totalCompletion += 1;
          }
        }
      }

      const moduleCompletion = {
        id: module.id,
        name: module.name,
        totalAssignment,
        totalCompletion,
        completionRate: totalCompletion / totalAssignment,
      };

      results.push(moduleCompletion);
    }

    return results;
  }

  static getTopOrBottomModuleCompletions(data, order, sortkey, number = 5) {
    const sortedResults = quickSort(data, sortkey, order);
    return sortedResults.splice(0, number);
  }

  static calculateAverageScores(results) {
    let totalClarity = 0;
    let totalIntonation = 0;
    let totalPace = 0;

    for (let i = 0; i < results.length; i++) {
      totalClarity += Number(results[i].pronunciation);
      totalIntonation += Number(results[i].intonation);
      totalPace += Number(results[i].pace);
    }

    const avgClarity = roundToOneDecimal(totalClarity / results.length);
    const avgIntonation = roundToOneDecimal(totalIntonation / results.length);
    const avgPace = roundToOneDecimal(totalPace / results.length);

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
      }
      if (frequency >= 6 && frequency <= 10) {
        practiceFrequencyTally['6 - 10']++;
      }
      if (frequency >= 11 && frequency <= 20) {
        practiceFrequencyTally['11 - 20']++;
      }
      if (frequency >= 21 && frequency <= 30) {
        practiceFrequencyTally['21 - 30']++;
      }
      if (frequency >= 31 && frequency <= 40) {
        practiceFrequencyTally['31 - 40']++;
      }
      if (frequency >= 41) {
        practiceFrequencyTally['41 +']++;
      }
    }

    for (const [, val] of Object.entries(data)) {
      tally(val.length);
    }

    return practiceFrequencyTally;
  }

  static calculateAssignmenetCompletion(assignments: Assignment[]) {
    const scenarioCompletionTally = {};

    for (const assignment of assignments) {
      const questions = assignment.scenario.questions;
      const scenarioId = assignment.scenario.id;

      for (const question of questions) {
        const OBJ_KEY = `${scenarioId} + ${question.id}`;
        // if not processed question in scenario yet, create new key value pair in tally object
        if (!scenarioCompletionTally[OBJ_KEY]) {
          const scenario = {
            id: assignment.scenario.id,
            name: assignment.scenario.name,
          };
          scenarioCompletionTally[OBJ_KEY] = {
            totalAssignedQuestions: 1,
            totalCompletedQuestions: 0,
            completionRate: 0,
            question,
            scenario,
          };
        } else {
          // processing scenario question from another student's assignment
          scenarioCompletionTally[OBJ_KEY].totalAssignedQuestions++;
          question.answers.length >= 1 &&
            scenarioCompletionTally[OBJ_KEY].totalCompletedQuestions++;

          scenarioCompletionTally[OBJ_KEY].completionRate =
            this.calculateCompletionRate(
              scenarioCompletionTally[OBJ_KEY].totalCompletedQuestions,
              scenarioCompletionTally[OBJ_KEY].totalAssignedQuestions,
            );
        }
      }
      // }
    }

    return Object.values(scenarioCompletionTally);
  }

  static getRequiredAttentionMetadata(data) {
    return data.map((row) => {
      const question = {
        id: row.question.id,
        name: row.question.name,
      };

      const flapMapResults = (question) => {
        return question.answers
          .flatMap((answer) => answer.result)
          .filter((result) => result !== null);
      };

      const getHighestScore = (question) => {
        const flatMapped = flapMapResults(question);
        return roundToOneDecimal(
          quickSort(flatMapped, 'pronunciation', 'DESC')[0].pronunciation,
        );
      };

      const getAvgScores = (question) => {
        const results = flapMapResults(question);
        return ReportsService.calculateAverageScores(results);
      };

      const { avgClarity, avgIntonation, avgPace } = getAvgScores(row.question);

      return {
        scenario: row.scenario,
        question,
        attempts: row.question.answers.length,
        completion: row.completionRate,
        passRate: null,
        timeSpent: null,
        highestScore: getHighestScore(row.question),
        avgClarity,
        avgIntonation,
        avgPace,
      };
    });
  }
}
