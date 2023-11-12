import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FindModulesDto } from './dto/find-modules.dto';
import { Assignment } from 'src/database/entities/assignment.model';
import { Answer } from 'src/database/entities/answer.model';
import { Scenario } from 'src/database/entities/scenario.model';
import { Question } from 'src/database/entities/question.model';
import { Result } from 'src/database/entities/result.model';
import { Module } from 'src/database/entities/module.model';
import { Module as ModuleWithAssignment } from './modules.interface';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Module)
    private readonly moduleModel: typeof Module,
    @InjectModel(Assignment)
    private readonly assignmentModel: typeof Assignment,
    @InjectModel(Answer)
    private readonly answerModel: typeof Answer,
    @InjectModel(Scenario)
    private readonly scenarioModel: typeof Scenario,
    @InjectModel(Question)
    private readonly questionModel: typeof Question,
    @InjectModel(Result)
    private readonly resultModel: typeof Result,
  ) {}

  async findAllModules(
    findModuleDto?: FindOptions<FindModulesDto>,
  ): Promise<ModuleWithAssignment[]> {
    const results = await this.moduleModel.findAll({
      ...findModuleDto,
      include: [
        {
          model: this.scenarioModel,
          include: [
            {
              model: this.assignmentModel,
              attributes: ['id'],
              include: [
                {
                  model: this.scenarioModel,
                  attributes: ['id'],
                  include: [
                    {
                      model: this.questionModel,
                      attributes: ['id'],
                      include: [
                        {
                          model: this.answerModel,
                          attributes: ['id'],
                          include: [{ model: this.resultModel }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    return results.map((result) => result.toJSON());
  }

  async findOne(findModuleDto?: FindOptions<FindModulesDto>): Promise<Module> {
    const result = await this.moduleModel.findOne({ ...findModuleDto });
    return result;
  }
}
