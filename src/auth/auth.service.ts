import { User } from './../users/user.model';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  private async validateUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new BadRequestException('User with such credentials not found');
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user?.password,
    );
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException('User with such credentials not found');
  }
}
