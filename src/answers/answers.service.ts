import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Answer } from '../database/entities/answer.model';
import { FindAnswerDto } from './dto/find-answer.dto';
import { Result } from 'src/database/entities/result.model';
import { User } from 'src/database/entities/user.model';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer)
    private readonly answerModel: typeof Answer,
    @InjectModel(Result)
    private readonly resultsModel: typeof Result,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(findAnswerDto?: FindOptions<FindAnswerDto>): Promise<Answer[]> {
    const results = await this.answerModel.findAll({
      ...findAnswerDto,
      include: [{ model: this.resultsModel }, { model: this.userModel }],
    });
    return results.map((result) => result.toJSON());
  }

  async findOne(findAnswerDto?: FindOptions<FindAnswerDto>): Promise<Answer> {
    const result = await this.answerModel.findOne({ ...findAnswerDto });
    return result.toJSON();
  }
}
