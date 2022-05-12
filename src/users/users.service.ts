import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as _ from 'lodash';
import { RolesService } from 'src/roles/roles.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async create(dto: CreateUserDto) {
    const role = await this.rolesService.getByName('USER');
    const subscription = await this.subscriptionsService.getByName('FREE');
    const user = this.usersRepository.create({
      ...dto,
      role,
      subscription,
    });
    return await this.usersRepository.save(user);
  }

  async getAll() {
    return await this.usersRepository.find({
      relations: ['role', 'subscription', 'links'],
    });
  }

  async getById(id: number) {
    return await this.usersRepository.findOne(+id);
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    return await this.usersRepository.save({
      ...user,
      ...dto,
    });
  }

  async delete(id: number) {
    const user = await this.usersRepository.findOne(id);
    const deletedUser = await this.usersRepository.remove(user);
    return { ...deletedUser, id };
  }

  // async findByEmail(email: string) {
  //   const user = await this.usersRepository.findOne({ where: { email } });
  //   return user;
  // }
  // async findById(id: string) {
  //   const { password, ...user } = await this.usersRepository.findOne(id);
  //   return user;
  // }

  // async remove(id: string) {
  //   const user = await this.usersRepository.findOne(id);
  //   const deletedUser = await this.usersRepository.remove(user);
  //   return deletedUser;
  // }
  // findOne(id: string): Promise<User> {
  //   return this.usersRepository.findOne(id);
  // }
  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
