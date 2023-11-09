import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../database/entities/user.model';
import { Tenant } from 'src/database/entities/tenant.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Tenant]), UsersModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
