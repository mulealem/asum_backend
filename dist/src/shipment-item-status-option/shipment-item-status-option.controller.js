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
exports.ShipmentItemStatusOptionController = void 0;
const common_1 = require("@nestjs/common");
const shipment_item_status_option_service_1 = require("./shipment-item-status-option.service");
const create_shipment_item_status_option_dto_1 = require("./dto/create-shipment-item-status-option.dto");
const update_shipment_item_status_option_dto_1 = require("./dto/update-shipment-item-status-option.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const shipment_item_status_option_entity_1 = require("./entities/shipment-item-status-option.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ShipmentItemStatusOptionController = class ShipmentItemStatusOptionController {
    constructor(shipmentItemStatusOptionService) {
        this.shipmentItemStatusOptionService = shipmentItemStatusOptionService;
    }
    create(createShipmentItemStatusOptionDto, req) {
        createShipmentItemStatusOptionDto.enabledById = req.user.userId;
        return this.shipmentItemStatusOptionService.create(createShipmentItemStatusOptionDto);
    }
    findAll() {
        return this.shipmentItemStatusOptionService.findAll();
    }
    search(query) {
        return this.shipmentItemStatusOptionService.filter(query);
    }
    findOne(id) {
        return this.shipmentItemStatusOptionService.findOne(id);
    }
    update(id, updateShipmentItemStatusOptionDto) {
        return this.shipmentItemStatusOptionService.update(id, updateShipmentItemStatusOptionDto);
    }
    remove(id) {
        return this.shipmentItemStatusOptionService.remove(id);
    }
    enable(id) {
        return this.shipmentItemStatusOptionService.enable(id);
    }
    disable(id, req) {
        return this.shipmentItemStatusOptionService.disable(id, req.user.userId);
    }
};
exports.ShipmentItemStatusOptionController = ShipmentItemStatusOptionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_shipment_item_status_option_dto_1.CreateShipmentItemStatusOptionSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipment_item_status_option_dto_1.CreateShipmentItemStatusOptionDto, Object]),
    __metadata("design:returntype", void 0)
], ShipmentItemStatusOptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShipmentItemStatusOptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(shipment_item_status_option_entity_1.ShipmentItemStatusOptionParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShipmentItemStatusOptionController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentItemStatusOptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipment_item_status_option_dto_1.UpdateShipmentItemStatusOptionDto]),
    __metadata("design:returntype", void 0)
], ShipmentItemStatusOptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentItemStatusOptionController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentItemStatusOptionController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShipmentItemStatusOptionController.prototype, "disable", null);
exports.ShipmentItemStatusOptionController = ShipmentItemStatusOptionController = __decorate([
    (0, common_1.Controller)('shipment-item-status-option'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [shipment_item_status_option_service_1.ShipmentItemStatusOptionService])
], ShipmentItemStatusOptionController);
//# sourceMappingURL=shipment-item-status-option.controller.js.map