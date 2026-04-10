"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockSourceModule = void 0;
const common_1 = require("@nestjs/common");
const stock_source_service_1 = require("./stock-source.service");
const stock_source_controller_1 = require("./stock-source.controller");
let StockSourceModule = class StockSourceModule {
};
exports.StockSourceModule = StockSourceModule;
exports.StockSourceModule = StockSourceModule = __decorate([
    (0, common_1.Module)({
        controllers: [stock_source_controller_1.StockSourceController],
        providers: [stock_source_service_1.StockSourceService],
    })
], StockSourceModule);
//# sourceMappingURL=stock-source.module.js.map