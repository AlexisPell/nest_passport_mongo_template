import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // NOTE: JWT STRATEGY
    // JwtModule.register({
    //   secret: process.env.PRIVATE_JWT_KEY || 'Sekretek',
    //   signOptions: { expiresIn: '24h' },
    // }),
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
