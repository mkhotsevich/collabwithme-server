import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaboration } from 'src/collaborations/collaborations.entity';
import { Message } from 'src/messages/messages.entity';
import { Response } from 'src/responses/responses.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationsRepository: Repository<Collaboration>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
  ) {}

  async getInfo() {
    const amountCollaboration = await this.collaborationsRepository.count();
    const amountUsers = await this.usersRepository.count();
    const amountMessages = await this.messagesRepository.count();
    const amountResponses = await this.responsesRepository.count();

    return {
      amountCollaboration,
      amountUsers,
      amountMessages,
      amountResponses,
    };
  }
}
