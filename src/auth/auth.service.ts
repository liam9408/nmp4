import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Student } from './models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student)
    private readonly userModel: typeof Student,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<Student> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
