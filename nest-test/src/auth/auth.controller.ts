import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// authorization routes
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // sign in route
  @Post('signin')
  async signin(@Request() req: any) {
    const ip = req.ip;
    const { login, password } = req.body;
    const dto: AuthDto = {
      ip,
      login,
      password,
    };
    return await this.authService.signin(dto);
  }
  // sign up route
  @Post('signup')
  async signup(@Request() req: any) {
    const ip = req.ip;
    const { login, password } = req.body;
    const dto: AuthDto = {
      ip,
      login,
      password,
    };
    return await this.authService.signup(dto);
  }
}
