import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialSubscriptions } from './subscriptions.consts';
import { Subscription, SubscriptionName } from './subscriptions.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async init() {
    await this.subscriptionsRepository.save(initialSubscriptions);
    console.log('SUBSCRIPTION INITIALED');
  }

  async getAll() {
    return await this.subscriptionsRepository.find();
  }

  async getById(id: number) {
    return await this.subscriptionsRepository.findOne(id);
  }

  async getByName(name: SubscriptionName) {
    return await this.subscriptionsRepository.findOne({
      where: { name },
    });
  }
}
