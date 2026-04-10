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
exports.ProductVariantController = void 0;
const common_1 = require("@nestjs/common");
const product_variant_service_1 = require("./product-variant.service");
const create_product_variant_dto_1 = require("./dto/create-product-variant.dto");
const update_product_variant_dto_1 = require("./dto/update-product-variant.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const product_variant_entity_1 = require("./entities/product-variant.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProductVariantController = class ProductVariantController {
    constructor(productVariantService) {
        this.productVariantService = productVariantService;
    }
    create(createProductVariantDto, req) {
        createProductVariantDto.enabledById = req.user.userId;
        return this.productVariantService.create(createProductVariantDto);
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
    update(id, updateProductVariantDto) {
        return this.productVariantService.update(id, updateProductVariantDto);
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
exports.ProductVariantController = ProductVariantController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_product_variant_dto_1.CreateProductVariantSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_variant_dto_1.CreateProductVariantDto, Object]),
    __metadata("design:returntype", void 0)
], ProductVariantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductVariantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(product_variant_entity_1.ProductVariantParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductVariantController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductVariantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_variant_dto_1.UpdateProductVariantDto]),
    __metadata("design:returntype", void 0)
], ProductVariantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductVariantController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductVariantController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductVariantController.prototype, "disable", null);
exports.ProductVariantController = ProductVariantController = __decorate([
    (0, common_1.Controller)('product-variant'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [product_variant_service_1.ProductVariantService])
], ProductVariantController);
//# sourceMappingURL=product-variant.controller.js.map