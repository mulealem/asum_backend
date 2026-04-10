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
exports.ShipmentItemController = void 0;
const common_1 = require("@nestjs/common");
const shipment_item_service_1 = require("./shipment-item.service");
const create_shipment_item_dto_1 = require("./dto/create-shipment-item.dto");
const update_shipment_item_dto_1 = require("./dto/update-shipment-item.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const shipment_item_entity_1 = require("./entities/shipment-item.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ShipmentItemController = class ShipmentItemController {
    constructor(productVariantService) {
        this.productVariantService = productVariantService;
    }
    create(createShipmentItemDto, req) {
        createShipmentItemDto.enabledById = req.user.userId;
        return this.productVariantService.create(createShipmentItemDto);
    }
    createMany(createShipmentItemDto, req) {
        console.log(req.user);
        let createShipmentItems = createShipmentItemDto.map((item) => {
            return {
                ...item,
                enabledById: req.user.userId,
            };
        });
        return this.productVariantService.createMany(createShipmentItems);
    }
    findAll() {
        return this.productVariantService.findAll();
    }
    search(query) {
        return this.productVariantService.filter(query);
    }
    findOne(id) {
        return this.productVariantService.findOne(id);
    }
    update(id, updateShipmentItemDto) {
        return this.productVariantService.update(id, updateShipmentItemDto);
    }
    remove(id) {
        return this.productVariantService.remove(id);
    }
    enable(id) {
        return this.productVariantService.enable(id);
    }
    disable(id, req) {
        return this.productVariantService.disable(id, req.user.userId);
    }
};
exports.ShipmentItemController = ShipmentItemController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_shipment_item_dto_1.CreateShipmentItemSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipment_item_dto_1.CreateShipmentItemDto, Object]),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/create-many'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(shipment_item_entity_1.ShipmentItemParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipment_item_dto_1.UpdateShipmentItemDto]),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShipmentItemController.prototype, "disable", null);
exports.ShipmentItemController = ShipmentItemController = __decorate([
    (0, common_1.Controller)('shipment-item'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [shipment_item_service_1.ShipmentItemService])
], ShipmentItemController);
//# sourceMappingURL=shipment-item.controller.js.map