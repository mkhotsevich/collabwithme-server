import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './links.entity';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { NetworksModule } from 'src/networks/networks.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
    NetworksModule,
    UsersModule,
    AuthModule,
  ],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
