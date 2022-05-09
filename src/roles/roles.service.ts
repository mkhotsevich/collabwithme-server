import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto) {
    const role = this.rolesRepository.create(dto);
    await this.rolesRepository.save(role);
    return role;
  }

  async getAll() {
    const roles = await this.rolesRepository.find();
    return roles;
  }

  async get(id: number) {
    const role = await this.rolesRepository.findOne(id);
    return role;
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOne(id);
    const updatedRole = await this.rolesRepository.save({
      ...role,
      ...dto,
    });
    return updatedRole;
  }

  async delete(id: number) {
    const role = await this.rolesRepository.findOne(id);
    const deletedRole = await this.rolesRepository.remove(role);
    return { ...deletedRole, id };
  }
}
