import { Module } from '@nestjs/common';
import { LimitsService } from './limits-setter.service';
import { LimitsController } from './limits-setter.controller';
import { LimitsStore } from './store/limitsStore';

@Module({
  imports: [],
  controllers: [LimitsController],
  providers: [LimitsService, LimitsStore],
})
export class LimitsSetterModule {}
