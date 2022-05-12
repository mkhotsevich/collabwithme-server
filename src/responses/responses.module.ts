import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './responses.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CollaborationsModule } from 'src/collaborations/collaborations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Response]),
    AuthModule,
    UsersModule,
    CollaborationsModule,
  ],
  providers: [ResponsesService],
  controllers: [ResponsesController],
})
export class ResponsesModule {}
