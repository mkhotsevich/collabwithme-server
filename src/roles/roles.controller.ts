import { Controller, Get, Param } from '@nestjs/common';
import { RoleName } from './roles.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  getAll() {
    return this.rolesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.rolesService.getById(+id);
  }

  @Get(':name')
  getByName(@Param('name') name: RoleName) {
    return this.rolesService.getByName(name);
  }
}
