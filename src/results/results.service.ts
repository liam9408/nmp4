import { Injectable } from '@nestjs/common';
import { FindResultDto } from './dto/find-result.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Result } from 'src/database/entities/result.model';
import { FindOptions } from 'sequelize';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Result) private readonly resultModel: typeof Result,
  ) {}

  async findAll(findResultDto?: FindOptions<FindResultDto>): Promise<Result[]> {
    const results = await this.resultModel.findAll({ ...findResultDto });
    return results.map((result) => result.toJSON());
  }

  async findOne(findResultDto?: FindOptions<FindResultDto>): Promise<Result> {
    const result = await this.resultModel.findOne({ ...findResultDto });
    return result.toJSON();
  }
}
