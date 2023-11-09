import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ResultsService } from 'src/results/results.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersService } from 'src/users/users.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly resultsService: ResultsService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  async findAll(@Request() req) {
    const { tenantId } = req;
    const allTenantUsers = await this.userService.findAll({
      where: {
        tenant_id: tenantId,
      },
    });

    const allUserIds = allTenantUsers.map((user) => user.id);
    return this.resultsService.findAll({
      where: { created_by_id: allUserIds },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne({ where: { id } });
  }
}
