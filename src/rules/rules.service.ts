import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule } from './rules.entity';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private rulesRepository: Repository<Rule>,
  ) {}

  async create(dto: CreateRuleDto) {
    const rule = this.rulesRepository.create(dto);
    await this.rulesRepository.save(rule);
    return rule;
  }

  async getAll() {
    const rules = await this.rulesRepository.find();
    return rules;
  }

  async get(id: number) {
    const rule = await this.rulesRepository.findOne(id);
    return rule;
  }

  async update(id: number, dto: UpdateRuleDto) {
    const rule = await this.rulesRepository.findOne(id);
    const updatedRule = await this.rulesRepository.save({
      ...rule,
      ...dto,
    });
    return updatedRule;
  }

  async delete(id: number) {
    const rule = await this.rulesRepository.findOne(id);
    const deletedRule = await this.rulesRepository.remove(rule);
    return { ...deletedRule, id };
  }
}
