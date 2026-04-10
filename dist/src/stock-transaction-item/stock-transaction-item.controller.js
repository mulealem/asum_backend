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
exports.StockTransactionItemController = void 0;
const common_1 = require("@nestjs/common");
const stock_transaction_item_service_1 = require("./stock-transaction-item.service");
const create_stock_transaction_item_dto_1 = require("./dto/create-stock-transaction-item.dto");
const update_stock_transaction_item_dto_1 = require("./dto/update-stock-transaction-item.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const stock_transaction_item_entity_1 = require("./entities/stock-transaction-item.entity");
let StockTransactionItemController = class StockTransactionItemController {
    constructor(stockTransactionItemService) {
        this.stockTransactionItemService = stockTransactionItemService;
    }
    create(createStockTransactionItemDto, req) {
        createStockTransactionItemDto.enabledById = req.user.userId;
        return this.stockTransactionItemService.create(createStockTransactionItemDto);
    }
    findAll() {
        return this.stockTransactionItemService.findAll();
    }
    search(query) {
        return this.stockTransactionItemService.filter(query);
    }
    findOne(id) {
        return this.stockTransactionItemService.findOne(id);
    }
    update(id, updateStockTransactionItemDto) {
        return this.stockTransactionItemService.update(id, updateStockTransactionItemDto);
    }
    remove(id) {
        return this.stockTransactionItemService.remove(id);
    }
};
exports.StockTransactionItemController = StockTransactionItemController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_stock_transaction_item_dto_1.CreateStockTransactionItemSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stock_transaction_item_dto_1.CreateStockTransactionItemDto, Object]),
    __metadata("design:returntype", void 0)
], StockTransactionItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockTransactionItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(stock_transaction_item_entity_1.StockTransactionItemSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockTransactionItemController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockTransactionItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stock_transaction_item_dto_1.UpdateStockTransactionItemDto]),
    __metadata("design:returntype", void 0)
], StockTransactionItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockTransactionItemController.prototype, "remove", null);
exports.StockTransactionItemController = StockTransactionItemController = __decorate([
    (0, common_1.Controller)('stock-transaction-item'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stock_transaction_item_service_1.StockTransactionItemService])
], StockTransactionItemController);
//# sourceMappingURL=stock-transaction-item.controller.js.map