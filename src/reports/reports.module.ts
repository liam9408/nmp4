import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { UsersModule } from 'src/users/users.module';
import { ResultsModule } from 'src/results/results.module';
import { AssignmentsModule } from 'src/assignments/assignments.module';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports: [ResultsModule, UsersModule, AssignmentsModule, ModulesModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
