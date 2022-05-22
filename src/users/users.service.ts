import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { RolesService } from 'src/roles/roles.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';

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
    return await this.usersRepository.findOne(+id, {
      relations: ['subscription', 'links', 'links.network'],
    });
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

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOne(id);
    const passwordEquals = await bcrypt.compare(
      dto.currentPassword,
      user.password,
    );
    if (!passwordEquals) {
      throw new BadRequestException('Текущий пароль указан неверно');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 8);
    return await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async delete(id: number) {
    const user = await this.usersRepository.findOne(id);
    const deletedUser = await this.usersRepository.remove(user);
    return { ...deletedUser, id };
  }
}
