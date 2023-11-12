import { Injectable } from '@nestjs/common';
import { AssignmentCompletionRate } from './reports.interface';
import { Assignment } from 'src/assignments/assignments.interface';
import { Result } from 'src/results/results.interface';
import { Module } from 'src/modules/modules.interface';
import { quickSort } from 'src/common/utils/quickSort';
import { roundToOneDecimal } from 'src/common/utils/maths';

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

    const bestScore = quickSort(allResults, 'pronunciation')[0];
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

  static getTopModuleCompletions(data) {
    const sortedResults = quickSort(data, 'completionRate');
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
}
