import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { RoomsService } from 'src/rooms/rooms.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(
    private roomsService: RoomsService,
    private messagesService: MessagesService,
  ) {}

  @SubscribeMessage('messageToServer')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { senderId: number; roomId: number; message: string },
  ) {
    const { senderId, roomId, message } = data;
    const msg = await this.messagesService.create({
      userId: senderId,
      roomId,
      message,
    });
    this.server.to(msg.roomId.toString()).emit('messageToClient', msg);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userIds: number[] },
  ) {
    const room = await this.roomsService.create(data.userIds);
    client.emit('createdRoom', room.id);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number },
  ) {
    const room = await this.roomsService.getById(data.roomId);
    client.join(room.id.toString());
    client.emit('joinedRoom', room.id);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number },
  ) {
    const room = await this.roomsService.getById(data.roomId);
    client.leave(room.id.toString());
    client.emit('leftRoom', room.id);
  }
}
