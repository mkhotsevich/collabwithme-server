import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaboration } from 'src/collaborations/collaborations.entity';
import { User } from 'src/users/users.entity';
import { Response } from 'src/responses/responses.entity';
import { Message } from 'src/messages/messages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collaboration, User, Response, Message]),
    AuthModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
