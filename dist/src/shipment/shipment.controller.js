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
exports.ShipmentController = void 0;
const common_1 = require("@nestjs/common");
const shipment_service_1 = require("./shipment.service");
const create_shipment_dto_1 = require("./dto/create-shipment.dto");
const create_shipment_with_items_dto_1 = require("./dto/create-shipment-with-items.dto");
const create_transfer_with_items_dto_1 = require("./dto/create-transfer-with-items.dto");
const bulk_advance_dto_1 = require("./dto/bulk-advance.dto");
const update_shipment_dto_1 = require("./dto/update-shipment.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const shipment_entity_1 = require("./entities/shipment.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let ShipmentController = class ShipmentController {
    constructor(shipmentService) {
        this.shipmentService = shipmentService;
    }
    create(createShipmentDto, req) {
        createShipmentDto.enabledById = req.user.userId;
        return this.shipmentService.create(createShipmentDto);
    }
    createWithItems(body, req) {
        return this.shipmentService.createWithItems(body, req.user.userId);
    }
    createTransferWithItems(body, req) {
        return this.shipmentService.createTransferWithItems(body, req.user.userId);
    }
    bulkAdvance(body, req) {
        return this.shipmentService.bulkAdvance(body.ids, req.user.userId);
    }
    findAll() {
        return this.shipmentService.findAll();
    }
    search(query) {
        return this.shipmentService.filter(query);
    }
    findOne(id) {
        return this.shipmentService.findOne(id);
    }
    update(id, updateShipmentDto) {
        return this.shipmentService.update(id, updateShipmentDto);
    }
    remove(id) {
        return this.shipmentService.remove(id);
    }
    enable(id) {
        return this.shipmentService.enable(id);
    }
    load(id, req) {
        return this.shipmentService.load(id, req.user.userId);
    }
    start(id, req) {
        return this.shipmentService.start(id, req.user.userId);
    }
    arrive(id, req) {
        return this.shipmentService.markAsArrived(id, req.user.userId);
    }
    complete(id, req) {
        return this.shipmentService.markAsCompleted(id, req.user.userId);
    }
    disable(id, req) {
        return this.shipmentService.disable(id, req.user.userId);
    }
};
exports.ShipmentController = ShipmentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_shipment_dto_1.CreateShipmentSchema)),
    (0, permissions_decorator_1.Permissions)('canAddOrderShipment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipment_dto_1.CreateShipmentDto, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/create-with-items'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_shipment_with_items_dto_1.CreateShipmentWithItemsSchema)),
    (0, permissions_decorator_1.Permissions)('canAddOrderShipment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "createWithItems", null);
__decorate([
    (0, common_1.Post)('/create-transfer-with-items'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_transfer_with_items_dto_1.CreateTransferWithItemsSchema)),
    (0, permissions_decorator_1.Permissions)('canAddOrderShipment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "createTransferWithItems", null);
__decorate([
    (0, common_1.Patch)('/bulk-advance'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(bulk_advance_dto_1.BulkAdvanceSchema)),
    (0, permissions_decorator_1.Permissions)('canScheduleOrderShipment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "bulkAdvance", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('canViewShipment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(shipment_entity_1.ShipmentParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewShipment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('canViewOrderShipment'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipment_dto_1.UpdateShipmentDto]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/load'),
    (0, permissions_decorator_1.Permissions)('canScheduleOrderShipment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "load", null);
__decorate([
    (0, common_1.Patch)(':id/start'),
    (0, permissions_decorator_1.Permissions)('canStartOrderShipment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "start", null);
__decorate([
    (0, common_1.Patch)(':id/mark-as-arrived'),
    (0, permissions_decorator_1.Permissions)('canReceiveOrderShipment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "arrive", null);
__decorate([
    (0, common_1.Patch)(':id/mark-as-completed'),
    (0, permissions_decorator_1.Permissions)('canCompleteShipment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "complete", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShipmentController.prototype, "disable", null);
exports.ShipmentController = ShipmentController = __decorate([
    (0, common_1.Controller)('shipment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [shipment_service_1.ShipmentService])
], ShipmentController);
//# sourceMappingURL=shipment.controller.js.map