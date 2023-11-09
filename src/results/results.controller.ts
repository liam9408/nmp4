import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.resultsService.findOne({ where: { id: +id } });
  }
}
