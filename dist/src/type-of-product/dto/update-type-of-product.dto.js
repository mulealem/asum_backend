"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTypeOfProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_type_of_product_dto_1 = require("./create-type-of-product.dto");
class UpdateTypeOfProductDto extends (0, mapped_types_1.PartialType)(create_type_of_product_dto_1.CreateTypeOfProductDto) {
}
exports.UpdateTypeOfProductDto = UpdateTypeOfProductDto;
//# sourceMappingURL=update-type-of-product.dto.js.map