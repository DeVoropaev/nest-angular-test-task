"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitsService = void 0;
const common_1 = require("@nestjs/common");
const limitsStore_1 = require("./store/limitsStore");
function limitsException(message) {
    return new common_1.HttpException(message, common_1.HttpStatus.FORBIDDEN);
}
let LimitsService = class LimitsService {
    constructor(limitsStore) {
        this.limitsStore = limitsStore;
    }
    async setIpLimit(token, limit) {
        const request = {
            token,
            time: new Date(),
        };
        if (this.limitsStore.checkRequestJWT(request)) {
            this.limitsStore.setRequestJWT(request);
            this.limitsStore.setLimitIP(Number(limit.limit));
            return JSON.stringify(limit);
        }
        else {
            throw limitsException(`${this.limitsStore.getTimeLeftJWT(request)}`);
        }
    }
    async setTokenLimit(token, limit) {
        const request = {
            token,
            time: new Date(),
        };
        if (this.limitsStore.checkRequestJWT(request)) {
            this.limitsStore.setRequestJWT(request);
            this.limitsStore.setLimitJWT(Number(limit.limit));
            return JSON.stringify(limit);
        }
        else {
            throw limitsException(`${this.limitsStore.getTimeLeftJWT(request)}`);
        }
    }
};
LimitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [limitsStore_1.LimitsStore])
], LimitsService);
exports.LimitsService = LimitsService;
//# sourceMappingURL=limits-setter.service.js.map