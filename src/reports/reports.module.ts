import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { UsersModule } from 'src/users/users.module';
import { ResultsModule } from 'src/results/results.module';
import { AssignmentsModule } from 'src/assignments/assignments.module';
import { ModulesModule } from 'src/modules/modules.module';
import { AnswersModule } from 'src/answers/answers.module';

@Module({
  imports: [
    ResultsModule,
    UsersModule,
    AssignmentsModule,
    ModulesModule,
    AnswersModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
