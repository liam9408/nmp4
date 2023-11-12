import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ResultsModule } from './results/results.module';
import { ReportsModule } from './reports/reports.module';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './role/role.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { AssignmentsModule } from './assignments/assignments.module';
import { ModulesModule } from './modules/modules.module';
import { ScenariosModule } from './scenarios/scenarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    ReportsModule,
    UsersModule,
    ResultsModule,
    RoleModule,
    UserRolesModule,
    AssignmentsModule,
    ModulesModule,
    ScenariosModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
