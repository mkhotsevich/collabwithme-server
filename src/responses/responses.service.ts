import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollaborationsService } from 'src/collaborations/collaborations.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './responses.dto';
import { Response, ResponseStatus } from './responses.entity';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
    private usersService: UsersService,
    private collaborationsService: CollaborationsService,
  ) {}

  async create({ userId, collaborationId, ...dto }: CreateResponseDto) {
    const user = await this.usersService.getById(userId);
    const collaboration = await this.collaborationsService.getById(
      collaborationId,
    );
    const response = this.responsesRepository.create({
      ...dto,
      user,
      collaboration,
    });
    return await this.responsesRepository.save(response);
  }

  async getAll() {
    return await this.responsesRepository.find();
  }

  async updateStatus(id: number, status: ResponseStatus, userId: number) {
    const response = await this.responsesRepository.findOne(id);
    return await this.responsesRepository.save({ ...response, status });
  }

  async getAllByUserId(id: number) {
    return await this.responsesRepository.find({
      where: { userId: id },
      relations: ['collaboration', 'collaboration.user'],
    });
  }
}
