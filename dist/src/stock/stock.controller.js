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
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const stock_service_1 = require("./stock.service");
const create_stock_dto_1 = require("./dto/create-stock.dto");
const update_stock_dto_1 = require("./dto/update-stock.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const stock_entity_1 = require("./entities/stock.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let StockController = class StockController {
    constructor(stockService) {
        this.stockService = stockService;
    }
    create(createStockDto, req) {
        createStockDto.enabledById = req.user.userId;
        return this.stockService.create(createStockDto);
    }
    findAll() {
        return this.stockService.findAll();
    }
    search(query) {
        return this.stockService.filter(query);
    }
    overview(query) {
        return this.stockService.overview(query);
    }
    availableStock(typeOfProductId, locationId) {
        return this.stockService.availableStock(typeOfProductId, locationId);
    }
    findOne(id) {
        return this.stockService.findOne(id);
    }
    update(id, updateStockDto) {
        return this.stockService.update(id, updateStockDto);
    }
    remove(id) {
        return this.stockService.remove(id);
    }
    enable(id) {
        return this.stockService.enable(id);
    }
    disable(id, req) {
        return this.stockService.disable(id, req.user.userId);
    }
};
exports.StockController = StockController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_stock_dto_1.CreateStockSchema)),
    (0, permissions_decorator_1.Permissions)('canAddInventory'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_dto_1.CreateStockDto, Object]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('canViewInventory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(stock_entity_1.StockParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewInventory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('/overview'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(stock_entity_1.StockParameterSchema)),
    (0, permissions_decorator_1.Permissions)('canViewInventory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "overview", null);
__decorate([
    (0, common_1.Get)('/available/:typeOfProductId'),
    (0, permissions_decorator_1.Permissions)('canViewInventoryDetail'),
    __param(0, (0, common_1.Param)('typeOfProductId')),
    __param(1, (0, common_1.Query)('locationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "availableStock", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.Permissions)('canViewInventoryDetail'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_dto_1.UpdateStockDto]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "disable", null);
exports.StockController = StockController = __decorate([
    (0, common_1.Controller)('stock'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], StockController);
//# sourceMappingURL=stock.controller.js.map