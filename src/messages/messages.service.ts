import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './messages.dto';
import { Message } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    private usersService: UsersService,
    @Inject(forwardRef(() => RoomsService))
    private roomsService: RoomsService,
  ) {}

  async create({ userId, roomId, message, ...dto }: CreateMessageDto) {
    const user = await this.usersService.getById(userId);
    const room = await this.roomsService.getById(roomId);
    const msg = this.messagesRepository.create({ ...dto, room, user, message });
    return await this.messagesRepository.save(msg);
  }

  async getMessagesByRoomId(id: number) {
    return await this.messagesRepository.find({ where: { roomId: id } });
  }
}
