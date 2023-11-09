import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('userRoles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    return this.userRolesService.findOne({ where: { user_id: +id } });
  }
}
