import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NetworksService } from 'src/networks/networks.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateLinkDto, UpdateLinkDto } from './links.dto';
import { Link } from './links.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private linksRepository: Repository<Link>,
    private networksService: NetworksService,
    private usersService: UsersService,
  ) {}

  async create({ networkId, userId, ...dto }: CreateLinkDto) {
    const network = await this.networksService.getById(networkId);
    const user = await this.usersService.getById(userId);
    const link = this.linksRepository.create({ ...dto, network, user });
    return await this.linksRepository.save(link);
  }

  async getAll() {
    return await this.linksRepository.find();
  }

  async delete(linkId: number, userId: number) {
    const link = await this.linksRepository.findOne(linkId);
    if (link.userId !== userId) {
      throw new BadRequestException('У вас нет прав удалить эту ссылку');
    }
    return await this.linksRepository.remove(link);
  }

  async update(linkId: number, userId: number, dto: UpdateLinkDto) {
    const link = await this.linksRepository.findOne(linkId);
    if (link.userId !== userId) {
      throw new BadRequestException('У вас нет прав изменить эту ссылку');
    }
    return await this.linksRepository.save({ ...link, ...dto });
  }
}
