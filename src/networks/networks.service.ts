import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { Network } from './networks.entity';

@Injectable()
export class NetworksService {
  constructor(
    @InjectRepository(Network)
    private networksRepository: Repository<Network>,
  ) {}

  async create(dto: CreateNetworkDto) {
    const network = this.networksRepository.create(dto);
    await this.networksRepository.save(network);
    return network;
  }

  async getAll() {
    const networks = await this.networksRepository.find();
    return networks;
  }

  async get(id: number) {
    const network = await this.networksRepository.findOne(id);
    return network;
  }

  async update(id: number, dto: UpdateNetworkDto) {
    const network = await this.networksRepository.findOne(id);
    const updatedNetwork = await this.networksRepository.save({
      ...network,
      ...dto,
    });
    return updatedNetwork;
  }

  async delete(id: number) {
    const network = await this.networksRepository.findOne(id);
    const deletedNetwork = await this.networksRepository.remove(network);
    return { ...deletedNetwork, id };
  }
}
