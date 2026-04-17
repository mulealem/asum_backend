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
exports.StockAdjustmentController = void 0;
const common_1 = require("@nestjs/common");
const stock_adjustment_service_1 = require("./stock-adjustment.service");
const create_stock_adjustment_dto_1 = require("./dto/create-stock-adjustment.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const stock_adjustment_entity_1 = require("./entities/stock-adjustment.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let StockAdjustmentController = class StockAdjustmentController {
    constructor(stockAdjustmentService) {
        this.stockAdjustmentService = stockAdjustmentService;
    }
    create(dto, req) {
        dto.enabledById = req.user.userId;
        return this.stockAdjustmentService.create(dto);
    }
    findAll() {
        return this.stockAdjustmentService.findAll();
    }
    search(query) {
        return this.stockAdjustmentService.filter(query);
    }
    findOne(id) {
        return this.stockAdjustmentService.findOne(id);
    }
    remove(id) {
        return this.stockAdjustmentService.remove(id);
    }
    enable(id) {
        return this.stockAdjustmentService.enable(id);
    }
    disable(id, req) {
        return this.stockAdjustmentService.disable(id, req.user.userId);
    }
};
exports.StockAdjustmentController = StockAdjustmentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_stock_adjustment_dto_1.CreateStockAdjustmentSchema)),
    (0, permissions_decorator_1.Permissions)('canAddInventory'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_adjustment_dto_1.CreateStockAdjustmentDto, Object]),
    __metadata("design:returntype", void 0)
], StockAdjustmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('canViewInventoryDetail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockAdjustmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(stock_adjustment_entity_1.StockAdjustmentParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewInventoryDetail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockAdjustmentController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('canViewInventoryDetail'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockAdjustmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockAdjustmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockAdjustmentController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StockAdjustmentController.prototype, "disable", null);
exports.StockAdjustmentController = StockAdjustmentController = __decorate([
    (0, common_1.Controller)('stock-adjustment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stock_adjustment_service_1.StockAdjustmentService])
], StockAdjustmentController);
//# sourceMappingURL=stock-adjustment.controller.js.map