import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLinkDto } from './links.dto';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Post()
  create(@Body() dto: CreateLinkDto) {
    return this.linksService.create(dto);
  }

  @Get()
  getAll() {
    return this.linksService.getAll();
  }
}
