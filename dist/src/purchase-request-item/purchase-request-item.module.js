"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRequestItemModule = void 0;
const common_1 = require("@nestjs/common");
const purchase_request_item_service_1 = require("./purchase-request-item.service");
const purchase_request_item_controller_1 = require("./purchase-request-item.controller");
let PurchaseRequestItemModule = class PurchaseRequestItemModule {
};
exports.PurchaseRequestItemModule = PurchaseRequestItemModule;
exports.PurchaseRequestItemModule = PurchaseRequestItemModule = __decorate([
    (0, common_1.Module)({
        controllers: [purchase_request_item_controller_1.PurchaseRequestItemController],
        providers: [purchase_request_item_service_1.PurchaseRequestItemService],
    })
], PurchaseRequestItemModule);
//# sourceMappingURL=purchase-request-item.module.js.map