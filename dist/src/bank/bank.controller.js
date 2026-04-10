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
exports.BankController = void 0;
const common_1 = require("@nestjs/common");
const bank_service_1 = require("./bank.service");
const create_bank_dto_1 = require("./dto/create-bank.dto");
const update_bank_dto_1 = require("./dto/update-bank.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const bank_entity_1 = require("./entities/bank.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BankController = class BankController {
    constructor(bankService) {
        this.bankService = bankService;
    }
    create(createBankDto, req) {
        createBankDto.enabledById = req.user.userId;
        return this.bankService.create(createBankDto);
    }
    findAll() {
        return this.bankService.findAll();
    }
    search(query) {
        return this.bankService.filter(query);
    }
    findOne(id) {
        return this.bankService.findOne(id);
    }
    update(id, updateBankDto) {
        return this.bankService.update(id, updateBankDto);
    }
    remove(id) {
        return this.bankService.remove(id);
    }
    enable(id) {
        return this.bankService.enable(id);
    }
    disable(id, req) {
        return this.bankService.disable(id, req.user.userId);
    }
};
exports.BankController = BankController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_bank_dto_1.CreateBankSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bank_dto_1.CreateBankDto, Object]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BankController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(bank_entity_1.BankParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bank_dto_1.UpdateBankDto]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "disable", null);
exports.BankController = BankController = __decorate([
    (0, common_1.Controller)('bank'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [bank_service_1.BankService])
], BankController);
//# sourceMappingURL=bank.controller.js.map