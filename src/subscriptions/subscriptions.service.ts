import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './subscriptions.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async create(dto: CreateSubscriptionDto) {
    const subscription = this.subscriptionsRepository.create(dto);
    await this.subscriptionsRepository.save(subscription);
    return subscription;
  }

  async getAll() {
    const subscriptions = await this.subscriptionsRepository.find();
    return subscriptions;
  }

  async get(id: number) {
    const subscription = await this.subscriptionsRepository.findOne(id);
    return subscription;
  }

  async update(id: number, dto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionsRepository.findOne(id);
    const updatedSubscription = await this.subscriptionsRepository.save({
      ...subscription,
      ...dto,
    });
    return updatedSubscription;
  }

  async delete(id: number) {
    const subscription = await this.subscriptionsRepository.findOne(id);
    const deletedSubscription = await this.subscriptionsRepository.remove(
      subscription,
    );
    return { ...deletedSubscription, id };
  }
}
