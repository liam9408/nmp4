import { Controller, Get, Param } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get()
  findAll() {
    return this.modulesService.findAllModules();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.modulesService.findOne({ where: { id: +id } });
  }
}
