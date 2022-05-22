import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesService } from 'src/messages/messages.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './rooms.dto';
import { Room } from './rooms.entity';

function compare(a1: any, a2: any) {
  const array2Sorted = a2.slice().sort();
  return (
    a1.length === a2.length &&
    a1
      .slice()
      .sort()
      .every(function (value: any, index: any) {
        return value === array2Sorted[index];
      })
  );
}

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private messagesService: MessagesService,
  ) {}

  async create({ userIds }: CreateRoomDto) {
    const rooms = await this.roomsRepository.find({ relations: ['users'] });
    const isCreated = rooms.find((room) =>
      compare(
        room.users.map((user) => user.id),
        userIds,
      ),
    );
    if (isCreated) {
      return isCreated;
    }
    const users = await this.usersRepository.findByIds(userIds);
    const room = this.roomsRepository.create({ users });
    return await this.roomsRepository.save(room);
  }

  async getById(id: number) {
    return await this.roomsRepository.findOne({ id });
  }

  async getAllUserRooms(userId: number) {
    const rooms = await this.roomsRepository.find({
      relations: ['users'],
    });
    return rooms.filter((room) =>
      room.users.some((user) => user.id === userId),
    );
  }

  async getMessagesByRoomId(id: number) {
    return await this.messagesService.getMessagesByRoomId(id);
  }
}
