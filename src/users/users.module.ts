import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../database/entities/user.model';
import { Tenant } from 'src/database/entities/tenant.model';
import { Assignment } from 'src/database/entities/assignment.model';
import { Answer } from 'src/database/entities/answer.model';
import { Scenario } from 'src/database/entities/scenario.model';
import { Question } from 'src/database/entities/question.model';
import { Result } from 'src/database/entities/result.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Tenant,
      Assignment,
      Answer,
      Scenario,
      Question,
      Result,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
