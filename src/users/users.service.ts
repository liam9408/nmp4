import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User as UserInterFace } from './user.interface';
import { User } from '../database/entities/user.model';
import { FindUserDto } from './dto/find-user.dto';
import { Assignment } from 'src/database/entities/assignment.model';
import { Answer } from 'src/database/entities/answer.model';
import { Scenario } from 'src/database/entities/scenario.model';
import { Question } from 'src/database/entities/question.model';
import { Result } from 'src/database/entities/result.model';
import { UserAssignment } from 'src/reports/reports.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
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

  async findAll(
    findResultDto?: FindOptions<FindUserDto>,
    // attributes?: string[],
  ): Promise<User[]> {
    const results = await this.userModel.findAll({
      ...findResultDto,
      attributes: {
        // ...(attributes && { include: attributes }),
        exclude: ['password', 'verification_code'],
      },
    });
    return results.map((result) => result.toJSON());
  }

  async findUserAssignments(
    findResultDto?: FindOptions<FindUserDto>,
  ): Promise<UserAssignment[]> {
    const results = await this.userModel.findAll({
      ...findResultDto,
      attributes: { exclude: ['password', 'verification_code'] },
      include: [
        {
          model: this.assignmentModel,
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
        },
      ],
    });
    return results.map((result) => result.toJSON());
  }

  async findOne(findResultDto?: FindOptions<FindUserDto>): Promise<User> {
    const result = await this.userModel.findOne({ ...findResultDto });
    return result;
  }

  async findStudentAssignments(
    findResultDto?: FindOptions<FindUserDto>,
  ): Promise<UserInterFace> {
    const result = await this.userModel.findOne({
      ...findResultDto,
      attributes: { exclude: ['password', 'verification_code'] },
      include: [
        {
          model: this.assignmentModel,
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
        },
      ],
    });
    return result.toJSON();
  }
}
