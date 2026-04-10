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
exports.DiscardedStockController = void 0;
const common_1 = require("@nestjs/common");
const discarded_stock_service_1 = require("./discarded-stock.service");
const create_discarded_stock_dto_1 = require("./dto/create-discarded-stock.dto");
const update_discarded_stock_dto_1 = require("./dto/update-discarded-stock.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const discarded_stock_entity_1 = require("./entities/discarded-stock.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let DiscardedStockController = class DiscardedStockController {
    constructor(discardedStockService) {
        this.discardedStockService = discardedStockService;
    }
    create(createDiscardedStockDto, req) {
        createDiscardedStockDto.enabledById = req.user.userId;
        return this.discardedStockService.create(createDiscardedStockDto);
    }
    findAll() {
        return this.discardedStockService.findAll();
    }
    search(query) {
        return this.discardedStockService.filter(query);
    }
    findOne(id) {
        return this.discardedStockService.findOne(id);
    }
    update(id, updateDiscardedStockDto) {
        return this.discardedStockService.update(id, updateDiscardedStockDto);
    }
    remove(id) {
        return this.discardedStockService.remove(id);
    }
    enable(id) {
        return this.discardedStockService.enable(id);
    }
    disable(id, req) {
        return this.discardedStockService.disable(id, req.user.userId);
    }
};
exports.DiscardedStockController = DiscardedStockController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_discarded_stock_dto_1.CreateDiscardedStockSchema)),
    (0, permissions_decorator_1.Permissions)('canAddInventory'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discarded_stock_dto_1.CreateDiscardedStockDto, Object]),
    __metadata("design:returntype", void 0)
], DiscardedStockController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('canViewInventoryDetail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscardedStockController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(discarded_stock_entity_1.DiscardedStockParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewInventoryDetail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiscardedStockController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('canViewInventoryDetail'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscardedStockController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_discarded_stock_dto_1.UpdateDiscardedStockDto]),
    __metadata("design:returntype", void 0)
], DiscardedStockController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscardedStockController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscardedStockController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DiscardedStockController.prototype, "disable", null);
exports.DiscardedStockController = DiscardedStockController = __decorate([
    (0, common_1.Controller)('discarded-stock'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [discarded_stock_service_1.DiscardedStockService])
], DiscardedStockController);
//# sourceMappingURL=discarded-stock.controller.js.map