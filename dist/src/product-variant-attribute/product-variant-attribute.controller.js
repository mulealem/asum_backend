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
exports.ProductVariantAttributeController = void 0;
const common_1 = require("@nestjs/common");
const product_variant_attribute_service_1 = require("./product-variant-attribute.service");
const create_product_variant_attribute_dto_1 = require("./dto/create-product-variant-attribute.dto");
const update_product_variant_attribute_dto_1 = require("./dto/update-product-variant-attribute.dto");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const product_variant_attribute_entity_1 = require("./entities/product-variant-attribute.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProductVariantAttributeController = class ProductVariantAttributeController {
    constructor(productVariantAttributeService) {
        this.productVariantAttributeService = productVariantAttributeService;
    }
    create(createProductVariantAttributeDto) {
        return this.productVariantAttributeService.create(createProductVariantAttributeDto);
    }
    findAll() {
        return this.productVariantAttributeService.findAll();
    }
    search(query) {
        return this.productVariantAttributeService.filter(query);
    }
    findOne(id) {
        return this.productVariantAttributeService.findOne(id);
    }
    update(id, updateProductVariantAttributeDto) {
        return this.productVariantAttributeService.update(id, updateProductVariantAttributeDto);
    }
    remove(id) {
        return this.productVariantAttributeService.remove(id);
    }
    enable(id) {
        return this.productVariantAttributeService.enable(id);
    }
    disable(id, req) {
        return this.productVariantAttributeService.disable(id, req.user.userId);
    }
};
exports.ProductVariantAttributeController = ProductVariantAttributeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(create_product_variant_attribute_dto_1.CreateProductVariantAttributeSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_variant_attribute_dto_1.CreateProductVariantAttributeDto]),
    __metadata("design:returntype", void 0)
], ProductVariantAttributeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductVariantAttributeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(product_variant_attribute_entity_1.ProductVariantAttributeParameterSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductVariantAttributeController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductVariantAttributeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_variant_attribute_dto_1.UpdateProductVariantAttributeDto]),
    __metadata("design:returntype", void 0)
], ProductVariantAttributeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductVariantAttributeController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/enable'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductVariantAttributeController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)(':id/disable'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductVariantAttributeController.prototype, "disable", null);
exports.ProductVariantAttributeController = ProductVariantAttributeController = __decorate([
    (0, common_1.Controller)('product-variant-attribute'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [product_variant_attribute_service_1.ProductVariantAttributeService])
], ProductVariantAttributeController);
//# sourceMappingURL=product-variant-attribute.controller.js.map