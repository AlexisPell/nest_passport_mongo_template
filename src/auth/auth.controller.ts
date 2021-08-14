import { AuthenticatedGuard } from './guards/isAuthenticatedSession.guard';
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
  HttpException,
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
    console.log('REQ SESSION :', req.session, 'REQ USER:', req.user);
    return req.user;
  }

  @Post('/registration')
  @ApiOperation({ summary: 'Register new user' })
  @ApiCreatedResponse({ type: User })
  registration(@Body() userDto: CreateUserDto, @Request() req) {
    return req.user
      ? new HttpException('You are already logged in', 203)
      : this.authService.registration(userDto);
  }

  @Get('/logout')
  @ApiOperation({ summary: 'Logout' })
  logout(@Request() req) {
    return this.authService.logout(req);
  }

  @Get('/protected')
  @UseGuards(AuthenticatedGuard)
  protected(@Request() req) {
    console.log(
      'REQ SESSION :',
      req.session.passport.user,
      'REQ USER:',
      req.user,
    );
    return req.user;
  }
}
