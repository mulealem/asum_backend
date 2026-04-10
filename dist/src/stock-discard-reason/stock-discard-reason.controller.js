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
exports.StockDiscardReasonController = void 0;
const common_1 = require("@nestjs/common");
const stock_discard_reason_service_1 = require("./stock-discard-reason.service");
const create_stock_discard_reason_dto_1 = require("./dto/create-stock-discard-reason.dto");
const update_stock_discard_reason_dto_1 = require("./dto/update-stock-discard-reason.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const stock_discard_reason_entity_1 = require("./entities/stock-discard-reason.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let StockDiscardReasonController = class StockDiscardReasonController {
    constructor(stockDiscardReasonService) {
        this.stockDiscardReasonService = stockDiscardReasonService;
    }
    create(createStockDiscardReasonDto, req) {
        createStockDiscardReasonDto.enabledById = req.user.userId;
        return this.stockDiscardReasonService.create(createStockDiscardReasonDto);
    }
    findAll() {
        return this.stockDiscardReasonService.findAll();
    }
    search(query) {
        return this.stockDiscardReasonService.filter(query);
    }
    findOne(id) {
        return this.stockDiscardReasonService.findOne(id);
    }
    update(id, updateStockDiscardReasonDto) {
        return this.stockDiscardReasonService.update(id, updateStockDiscardReasonDto);
    }
    remove(id) {
        return this.stockDiscardReasonService.remove(id);
    }
    enable(id) {
        return this.stockDiscardReasonService.enable(id);
    }
    disable(id, req) {
        return this.stockDiscardReasonService.disable(id, req.user.userId);
    }
};
exports.StockDiscardReasonController = StockDiscardReasonController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_stock_discard_reason_dto_1.CreateStockDiscardReasonSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_discard_reason_dto_1.CreateStockDiscardReasonDto, Object]),
    __metadata("design:returntype", void 0)
], StockDiscardReasonController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockDiscardReasonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(stock_discard_reason_entity_1.StockDiscardReasonParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockDiscardReasonController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockDiscardReasonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_discard_reason_dto_1.UpdateStockDiscardReasonDto]),
    __metadata("design:returntype", void 0)
], StockDiscardReasonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockDiscardReasonController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockDiscardReasonController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StockDiscardReasonController.prototype, "disable", null);
exports.StockDiscardReasonController = StockDiscardReasonController = __decorate([
    (0, common_1.Controller)('stock-discard-reason'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stock_discard_reason_service_1.StockDiscardReasonService])
], StockDiscardReasonController);
//# sourceMappingURL=stock-discard-reason.controller.js.map