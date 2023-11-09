import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FindUseRoleDto } from './dto/find-user-role.dto';
import { UserRole } from 'src/db/entities/userRole.model';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectModel(UserRole)
    private readonly userRole: typeof UserRole,
  ) {}

  async findAll(
    findResultDto?: FindOptions<FindUseRoleDto>,
  ): Promise<UserRole[]> {
    const results = await this.userRole.findAll({ ...findResultDto });
    return results.map((result) => result.toJSON());
  }

  async findOne(
    findResultDto?: FindOptions<FindUseRoleDto>,
  ): Promise<UserRole> {
    const result = await this.userRole.findOne({ ...findResultDto });
    return result.toJSON();
  }
}
