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
exports.StockSourceController = void 0;
const common_1 = require("@nestjs/common");
const stock_source_service_1 = require("./stock-source.service");
const create_stock_source_dto_1 = require("./dto/create-stock-source.dto");
const update_stock_source_dto_1 = require("./dto/update-stock-source.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const stock_source_entity_1 = require("./entities/stock-source.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let StockSourceController = class StockSourceController {
    constructor(stockSourceService) {
        this.stockSourceService = stockSourceService;
    }
    create(createStockSourceDto, req) {
        createStockSourceDto.enabledById = req.user.userId;
        return this.stockSourceService.create(createStockSourceDto);
    }
    findAll() {
        return this.stockSourceService.findAll();
    }
    search(query) {
        return this.stockSourceService.filter(query);
    }
    findOne(id) {
        return this.stockSourceService.findOne(id);
    }
    update(id, updateStockSourceDto) {
        return this.stockSourceService.update(id, updateStockSourceDto);
    }
    remove(id) {
        return this.stockSourceService.remove(id);
    }
    enable(id) {
        return this.stockSourceService.enable(id);
    }
    disable(id, req) {
        return this.stockSourceService.disable(id, req.user.userId);
    }
};
exports.StockSourceController = StockSourceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_stock_source_dto_1.CreateStockSourceSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_source_dto_1.CreateStockSourceDto, Object]),
    __metadata("design:returntype", void 0)
], StockSourceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockSourceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(stock_source_entity_1.StockSourceParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockSourceController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockSourceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_source_dto_1.UpdateStockSourceDto]),
    __metadata("design:returntype", void 0)
], StockSourceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockSourceController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockSourceController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StockSourceController.prototype, "disable", null);
exports.StockSourceController = StockSourceController = __decorate([
    (0, common_1.Controller)('stock-source'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stock_source_service_1.StockSourceService])
], StockSourceController);
//# sourceMappingURL=stock-source.controller.js.map