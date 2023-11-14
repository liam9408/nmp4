import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Answer } from '../database/entities/answer.model';
import { FindAnswerDto } from './dto/find-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer)
    private readonly answerModel: typeof Answer,
  ) {}

  async findAll(findAnswerDto?: FindOptions<FindAnswerDto>): Promise<Answer[]> {
    const results = await this.answerModel.findAll({ ...findAnswerDto });
    return results.map((result) => result.toJSON());
  }

  async findOne(findAnswerDto?: FindOptions<FindAnswerDto>): Promise<Answer> {
    const result = await this.answerModel.findOne({ ...findAnswerDto });
    return result.toJSON();
  }
}
