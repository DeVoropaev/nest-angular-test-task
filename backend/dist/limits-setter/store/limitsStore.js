"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitsStore = void 0;
class LimitsStore {
    constructor() {
        this.limitIP = 100;
        this.limitJWT = 200;
        this.requestsIP = [];
        this.requestsJWT = [];
    }
    checkRequestIP(request) {
        this.requestsIP = this.requestsIP.filter((currReq) => currReq.time.getTime() - new Date().getTime() < 60 * 60 * 1000);
        const allRequests = this.requestsIP.filter((currReq) => currReq.ip === request.ip);
        const res = allRequests.length >= this.limitIP ? false : true;
        return res;
    }
    checkRequestJWT(request) {
        this.requestsJWT = this.requestsJWT.filter((currReq) => currReq.time.getTime() - new Date().getTime() < 60 * 60 * 1000);
        const allRequests = this.requestsJWT.filter((currReq) => currReq.token === request.token);
        const res = allRequests.length >= this.limitJWT ? false : true;
        return res;
    }
    setRequestIP(request) {
        this.requestsIP = [...this.requestsIP, request];
    }
    setRequestJWT(request) {
        this.requestsJWT = [...this.requestsJWT, request];
    }
    setLimitIP(limit) {
        this.limitIP = limit;
    }
    setLimitJWT(limit) {
        this.limitJWT = limit;
    }
    getTimeLeftIP(request) {
        const allRequests = this.requestsIP.filter((currReq) => currReq.ip === request.ip);
        const firstRequest = allRequests[0];
        const timeLeft = firstRequest.time.getTime() + 60 * 60 * 1000 - new Date().getTime();
        return timeLeft;
    }
    getTimeLeftJWT(request) {
        const allRequests = this.requestsJWT.filter((currReq) => currReq.token === request.token);
        const firstRequest = allRequests[0];
        const timeLeft = firstRequest.time.getTime() + 60 * 60 * 1000 - new Date().getTime();
        return timeLeft;
    }
}
exports.LimitsStore = LimitsStore;
//# sourceMappingURL=limitsStore.js.map