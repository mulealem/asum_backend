"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockDiscardReasonModule = void 0;
const common_1 = require("@nestjs/common");
const stock_discard_reason_service_1 = require("./stock-discard-reason.service");
const stock_discard_reason_controller_1 = require("./stock-discard-reason.controller");
let StockDiscardReasonModule = class StockDiscardReasonModule {
};
exports.StockDiscardReasonModule = StockDiscardReasonModule;
exports.StockDiscardReasonModule = StockDiscardReasonModule = __decorate([
    (0, common_1.Module)({
        controllers: [stock_discard_reason_controller_1.StockDiscardReasonController],
        providers: [stock_discard_reason_service_1.StockDiscardReasonService],
    })
], StockDiscardReasonModule);
//# sourceMappingURL=stock-discard-reason.module.js.map