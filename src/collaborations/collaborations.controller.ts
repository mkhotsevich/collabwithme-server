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
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateCollaborationDto,
  UpdateCollaborationDto,
} from './collaborations.dto';
import { CollaborationsService } from './collaborations.service';
import { User } from 'src/users/users.decorator';
import { AuthPayload } from 'src/auth/auth.entity';

@Controller('collaborations')
export class CollaborationsController {
  constructor(private collaborationsService: CollaborationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateCollaborationDto, @User() user: AuthPayload) {
    return this.collaborationsService.create({ ...dto, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Body() dto: UpdateCollaborationDto,
    @User() user: AuthPayload,
    @Param('id') id: string,
  ) {
    return this.collaborationsService.update(+id, dto, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @User() user: AuthPayload) {
    return this.collaborationsService.delete(+id, user.id);
  }

  @Get()
  getAll() {
    return this.collaborationsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.collaborationsService.getById(+id);
  }

  @Get('users/:id')
  getByUserId(@Param('id') userId: string) {
    return this.collaborationsService.getByUserId(+userId);
  }
}
