import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RulesService } from './rules.service';

@Controller('rules')
export class RulesController {
  constructor(private rulesService: RulesService) {}

  @Post()
  create(@Body() dto: CreateRuleDto) {
    return this.rulesService.create(dto);
  }

  @Get()
  getAll() {
    return this.rulesService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.rulesService.get(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRuleDto) {
    return this.rulesService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rulesService.delete(+id);
  }
}
