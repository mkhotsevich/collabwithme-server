import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NetworksService } from 'src/networks/networks.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './links.dto';
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
    const link = this.linksRepository.create({ network, user, ...dto });
    return await this.linksRepository.save(link);
  }

  async getAll() {
    return await this.linksRepository.find();
  }
}
