import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument, User } from './user.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User with such email doesn't exist");
    }
    return user;
  }

  async create(dto: CreateUserDto) {
    const candidate = await this.userModel.findOne({ email: dto.email });
    if (candidate) {
      throw new BadRequestException('Such user already exists');
    }
    const user = await this.userModel.create(dto);
    return user;
  }
}
