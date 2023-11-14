import { Injectable } from '@nestjs/common';
import { AssignmentCompletionRate } from './reports.interface';
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

    const completion =
      totalAnswers === 0 && totalQuestions === 0
        ? 0
        : totalAnswers >= totalQuestions
        ? 100
        : totalAnswers / totalQuestions;

    return { totalAnswers, totalQuestions, completion };
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

  static getTopOrBottomModuleCompletions(data, order) {
    const sortedResults = quickSort(data, 'completionRate', order);
    return sortedResults.splice(0, 5);
  }

  static calculateAverageIntonationClarity(results) {
    let totalClarity = 0;
    let totalIntonation = 0;

    for (let i = 0; i < results.length; i++) {
      totalClarity += Number(results[i].pronunciation);
      totalIntonation += Number(results[i].intonation);
    }

    const avgClarity = roundToOneDecimal(totalClarity / results.length);
    const avgIntonation = roundToOneDecimal(totalIntonation / results.length);

    return { avgClarity, avgIntonation };
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
}
