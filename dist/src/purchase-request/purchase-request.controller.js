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
exports.PurchaseRequestController = void 0;
const common_1 = require("@nestjs/common");
const purchase_request_service_1 = require("./purchase-request.service");
const create_purchase_request_dto_1 = require("./dto/create-purchase-request.dto");
const update_purchase_request_dto_1 = require("./dto/update-purchase-request.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const purchase_request_entity_1 = require("./entities/purchase-request.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let PurchaseRequestController = class PurchaseRequestController {
    constructor(purchaseRequestService) {
        this.purchaseRequestService = purchaseRequestService;
    }
    create(dto, req) {
        dto.enabledById = req.user.userId;
        return this.purchaseRequestService.create(dto);
    }
    findAll() {
        return this.purchaseRequestService.findAll();
    }
    search(query) {
        return this.purchaseRequestService.filter(query);
    }
    findOne(id) {
        return this.purchaseRequestService.findOne(id);
    }
    update(id, dto) {
        return this.purchaseRequestService.update(id, dto);
    }
    submit(id) {
        return this.purchaseRequestService.submit(id);
    }
    approve(id, req) {
        return this.purchaseRequestService.approve(id, req.user.userId);
    }
    reject(id, req) {
        return this.purchaseRequestService.reject(id, req.user.userId);
    }
    markOrdered(id) {
        return this.purchaseRequestService.markOrdered(id);
    }
    receive(id) {
        return this.purchaseRequestService.receive(id);
    }
    cancel(id) {
        return this.purchaseRequestService.cancel(id);
    }
    remove(id) {
        return this.purchaseRequestService.remove(id);
    }
    enable(id) {
        return this.purchaseRequestService.enable(id);
    }
    disable(id, req) {
        return this.purchaseRequestService.disable(id, req.user.userId);
    }
};
exports.PurchaseRequestController = PurchaseRequestController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_purchase_request_dto_1.CreatePurchaseRequestSchema)),
    (0, permissions_decorator_1.Permissions)('canCreatePurchaseRequest'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_request_dto_1.CreatePurchaseRequestDto, Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('canViewPurchaseRequests'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(purchase_request_entity_1.PurchaseRequestParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewPurchaseRequests'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('canViewPurchaseRequestDetail'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)('canCreatePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_purchase_request_dto_1.UpdatePurchaseRequestDto]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/submit'),
    (0, permissions_decorator_1.Permissions)('canCreatePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "submit", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, permissions_decorator_1.Permissions)('canApprovePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, permissions_decorator_1.Permissions)('canApprovePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "reject", null);
__decorate([
    (0, common_1.Patch)(':id/mark-ordered'),
    (0, permissions_decorator_1.Permissions)('canCreatePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "markOrdered", null);
__decorate([
    (0, common_1.Patch)(':id/receive'),
    (0, permissions_decorator_1.Permissions)('canReceivePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "receive", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, permissions_decorator_1.Permissions)('canCreatePurchaseRequest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "cancel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PurchaseRequestController.prototype, "disable", null);
exports.PurchaseRequestController = PurchaseRequestController = __decorate([
    (0, common_1.Controller)('purchase-request'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [purchase_request_service_1.PurchaseRequestService])
], PurchaseRequestController);
//# sourceMappingURL=purchase-request.controller.js.map