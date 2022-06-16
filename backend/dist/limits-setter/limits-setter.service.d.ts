import { LimitsStore } from './store/limitsStore';
export declare class LimitsService {
    private limitsStore;
    constructor(limitsStore: LimitsStore);
    setIpLimit(token: string, limit: any): Promise<string>;
    setTokenLimit(token: string, limit: any): Promise<string>;
}
