"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShipmentStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_shipment_status_dto_1 = require("./create-shipment-status.dto");
class UpdateShipmentStatusDto extends (0, swagger_1.PartialType)(create_shipment_status_dto_1.CreateShipmentStatusDto) {
}
exports.UpdateShipmentStatusDto = UpdateShipmentStatusDto;
//# sourceMappingURL=update-shipment-status.dto.js.map