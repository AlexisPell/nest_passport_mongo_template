import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument, User } from './user.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User with such email doesn't exist");
    }
    return user;
  }

  // hashing password and validating is going into authService/registration
  async create(dto: CreateUserDto): Promise<User> {
    const candidate = await this.userModel.findOne({ email: dto.email });
    if (candidate) {
      throw new BadRequestException('User with such email already exists');
    }
    const user = await this.userModel.create(dto);
    return user;
  }
}
