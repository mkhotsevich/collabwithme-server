import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialRoles } from './roles.consts';
import { Role, RoleName } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async init() {
    await this.rolesRepository.save(initialRoles);
    console.log('ROLES INITIALED');
  }

  async getAll() {
    return await this.rolesRepository.find();
  }

  async getById(id: number) {
    return await this.rolesRepository.findOne(id);
  }

  async getByName(name: RoleName) {
    return await this.rolesRepository.findOne({ where: { name } });
  }
}
