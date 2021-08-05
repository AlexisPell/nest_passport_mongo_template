import { LocalAuthGuard } from './guards/localAuth.guard';
import { User } from './../users/user.model';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login user' })
  @ApiCreatedResponse({ type: User })
  login(@Request() req) {
    return req.user;
  }

  @Post('/registration')
  @ApiOperation({ summary: 'Register new user' })
  @ApiCreatedResponse({ type: User })
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get('/protected')
  protected() {
    return 'I am protected route';
  }
}
