import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from 'src/database/entities/answer.model';
import { Result } from 'src/database/entities/result.model';
import { User } from 'src/database/entities/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Answer, Result, User])],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
