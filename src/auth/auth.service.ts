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
  constructor(
    private usersService: UsersService, // private jwtService: JwtService, // NOTE: JWT STRATEGY
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return user;

    // NOTE: JWT STRATEGY
    // return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    let user = await this.usersService.getUserByEmail(userDto.email);

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    user = await this.usersService.create({
      ...userDto,
      password: hashPassword,
    });

    return user;

    // NOTE: JWT STRATEGY
    // return this.generateToken(user);
  }

  // NOTE: JWT STRATEGY
  // private async generateToken(user: User) {
  // 	const payload = {email: user.email, id: user.id, roles: user.roles};
  // 	return {
  // 		token: this.jwtService.sign(payload),
  // 	};
  // }

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
