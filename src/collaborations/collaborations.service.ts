import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { NetworksService } from 'src/networks/networks.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCollaborationDto } from './collaborations.dto';
import { Collaboration } from './collaborations.entity';

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationRepository: Repository<Collaboration>,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private networksService: NetworksService,
  ) {}

  async create({
    userId,
    categoryIds,
    networkIds,
    ...dto
  }: CreateCollaborationDto) {
    const user = await this.usersService.getById(userId);
    const categories = await Promise.all(
      categoryIds.map((id) => this.categoriesService.getById(id)),
    );
    const networks = await Promise.all(
      networkIds.map((id) => this.networksService.getById(id)),
    );

    const newCollaboration = this.collaborationRepository.create({
      ...dto,
      user,
      categories,
      networks,
    });
    return await this.collaborationRepository.save(newCollaboration);
  }

  async getAll() {
    return await this.collaborationRepository.find({
      relations: ['user', 'categories', 'networks', 'responses'],
    });
  }

  async getById(id: number) {
    return await this.collaborationRepository.findOne(id, {
      relations: ['user', 'categories', 'networks', 'responses'],
    });
  }

  async getByUserId(userId: number) {
    return await this.collaborationRepository.find({
      where: { userId },
      relations: ['user', 'categories', 'networks', 'responses'],
      order: { createdDate: 'DESC' },
    });
  }
}
