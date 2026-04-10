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
exports.OrderItemController = void 0;
const common_1 = require("@nestjs/common");
const order_item_service_1 = require("./order-item.service");
const create_order_item_dto_1 = require("./dto/create-order-item.dto");
const update_order_item_dto_1 = require("./dto/update-order-item.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const order_item_entity_1 = require("./entities/order-item.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let OrderItemController = class OrderItemController {
    constructor(orderItemService) {
        this.orderItemService = orderItemService;
    }
    create(createOrderItemDto, req) {
        createOrderItemDto.enabledById = req.user.userId;
        return this.orderItemService.create(createOrderItemDto);
    }
    findAll() {
        return this.orderItemService.findAll();
    }
    search(query) {
        return this.orderItemService.filter(query);
    }
    findOne(id) {
        return this.orderItemService.findOne(id);
    }
    update(id, updateOrderItemDto) {
        return this.orderItemService.update(id, updateOrderItemDto);
    }
    async fulfill(fulfillData, req) {
        fulfillData.enabledById = req.user.userId;
        return await this.orderItemService.fulfill(fulfillData);
    }
    remove(id) {
        return this.orderItemService.remove(id);
    }
    enable(id) {
        return this.orderItemService.enable(id);
    }
    disable(id, req) {
        return this.orderItemService.disable(id, req.user.userId);
    }
};
exports.OrderItemController = OrderItemController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_order_item_dto_1.CreateOrderItemSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_item_dto_1.CreateOrderItemDto, Object]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('canViewOrderDetail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(order_item_entity_1.OrderItemParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewOrderDetail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('canViewOrderDetail'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_item_dto_1.UpdateOrderItemDto]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/fulfill'),
    (0, common_1.HttpCode)(200),
    (0, permissions_decorator_1.Permissions)('canFulfillOrder'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "fulfill", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderItemController.prototype, "disable", null);
exports.OrderItemController = OrderItemController = __decorate([
    (0, common_1.Controller)('order-item'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [order_item_service_1.OrderItemService])
], OrderItemController);
//# sourceMappingURL=order-item.controller.js.map