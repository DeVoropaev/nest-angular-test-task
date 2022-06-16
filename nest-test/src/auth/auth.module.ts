import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LimitsStore } from 'src/limits-setter/store/limitsStore';

@Module({
  imports: [
    JwtModule.register({
      secret: 'nest-test-secret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LimitsStore],
})
export class AuthModule {}
