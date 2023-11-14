import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ResultsService } from 'src/results/results.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { ReportsService } from './reports.service';
import { StudentProgressResponse, UserAssignment } from './reports.interface';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { ModulesService } from 'src/modules/modules.service';
import { Module } from 'src/modules/modules.interface';
import { AnswersService } from 'src/answers/answers.service';
import { groupBy } from 'lodash';
import { User } from 'src/users/user.interface';

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

    const tenantUserAssignmentResults: Array<UserAssignment> =
      await this.userService.findUserAssignments({
        where: {
          tenant_id: tenantId,
        },
      });

    /**
     * student
     *    assignment completion rate = answers / assignment
     *        assignment -> scenario -> question -> answers -> results
     *    attempts = count(answers)
     *    timespent = TBA // todo: need to store recording duration in db
     *    best score = sort result by score -> pronunciation
     *    assignments = count(assignments)
     */
    const userProgress: StudentProgressResponse[] =
      tenantUserAssignmentResults.map((user: UserAssignment) => {
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
      });

    return userProgress;
  }

  @Get('insights/pace-and-pauses')
  getPaceAndPausesReport(@Param('id') id: string) {
    return this.resultsService.findOne({ where: { id } });
  }

  @Get('insights')
  async getAssignmentCompletionReport(@Request() req) {
    const { tenantId } = req;
    /**
     * pace and pauses
     *    t
     * module completion
     *    per module, total assigned vs total completed(all Questions in Assignments have Answers), percentage + attempts
     * clarity & intonation
     *    average clarity and average intonation
     * student practice frequency
     *    num of answers per student, group by range
     * require attention
     *    scenario / question  attempts, completion, pass rate, time spent, highest score, avg clarity, avg intonation, avg pace
     */

    // get list of users for further query
    const findTenantQuery = {
      where: {
        tenant_id: tenantId,
      },
    };
    const tenantUsers = await this.userService.findAll(findTenantQuery);
    const tenantUserIds = tenantUsers.map((tu) => tu.id);

    const getModuleCompletion = async () => {
      const allTenantModules: Array<Module> =
        await this.modulesService.findAllModules(findTenantQuery);
      const moduleCompletions =
        ReportsService.calculateModuleCompletion(allTenantModules);
      const topModuleCompletions =
        ReportsService.getTopOrBottomModuleCompletions(
          moduleCompletions,
          'ASC',
        );
      return topModuleCompletions;
    };

    const getClarityIntonation = async () => {
      const resultAttributes = ['id', 'intonation', 'pronunciation'];
      const allResults = await this.resultsService.findAll({
        where: { created_by_id: tenantUserIds },
        attributes: resultAttributes,
      });
      const avgClarityIntonation =
        ReportsService.calculateAverageIntonationClarity(allResults);
      return avgClarityIntonation;
    };

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

    const getRequireAttentionModules = async () => {
      // get completion rate first, work backwards to get scenario data
      const tenantUserAssignments: Array<User> =
        await this.userService.findUserAssignments(findTenantQuery);

      const bottomCompletionModules =
        ReportsService.getTopOrBottomModuleCompletions(
          allTenantModules,
          'DESC',
        );

      return bottomCompletionModules;
    };

    const [
      requireAttentionModules,
      topModuleCompletions,
      avgClarityIntonation,
      practiceFrequency,
    ] = await Promise.all([
      getRequireAttentionModules(),
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
  }
}
