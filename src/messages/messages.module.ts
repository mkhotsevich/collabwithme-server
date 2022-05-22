import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';
import { Message } from './messages.entity';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UsersModule,
    forwardRef(() => RoomsModule),
  ],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
