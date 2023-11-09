import { Module, forwardRef } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Result } from 'src/db/entities/result.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Result]), forwardRef(() => AuthModule)],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
