import { Module } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { CollaborationsController } from './collaborations.controller';

@Module({
  providers: [CollaborationsService],
  controllers: [CollaborationsController]
})
export class CollaborationsModule {}
