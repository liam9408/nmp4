import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { UsersModule } from 'src/users/users.module';
import { ResultsModule } from 'src/results/results.module';

@Module({
  imports: [ResultsModule, UsersModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
