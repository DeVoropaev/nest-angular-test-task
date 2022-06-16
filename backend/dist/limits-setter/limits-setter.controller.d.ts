import { LimitsService } from './limits-setter.service';
export declare class LimitsController {
    private limitsService;
    constructor(limitsService: LimitsService);
    setIpLimit(req: any): Promise<string>;
    setTokenLimit(req: any): Promise<string>;
}
