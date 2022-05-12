import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthPayload } from 'src/auth/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/users.decorator';
import { CreateResponseDto } from './responses.dto';
import { ResponsesService } from './responses.service';

@Controller('responses')
export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateResponseDto, @User() user: AuthPayload) {
    return this.responsesService.create({ ...dto, userId: user.id });
  }

  @Get()
  getAll() {
    return this.responsesService.getAll();
  }
}
