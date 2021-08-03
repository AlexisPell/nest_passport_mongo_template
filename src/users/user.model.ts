import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @ApiProperty({ example: 'mymail@gmail.com' })
  @Prop({ type: String })
  email: string;

  @ApiProperty({ example: 'IloveBigBen' })
  @Prop({ type: String, minlength: 6 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
