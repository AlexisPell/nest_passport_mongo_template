import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [User] })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Get all users' })
  @ApiCreatedResponse({
    type: User,
    description: 'User created successfully',
  })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
