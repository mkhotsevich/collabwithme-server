import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Room } from './rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userIds: number[]) {
    const users = await this.usersRepository.findByIds(userIds);
    const room = this.roomsRepository.create({ users });
    return await this.roomsRepository.save(room);
  }

  async getById(id: number) {
    return await this.roomsRepository.findOne({ id });
  }
}
