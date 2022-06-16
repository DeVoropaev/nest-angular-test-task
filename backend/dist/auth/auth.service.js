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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const models_1 = require("../../models");
const bcrypt = require("bcrypt");
const limitsStore_1 = require("../limits-setter/store/limitsStore");
let AuthService = class AuthService {
    constructor(jwtService, limitsStore) {
        this.jwtService = jwtService;
        this.limitsStore = limitsStore;
    }
    async signin(dto) {
        const ip = dto.ip;
        const request = {
            ip,
            time: new Date(),
        };
        if (this.limitsStore.checkRequestIP(request)) {
            this.limitsStore.setRequestIP(request);
            const user = await models_1.User.findOne({
                where: {
                    login: dto.login,
                },
            });
            if (!user || !bcrypt.compare(dto.password, user.password))
                throw new common_1.UnauthorizedException('Credentials incorrect!');
            const token = this.signUser(user.id, user.login, 'user');
            await user.update({ token: token });
            return JSON.stringify(token);
        }
        else {
            throw new common_1.UnauthorizedException(`${this.limitsStore.getTimeLeftIP(request)}`);
        }
    }
    async signup(dto) {
        const ip = dto.ip;
        const request = {
            ip,
            time: new Date(),
        };
        if (this.limitsStore.checkRequestIP(request)) {
            this.limitsStore.setRequestIP(request);
            const user = await models_1.User.findOne({
                where: {
                    login: dto.login,
                },
            });
            if (!!user) {
                throw new common_1.UnauthorizedException('User already exists1');
            }
            else {
                const newUser = await models_1.User.create({
                    login: dto.login,
                    password: await bcrypt.hash(dto.password, 4),
                    token: '',
                });
                const token = this.signUser(newUser.id, newUser.login, 'user');
                await newUser.update({ token: token });
                return JSON.stringify(token);
            }
        }
        else {
            throw new common_1.UnauthorizedException(`${this.limitsStore.getTimeLeftIP(request)}`);
        }
    }
    signUser(uId, login, type) {
        return this.jwtService.sign({
            sub: uId,
            login,
            claim: type,
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        limitsStore_1.LimitsStore])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map