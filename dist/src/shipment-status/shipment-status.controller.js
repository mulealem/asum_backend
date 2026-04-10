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
exports.ShipmentStatusController = void 0;
const common_1 = require("@nestjs/common");
const shipment_status_service_1 = require("./shipment-status.service");
const create_shipment_status_dto_1 = require("./dto/create-shipment-status.dto");
const update_shipment_status_dto_1 = require("./dto/update-shipment-status.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const shipment_status_entity_1 = require("./entities/shipment-status.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ShipmentStatusController = class ShipmentStatusController {
    constructor(shipmentStatusService) {
        this.shipmentStatusService = shipmentStatusService;
    }
    create(createShipmentStatusDto, req) {
        createShipmentStatusDto.enabledById = req.user.userId;
        return this.shipmentStatusService.create(createShipmentStatusDto);
    }
    findAll() {
        return this.shipmentStatusService.findAll();
    }
    search(query) {
        return this.shipmentStatusService.filter(query);
    }
    findOne(id) {
        return this.shipmentStatusService.findOne(id);
    }
    update(id, updateShipmentStatusDto) {
        return this.shipmentStatusService.update(id, updateShipmentStatusDto);
    }
    remove(id) {
        return this.shipmentStatusService.remove(id);
    }
    enable(id) {
        return this.shipmentStatusService.enable(id);
    }
    disable(id, req) {
        return this.shipmentStatusService.disable(id, req.user.userId);
    }
};
exports.ShipmentStatusController = ShipmentStatusController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_shipment_status_dto_1.CreateShipmentStatusSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipment_status_dto_1.CreateShipmentStatusDto, Object]),
    __metadata("design:returntype", void 0)
], ShipmentStatusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShipmentStatusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(shipment_status_entity_1.ShipmentStatusParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShipmentStatusController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentStatusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipment_status_dto_1.UpdateShipmentStatusDto]),
    __metadata("design:returntype", void 0)
], ShipmentStatusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentStatusController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentStatusController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShipmentStatusController.prototype, "disable", null);
exports.ShipmentStatusController = ShipmentStatusController = __decorate([
    (0, common_1.Controller)('shipment-status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [shipment_status_service_1.ShipmentStatusService])
], ShipmentStatusController);
//# sourceMappingURL=shipment-status.controller.js.map