import { Controller, Get, Param } from '@nestjs/common';
import { SubscriptionName } from './subscriptions.entity';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get()
  getAll() {
    return this.subscriptionsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.subscriptionsService.getById(+id);
  }

  @Get(':name')
  getByName(@Param('name') name: SubscriptionName) {
    return this.subscriptionsService.getByName(name);
  }
}
