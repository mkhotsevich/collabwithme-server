import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthPayload } from 'src/auth/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/users.decorator';
import { CreateRoomDto } from './rooms.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllUserRooms(@User() user: AuthPayload) {
    return this.roomsService.getAllUserRooms(user.id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createRoom(@Body() dto: CreateRoomDto) {
    return this.roomsService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get(':id/messages')
  getMessagesByRoomId(@Param('id') id: string) {
    return this.roomsService.getMessagesByRoomId(+id);
  }
}
