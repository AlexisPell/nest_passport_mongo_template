import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // NOTE: JWT STRATEGY
    // JwtModule.register({
    //   secret: process.env.PRIVATE_JWT_KEY || 'Sekretek',
    // 	signOptions: {expiresIn: '24h'},
    // }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
