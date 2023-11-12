import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from 'src/database/entities/assignment.model';
import { Answer } from 'src/database/entities/answer.model';
import { Scenario } from 'src/database/entities/scenario.model';
import { Question } from 'src/database/entities/question.model';
import { Result } from 'src/database/entities/result.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Assignment,
      Answer,
      Scenario,
      Question,
      Result,
    ]),
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
