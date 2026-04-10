"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfProductModule = void 0;
const common_1 = require("@nestjs/common");
const type_of_product_service_1 = require("./type-of-product.service");
const type_of_product_controller_1 = require("./type-of-product.controller");
let TypeOfProductModule = class TypeOfProductModule {
};
exports.TypeOfProductModule = TypeOfProductModule;
exports.TypeOfProductModule = TypeOfProductModule = __decorate([
    (0, common_1.Module)({
        controllers: [type_of_product_controller_1.TypeOfProductController],
        providers: [type_of_product_service_1.TypeOfProductService],
    })
], TypeOfProductModule);
//# sourceMappingURL=type-of-product.module.js.map