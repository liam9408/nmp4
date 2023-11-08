import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/user.model';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [SequelizeModule.forFeature([Student])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
