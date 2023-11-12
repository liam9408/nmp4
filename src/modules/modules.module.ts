import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from 'src/database/entities/assignment.model';
import { Module as ModuleModel } from 'src/database/entities/module.model';
import { Answer } from 'src/database/entities/answer.model';
import { Scenario } from 'src/database/entities/scenario.model';
import { Question } from 'src/database/entities/question.model';
import { Module } from '@nestjs/common';
import { Result } from 'src/database/entities/result.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ModuleModel,
      Assignment,
      Answer,
      Scenario,
      Question,
      Result,
    ]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
