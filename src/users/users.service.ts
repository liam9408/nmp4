import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../db/entities/user.model';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(findResultDto?: FindOptions<FindUserDto>): Promise<User[]> {
    const results = await this.userModel.findAll({ ...findResultDto });
    return results.map((result) => result.toJSON());
  }

  async findOne(findResultDto?: FindOptions<FindUserDto>): Promise<User> {
    const result = await this.userModel.findOne({ ...findResultDto });
    return result;
  }
}
