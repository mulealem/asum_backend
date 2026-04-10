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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const checkout_order_dto_1 = require("./dto/checkout-order.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const order_entity_1 = require("./entities/order.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    checkout(dto, req) {
        return this.orderService.checkout(dto, req.user.userId);
    }
    create(createOrderDto, req) {
        createOrderDto.enabledById = req.user.userId;
        return this.orderService.create(createOrderDto);
    }
    findAll() {
        return this.orderService.findAll();
    }
    search(query) {
        return this.orderService.filter(query);
    }
    pendingPayment() {
        return this.orderService.pendingPayments();
    }
    completedPayment() {
        return this.orderService.completedPayments();
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
    update(id, updateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }
    remove(id) {
        return this.orderService.remove(id);
    }
    approve(id) {
        return this.orderService.approve(id);
    }
    enable(id) {
        return this.orderService.enable(id);
    }
    disable(id, req) {
        return this.orderService.disable(id, req.user.userId);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('checkout'),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(checkout_order_dto_1.CheckoutOrderSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "checkout", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_order_dto_1.CreateOrderSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('canViewOrders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(order_entity_1.OrderParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewOrders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/pending-payment'),
    (0, common_1.HttpCode)(200),
    (0, permissions_decorator_1.Permissions)('canViewOrderPayment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "pendingPayment", null);
__decorate([
    (0, common_1.Get)('/completed-payment'),
    (0, common_1.HttpCode)(200),
    (0, permissions_decorator_1.Permissions)('canViewOrderPayment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "completedPayment", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('canViewOrderDetail'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, permissions_decorator_1.Permissions)('canApproveOrder'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "disable", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map