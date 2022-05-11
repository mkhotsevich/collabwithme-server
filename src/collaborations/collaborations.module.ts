import { Module } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { CollaborationsController } from './collaborations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaboration } from './collaborations.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { NetworksModule } from 'src/networks/networks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collaboration]),
    AuthModule,
    UsersModule,
    CategoriesModule,
    NetworksModule,
  ],
  providers: [CollaborationsService],
  controllers: [CollaborationsController],
})
export class CollaborationsModule {}
