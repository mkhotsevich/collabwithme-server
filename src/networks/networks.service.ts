import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialNetworks } from './networks.consts';
import { CreateNetworkDto, UpdateNetworkDto } from './networks.dto';
import { Network } from './networks.entity';

@Injectable()
export class NetworksService {
  constructor(
    @InjectRepository(Network)
    private networksRepository: Repository<Network>,
  ) {}

  async init() {
    await this.networksRepository.save(initialNetworks);
    console.log('NETWORKS INITIALED');
  }

  async create(dto: CreateNetworkDto) {
    const network = this.networksRepository.create(dto);
    return await this.networksRepository.save(network);
  }

  async getAll() {
    return await this.networksRepository.find();
  }

  async getById(id: number) {
    return await this.networksRepository.findOne(id);
  }

  async update(id: number, dto: UpdateNetworkDto) {
    return await this.networksRepository.save({ id, ...dto });
  }

  async delete(id: number) {
    return await this.networksRepository.delete(id);
  }
}
