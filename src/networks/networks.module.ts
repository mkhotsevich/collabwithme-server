import { Module } from '@nestjs/common';
import { NetworksService } from './networks.service';
import { NetworksController } from './networks.controller';
import { Network } from './networks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Network])],
  providers: [NetworksService],
  controllers: [NetworksController],
  exports: [NetworksService],
})
export class NetworksModule {}
