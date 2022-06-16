export interface IRequests {
    ip: string;
    time: Date;
}
export interface ITokenRequests {
    token: string;
    time: Date;
}
export declare class LimitsStore {
    private requestsIP;
    private requestsJWT;
    private limitIP;
    private limitJWT;
    constructor();
    checkRequestIP(request: IRequests): boolean;
    checkRequestJWT(request: ITokenRequests): boolean;
    setRequestIP(request: IRequests): void;
    setRequestJWT(request: ITokenRequests): void;
    setLimitIP(limit: number): void;
    setLimitJWT(limit: number): void;
    getTimeLeftIP(request: IRequests): number;
    getTimeLeftJWT(request: ITokenRequests): number;
}
