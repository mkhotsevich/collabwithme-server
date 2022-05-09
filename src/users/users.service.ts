import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    await this.usersRepository.save(user);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string) {
    const { password, ...user } = await this.usersRepository.findOne(id);
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const updatableFields = _.omit(dto, 'id', 'role', 'password');

    const user = await this.usersRepository.findOne(id);
    const { password, ...updatedUser } = await this.usersRepository.save({
      ...user,
      ...updatableFields,
    });
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    const deletedUser = await this.usersRepository.remove(user);
    return deletedUser;
  }

  // findOne(id: string): Promise<User> {
  //   return this.usersRepository.findOne(id);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
