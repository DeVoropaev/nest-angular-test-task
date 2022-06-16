"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitsSetterModule = void 0;
const common_1 = require("@nestjs/common");
const limits_setter_service_1 = require("./limits-setter.service");
const limits_setter_controller_1 = require("./limits-setter.controller");
const limitsStore_1 = require("./store/limitsStore");
let LimitsSetterModule = class LimitsSetterModule {
};
LimitsSetterModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [limits_setter_controller_1.LimitsController],
        providers: [limits_setter_service_1.LimitsService, limitsStore_1.LimitsStore],
    })
], LimitsSetterModule);
exports.LimitsSetterModule = LimitsSetterModule;
//# sourceMappingURL=limits-setter.module.js.map