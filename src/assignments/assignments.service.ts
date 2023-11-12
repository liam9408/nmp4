import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FindAssignmentDto } from './dto/find-assignment.dto';
import { Assignment } from 'src/database/entities/assignment.model';
import { Answer } from 'src/database/entities/answer.model';
import { Scenario } from 'src/database/entities/scenario.model';
import { Question } from 'src/database/entities/question.model';
import { Result } from 'src/database/entities/result.model';

@Injectable()
export class AssignmentsService {
  constructor(
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

  async findAllAssignments(
    findAssignmentDto?: FindOptions<FindAssignmentDto>,
  ): Promise<Assignment[]> {
    const results = await this.assignmentModel.findAll({
      ...findAssignmentDto,
      include: [
        {
          model: this.scenarioModel,
          include: [
            {
              model: this.questionModel,
              include: [
                {
                  model: this.answerModel,
                  include: [
                    {
                      model: this.resultModel,
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

  async findOne(
    findResultDto?: FindOptions<FindAssignmentDto>,
  ): Promise<Assignment> {
    const result = await this.assignmentModel.findOne({ ...findResultDto });
    return result;
  }
}
