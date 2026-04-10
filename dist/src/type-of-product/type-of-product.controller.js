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
exports.TypeOfProductController = void 0;
const common_1 = require("@nestjs/common");
const type_of_product_service_1 = require("./type-of-product.service");
const create_type_of_product_dto_1 = require("./dto/create-type-of-product.dto");
const update_type_of_product_dto_1 = require("./dto/update-type-of-product.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const type_of_product_entity_1 = require("./entities/type-of-product.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TypeOfProductController = class TypeOfProductController {
    constructor(typeOfProductService) {
        this.typeOfProductService = typeOfProductService;
    }
    create(createTypeOfProductDto, req) {
        createTypeOfProductDto.enabledById = req.user.userId;
        return this.typeOfProductService.create(createTypeOfProductDto);
    }
    findAll() {
        return this.typeOfProductService.findAll();
    }
    search(query) {
        return this.typeOfProductService.filter(query);
    }
    findOne(id) {
        return this.typeOfProductService.findOne(id);
    }
    update(id, updateTypeOfProductDto) {
        return this.typeOfProductService.update(id, updateTypeOfProductDto);
    }
    remove(id) {
        return this.typeOfProductService.remove(id);
    }
    enable(id) {
        return this.typeOfProductService.enable(id);
    }
    disable(id, req) {
        return this.typeOfProductService.disable(id, req.user.userId);
    }
};
exports.TypeOfProductController = TypeOfProductController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_type_of_product_dto_1.CreateTypeOfProductSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_type_of_product_dto_1.CreateTypeOfProductDto, Object]),
    __metadata("design:returntype", void 0)
], TypeOfProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypeOfProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(type_of_product_entity_1.TypeOfProductParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TypeOfProductController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeOfProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_type_of_product_dto_1.UpdateTypeOfProductDto]),
    __metadata("design:returntype", void 0)
], TypeOfProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeOfProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeOfProductController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TypeOfProductController.prototype, "disable", null);
exports.TypeOfProductController = TypeOfProductController = __decorate([
    (0, common_1.Controller)('type-of-product'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [type_of_product_service_1.TypeOfProductService])
], TypeOfProductController);
//# sourceMappingURL=type-of-product.controller.js.map