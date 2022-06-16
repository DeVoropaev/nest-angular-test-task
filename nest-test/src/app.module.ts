import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { LimitsSetterModule } from './limits-setter/limits-setter.module';
import { LimitsStore } from './limits-setter/store/limitsStore';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: 'nest-test-secret',
    }),
    LimitsSetterModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LimitsStore],
})
export class AppModule {}
