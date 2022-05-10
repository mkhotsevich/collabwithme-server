import { Controller, Get, Param } from '@nestjs/common';
import { RulesService } from './rules.service';

@Controller('rules')
export class RulesController {
  constructor(private rulesService: RulesService) {}

  @Get()
  getAll() {
    return this.rulesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.rulesService.getById(+id);
  }
}
