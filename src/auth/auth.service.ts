import { User } from './../users/user.model';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.create({
      ...userDto,
      password: hashPassword,
    });

    const token = await this.generateToken(user);
    console.log(
      '🚀 ~ file: auth.service.ts ~ line 33 ~ AuthService ~ registration ~ token',
      token,
    );
    // req.session.passport.user.token = token;
    // req.user = token;
    return token;
  }

  async logout(req: any) {
    req.logout();
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (!user) {
      throw new BadRequestException('User with such credentials not found');
    }

    const passwordsEqual = await bcrypt.compare(
      userDto.password,
      user?.password,
    );
    if (user && passwordsEqual) {
      return user;
    }

    throw new UnauthorizedException('User with such credentials not found');
  }
}
