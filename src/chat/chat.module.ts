import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [RoomsModule, MessagesModule],
  providers: [ChatGateway],
})
export class ChatModule {}
