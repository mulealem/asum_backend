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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRequestItemController = void 0;
const common_1 = require("@nestjs/common");
const purchase_request_item_service_1 = require("./purchase-request-item.service");
const create_purchase_request_item_dto_1 = require("./dto/create-purchase-request-item.dto");
const update_purchase_request_item_dto_1 = require("./dto/update-purchase-request-item.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const purchase_request_item_entity_1 = require("./entities/purchase-request-item.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let PurchaseRequestItemController = class PurchaseRequestItemController {
    constructor(purchaseRequestItemService) {
        this.purchaseRequestItemService = purchaseRequestItemService;
    }
    create(dto, req) {
        dto.enabledById = req.user.userId;
        return this.purchaseRequestItemService.create(dto);
    }
    findAll() {
        return this.purchaseRequestItemService.findAll();
    }
    search(query) {
        return this.purchaseRequestItemService.filter(query);
    }
    findOne(id) {
        return this.purchaseRequestItemService.findOne(id);
    }
    update(id, dto) {
        return this.purchaseRequestItemService.update(id, dto);
    }
    receiveItem(id, body) {
        return this.purchaseRequestItemService.receiveItem(id, body.receivedQuantity);
    }
    remove(id) {
        return this.purchaseRequestItemService.remove(id);
    }
    enable(id) {
        return this.purchaseRequestItemService.enable(id);
    }
    disable(id, req) {
        return this.purchaseRequestItemService.disable(id, req.user.userId);
    }
};
exports.PurchaseRequestItemController = PurchaseRequestItemController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_purchase_request_item_dto_1.CreatePurchaseRequestItemSchema)),
    (0, permissions_decorator_1.Permissions)('canCreatePurchaseRequest'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_request_item_dto_1.CreatePurchaseRequestItemDto, Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('canViewPurchaseRequestDetail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(purchase_request_item_entity_1.PurchaseRequestItemParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewPurchaseRequestDetail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('canViewPurchaseRequestDetail'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)('canCreatePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_purchase_request_item_dto_1.UpdatePurchaseRequestItemDto]),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/receive'),
    (0, permissions_decorator_1.Permissions)('canReceivePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "receiveItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestItemController.prototype, "disable", null);
exports.PurchaseRequestItemController = PurchaseRequestItemController = __decorate([
    (0, common_1.Controller)('purchase-request-item'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [purchase_request_item_service_1.PurchaseRequestItemService])
], PurchaseRequestItemController);
//# sourceMappingURL=purchase-request-item.controller.js.map