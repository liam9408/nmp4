import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../db/entities/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { Tenant } from 'src/db/entities/tenant.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Tenant]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
