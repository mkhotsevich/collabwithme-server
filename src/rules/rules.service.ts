import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialRules } from './rules.consts';
import { Rule } from './rules.entity';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private rulesRepository: Repository<Rule>,
  ) {}

  async init() {
    await this.rulesRepository.save(initialRules);
    console.log('RULES INITIALED');
  }

  async getAll() {
    return await this.rulesRepository.find();
  }

  async getById(id: number) {
    return await this.rulesRepository.findOne(id);
  }
}
