import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FindQuestionDto } from './dto/find-question.dto';
import { Question } from 'src/database/entities/question.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private readonly questionModel: typeof Question,
  ) {}

  async findAll(
    findQuestionDto?: FindOptions<FindQuestionDto>,
  ): Promise<Question[]> {
    const results = await this.questionModel.findAll({
      ...findQuestionDto,
    });
    return results.map((result) => result.toJSON());
  }

  async findOne(
    findQuestionDto?: FindOptions<FindQuestionDto>,
  ): Promise<Question> {
    const result = await this.questionModel.findOne({ ...findQuestionDto });
    return result.toJSON();
  }
}
