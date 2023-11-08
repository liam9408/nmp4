import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  controllers: [ReportsController],
  providers: [
    ReportsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ReportsModule {}
