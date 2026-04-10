"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStockSourceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stock_source_dto_1 = require("./create-stock-source.dto");
class UpdateStockSourceDto extends (0, mapped_types_1.PartialType)(create_stock_source_dto_1.CreateStockSourceDto) {
}
exports.UpdateStockSourceDto = UpdateStockSourceDto;
//# sourceMappingURL=update-stock-source.dto.js.map