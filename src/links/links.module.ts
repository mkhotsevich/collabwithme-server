import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './links.entity';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { NetworksModule } from 'src/networks/networks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), NetworksModule, UsersModule],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
