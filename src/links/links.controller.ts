import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthPayload } from 'src/auth/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/users.decorator';
import { CreateLinkDto, UpdateLinkDto } from './links.dto';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateLinkDto, @User() user: AuthPayload) {
    return this.linksService.create({ ...dto, userId: user.id });
  }

  @Get()
  getAll() {
    return this.linksService.getAll();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @User() user: AuthPayload) {
    return this.linksService.delete(+id, +user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @User() user: AuthPayload,
    @Body() dto: UpdateLinkDto,
  ) {
    return this.linksService.update(+id, +user.id, dto);
  }
}
