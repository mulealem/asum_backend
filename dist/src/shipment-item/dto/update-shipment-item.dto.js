"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShipmentItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_shipment_item_dto_1 = require("./create-shipment-item.dto");
class UpdateShipmentItemDto extends (0, swagger_1.PartialType)(create_shipment_item_dto_1.CreateShipmentItemDto) {
}
exports.UpdateShipmentItemDto = UpdateShipmentItemDto;
//# sourceMappingURL=update-shipment-item.dto.js.map