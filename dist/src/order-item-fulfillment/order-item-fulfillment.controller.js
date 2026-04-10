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
exports.OrderItemFulfillmentController = void 0;
const common_1 = require("@nestjs/common");
const order_item_fulfillment_service_1 = require("./order-item-fulfillment.service");
const create_order_item_fulfillment_dto_1 = require("./dto/create-order-item-fulfillment.dto");
const update_order_item_fulfillment_dto_1 = require("./dto/update-order-item-fulfillment.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const order_item_fulfillment_entity_1 = require("./entities/order-item-fulfillment.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let OrderItemFulfillmentController = class OrderItemFulfillmentController {
    constructor(orderItemFulfillmentService) {
        this.orderItemFulfillmentService = orderItemFulfillmentService;
    }
    create(createOrderItemFulfillmentDto, req) {
        createOrderItemFulfillmentDto.enabledById = req.user.userId;
        return this.orderItemFulfillmentService.create(createOrderItemFulfillmentDto);
    }
    findAll() {
        return this.orderItemFulfillmentService.findAll();
    }
    search(query) {
        return this.orderItemFulfillmentService.filter(query);
    }
    findOne(id) {
        return this.orderItemFulfillmentService.findOne(id);
    }
    update(id, updateOrderItemFulfillmentDto) {
        return this.orderItemFulfillmentService.update(id, updateOrderItemFulfillmentDto);
    }
    remove(id) {
        return this.orderItemFulfillmentService.remove(id);
    }
    enable(id) {
        return this.orderItemFulfillmentService.enable(id);
    }
    disable(id, req) {
        return this.orderItemFulfillmentService.disable(id, req.user.userId);
    }
};
exports.OrderItemFulfillmentController = OrderItemFulfillmentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_order_item_fulfillment_dto_1.CreateOrderItemFulfillmentSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_item_fulfillment_dto_1.CreateOrderItemFulfillmentDto, Object]),
    __metadata("design:returntype", void 0)
], OrderItemFulfillmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderItemFulfillmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(order_item_fulfillment_entity_1.OrderItemFulfillmentParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderItemFulfillmentController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderItemFulfillmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_item_fulfillment_dto_1.UpdateOrderItemFulfillmentDto]),
    __metadata("design:returntype", void 0)
], OrderItemFulfillmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderItemFulfillmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderItemFulfillmentController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderItemFulfillmentController.prototype, "disable", null);
exports.OrderItemFulfillmentController = OrderItemFulfillmentController = __decorate([
    (0, common_1.Controller)('order-item-fulfillment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [order_item_fulfillment_service_1.OrderItemFulfillmentService])
], OrderItemFulfillmentController);
//# sourceMappingURL=order-item-fulfillment.controller.js.map