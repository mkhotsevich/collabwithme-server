import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCollaborationDto } from './collaborations.dto';
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

  @Get()
  getAll() {
    return this.collaborationsService.getAll();
  }
}
