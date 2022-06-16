import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { LimitsService } from './limits-setter.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('setlimits')
export class LimitsController {
  constructor(private limitsService: LimitsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('ip')
  async setIpLimit(@Request() req: any) {
    const limit: number = req.body;
    const token = req.headers.Authorization;
    return await this.limitsService.setIpLimit(token, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('token')
  async setTokenLimit(@Request() req: any) {
    const token = req.headers.authorization;
    const limit: number = req.body;
    return await this.limitsService.setTokenLimit(token, limit);
  }
}
