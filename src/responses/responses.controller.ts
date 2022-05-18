import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthPayload } from 'src/auth/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/users.decorator';
import { CreateResponseDto } from './responses.dto';
import { ResponseStatus } from './responses.entity';
import { ResponsesService } from './responses.service';

@Controller('responses')
export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateResponseDto, @User() user: AuthPayload) {
    return this.responsesService.create({ ...dto, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: { status: ResponseStatus },
    @User() user: AuthPayload,
  ) {
    return this.responsesService.updateStatus(+id, dto.status, user.id);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  getAllByUserId(@User() user: AuthPayload) {
    return this.responsesService.getAllByUserId(user.id);
  }

  @Get()
  getAll() {
    return this.responsesService.getAll();
  }
}
