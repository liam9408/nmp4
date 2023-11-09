import { FindOptions } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from '../db/entities/role.model';
import { FindRoleDto } from './dto/find-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  async findAll(findResultDto?: FindOptions<FindRoleDto>): Promise<Role[]> {
    const results = await this.roleModel.findAll({ ...findResultDto });
    return results.map((result) => result.toJSON());
  }

  async findOne(findResultDto?: FindOptions<FindRoleDto>): Promise<Role> {
    const result = await this.roleModel.findOne({ ...findResultDto });
    return result.toJSON();
  }
}
