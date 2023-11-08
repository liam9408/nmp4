import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_GUARD } from '@nestjs/core';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../db/entities/user.model';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
