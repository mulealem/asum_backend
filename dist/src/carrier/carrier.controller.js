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
exports.CarrierController = void 0;
const common_1 = require("@nestjs/common");
const carrier_service_1 = require("./carrier.service");
const create_carrier_dto_1 = require("./dto/create-carrier.dto");
const update_carrier_dto_1 = require("./dto/update-carrier.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const carrier_entity_1 = require("./entities/carrier.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CarrierController = class CarrierController {
    constructor(carrierService) {
        this.carrierService = carrierService;
    }
    create(createCarrierDto, req) {
        createCarrierDto.enabledById = req.user.userId;
        return this.carrierService.create(createCarrierDto);
    }
    findAll() {
        return this.carrierService.findAll();
    }
    search(query) {
        return this.carrierService.filter(query);
    }
    findOne(id) {
        return this.carrierService.findOne(id);
    }
    update(id, updateCarrierDto) {
        return this.carrierService.update(id, updateCarrierDto);
    }
    remove(id) {
        return this.carrierService.remove(id);
    }
    enable(id) {
        return this.carrierService.enable(id);
    }
    disable(id, req) {
        return this.carrierService.disable(id, req.user.userId);
    }
};
exports.CarrierController = CarrierController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_carrier_dto_1.CreateCarrierSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_carrier_dto_1.CreateCarrierDto, Object]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(carrier_entity_1.CarrierParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_carrier_dto_1.UpdateCarrierDto]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "disable", null);
exports.CarrierController = CarrierController = __decorate([
    (0, common_1.Controller)('carrier'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [carrier_service_1.CarrierService])
], CarrierController);
//# sourceMappingURL=carrier.controller.js.map