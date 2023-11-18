import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ResultsService } from 'src/results/results.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { ReportsService } from './reports.service';
import { UserAssignment } from './reports.interface';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { ModulesService } from 'src/modules/modules.service';
import { Module } from 'src/modules/modules.interface';
import { AnswersService } from 'src/answers/answers.service';
import { groupBy } from 'lodash';
import { Assignment } from 'src/assignments/assignments.interface';

@UseGuards(AuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly resultsService: ResultsService,
    private readonly userService: UsersService,
    private readonly assignmentService: AssignmentsService,
    private readonly modulesService: ModulesService,
    private readonly answerService: AnswersService,
  ) {}

  @Get('progress/students')
  async getStudentProgressReort(@Request() req) {
    const { tenantId } = req;

    /**
     * student
     *    assignment completion rate = answers / assignment
     *        assignment -> scenario -> question -> answers -> results
     *    attempts = count(answers)
     *    timespent = TBA // todo: need to store recording duration in db
     *    best score = sort result by score -> pronunciation
     *    assignments = count(assignments)
     */

    const tenantUserAssignmentResults: Array<UserAssignment> =
      await this.userService.findUserAssignments({
        where: {
          tenant_id: tenantId,
        },
      });

    const userProgress = ReportsService.processStudentAssignments(
      tenantUserAssignmentResults,
      ReportsService.getStudentProgress,
    );
    return userProgress;
  }

  @Get('insights')
  async getAssignmentCompletionReport(@Request() req) {
    const { tenantId } = req;

    // Get list of users for further query
    const findTenantQuery = {
      where: {
        tenant_id: tenantId,
      },
    };
    const tenantUsers = await this.userService.findAll(findTenantQuery);
    const tenantUserIds = tenantUsers.map((tenantUser) => tenantUser.id);

    // Calculate module completion
    const getModuleCompletion = async () => {
      const allTenantModules: Array<Module> =
        await this.modulesService.findAllModules(findTenantQuery);
      const moduleCompletions =
        ReportsService.calculateModuleCompletion(allTenantModules);
      const topModuleCompletions =
        ReportsService.getTopOrBottomModuleCompletions(
          moduleCompletions,
          'ASC',
          'completionRate',
        );
      return topModuleCompletions;
    };

    // Calculate average clarity and intonation
    const getClarityIntonation = async () => {
      const resultAttributes = ['id', 'intonation', 'pronunciation'];
      const allResults = await this.resultsService.findAll({
        where: { created_by_id: tenantUserIds },
        attributes: resultAttributes,
      });
      const avgClarityIntonation =
        ReportsService.calculateAverageScores(allResults);
      return avgClarityIntonation;
    };

    // Calculate student practice frequency
    const getStudentPracticeFrequency = async () => {
      const allAnswers = await this.answerService.findAll({
        where: {
          created_by_id: tenantUserIds,
        },
      });
      const groupedByStudent = groupBy(allAnswers, 'created_by_id');
      const practiceFrequencyTally =
        ReportsService.tallyPracticeFrequency(groupedByStudent);
      return practiceFrequencyTally;
    };

    // Get questions that require attention
    const getRequireAttentionQuestions = async () => {
      const allTenantAssignments: Array<Assignment> =
        await this.assignmentService.findAllAssignments({
          where: { created_by_id: tenantUserIds },
        });
      const withCompletion =
        ReportsService.calculateAssignmenetCompletion(allTenantAssignments);
      const bottomFive = ReportsService.getTopOrBottomModuleCompletions(
        withCompletion,
        'DESC',
        'completionRate',
        5,
      );
      const metadata = ReportsService.getRequiredAttentionMetadata(bottomFive);
      return metadata;
    };

    try {
      const [
        requireAttentionModules,
        topModuleCompletions,
        avgClarityIntonation,
        practiceFrequency,
      ] = await Promise.all([
        getRequireAttentionQuestions(),
        getModuleCompletion(),
        getClarityIntonation(),
        getStudentPracticeFrequency(),
      ]);

      return {
        requireAttentionModules,
        practiceFrequency,
        avgClarityIntonation,
        topModuleCompletions,
      };
    } catch (error) {
      // Handle error gracefully
      console.error(error);
      throw new Error('An error occurred while generating the report.');
    }
  }
}
