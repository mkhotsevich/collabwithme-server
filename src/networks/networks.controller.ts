import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNetworkDto, UpdateNetworkDto } from './networks.dto';
import { NetworksService } from './networks.service';

@Controller('networks')
export class NetworksController {
  constructor(private networksService: NetworksService) {}

  @Post()
  create(@Body() dto: CreateNetworkDto) {
    return this.networksService.create(dto);
  }

  @Get()
  getAll() {
    return this.networksService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.networksService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNetworkDto) {
    return this.networksService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.networksService.delete(+id);
  }
}
