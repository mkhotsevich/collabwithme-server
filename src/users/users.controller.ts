import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthPayload } from 'src/auth/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './users.decorator';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  updateMe(@Body() dto: UpdateUserDto, @User() user: AuthPayload) {
    return this.usersService.update(user.id, dto);
  }

  @UseGuards(AuthGuard)
  @Patch('password')
  updatePassword(@Body() dto: UpdatePasswordDto, @User() user: AuthPayload) {
    return this.usersService.updatePassword(user.id, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
