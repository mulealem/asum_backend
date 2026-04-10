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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ShipmentItemService = class ShipmentItemService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.$transaction(async (tx) => {
            await this.validateShipmentItemQuantities(tx, [data]);
            return tx.shipmentItem.create({
                data,
            });
        });
    }
    createMany(data) {
        return this.prisma.$transaction(async (tx) => {
            await this.validateShipmentItemQuantities(tx, data);
            return tx.shipmentItem.createMany({
                data,
            });
        });
    }
    async validateShipmentItemQuantities(tx, shipmentItems) {
        if (shipmentItems.length === 0) {
            throw new common_1.BadRequestException('At least one shipment item is required');
        }
        const fulfillmentItems = shipmentItems.filter((item) => item.orderItemFulfillmentId);
        if (fulfillmentItems.length === 0)
            return;
        const fulfillmentIds = Array.from(new Set(fulfillmentItems.map((item) => item.orderItemFulfillmentId)));
        const fulfillments = await tx.orderItemFulfillment.findMany({
            where: {
                id: { in: fulfillmentIds },
                isEnabled: true,
            },
            select: {
                id: true,
                fulfilledQuantity: true,
                shippedQuantity: true,
            },
        });
        if (fulfillments.length !== fulfillmentIds.length) {
            throw new common_1.NotFoundException('One or more order item fulfillment records were not found');
        }
        const existingShipmentItems = await tx.shipmentItem.findMany({
            where: {
                isEnabled: true,
                orderItemFulfillmentId: { in: fulfillmentIds },
                shipment: {
                    isShipmentCompleted: false,
                    isEnabled: true,
                },
            },
            select: {
                orderItemFulfillmentId: true,
                quantity: true,
            },
        });
        const requestedByFulfillment = new Map();
        const alreadyAllocatedByFulfillment = new Map();
        for (const item of fulfillmentItems) {
            if (!item.quantity || item.quantity <= 0) {
                throw new common_1.BadRequestException('Shipment item quantity must be greater than 0');
            }
            requestedByFulfillment.set(item.orderItemFulfillmentId, (requestedByFulfillment.get(item.orderItemFulfillmentId) ?? 0) +
                item.quantity);
        }
        for (const existing of existingShipmentItems) {
            if (!existing.orderItemFulfillmentId) {
                continue;
            }
            alreadyAllocatedByFulfillment.set(existing.orderItemFulfillmentId, (alreadyAllocatedByFulfillment.get(existing.orderItemFulfillmentId) ??
                0) + existing.quantity);
        }
        const fulfillmentMap = new Map(fulfillments.map((f) => [f.id, f]));
        for (const [fulfillmentId, requestedQuantity] of requestedByFulfillment) {
            const fulfillment = fulfillmentMap.get(fulfillmentId);
            if (!fulfillment) {
                throw new common_1.NotFoundException(`Order item fulfillment ${fulfillmentId} was not found`);
            }
            const availableToShip = fulfillment.fulfilledQuantity -
                fulfillment.shippedQuantity -
                (alreadyAllocatedByFulfillment.get(fulfillmentId) ?? 0);
            if (requestedQuantity > availableToShip) {
                throw new common_1.BadRequestException(`Shipment quantity for fulfillment ${fulfillmentId} exceeds available quantity`);
            }
        }
    }
    findAll() {
        return this.prisma.shipmentItem.findMany({
            include: {
                orderItemFulfillment: {
                    include: {
                        orderItem: {
                            include: {
                                order: {
                                    include: {
                                        customer: true,
                                    },
                                },
                            },
                        },
                        stock: {
                            include: {
                                productVariant: {
                                    include: {
                                        product: true,
                                        ProductVariantAttribute: true,
                                        ProductVariantPrice: true,
                                    },
                                },
                            },
                        },
                    },
                },
                stock: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                                ProductVariantAttribute: true,
                                ProductVariantPrice: true,
                            },
                        },
                        location: true,
                    },
                },
                shipment: true,
                ShipmentItemStatus: true,
            },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        return this.prisma.shipmentItem.findMany({
            where: {
                AND: [
                    query.shipmentIds ? { shipmentId: { in: query.shipmentIds } } : {},
                    query.orderItemFulfillmentIds
                        ? { orderItemFulfillmentId: { in: query.orderItemFulfillmentIds } }
                        : {},
                    query.stockIds ? { stockId: { in: query.stockIds } } : {},
                    query.ids ? { id: { in: query.ids } } : {},
                    query.enabledByIds ? { enabledById: query.enabledByIds } : {},
                    query.disabledByIds ? { disabledById: query.disabledByIds } : {},
                    query.isEnabled ? { isEnabled: query.isEnabled } : {},
                    query.enabledStartDate
                        ? { createdAt: { gte: query.enabledStartDate } }
                        : {},
                    query.enabledEndDate
                        ? { createdAt: { lte: query.enabledEndDate } }
                        : {},
                    query.disabledStartDate
                        ? { disabledDate: { gte: query.disabledStartDate } }
                        : {},
                    query.disabledEndDate
                        ? { disabledDate: { lte: query.disabledEndDate } }
                        : {},
                ],
            },
            include: {
                orderItemFulfillment: {
                    include: {
                        orderItem: {
                            include: {
                                order: {
                                    include: {
                                        customer: true,
                                    },
                                },
                            },
                        },
                        stock: {
                            include: {
                                productVariant: {
                                    include: {
                                        product: true,
                                        ProductVariantAttribute: true,
                                        ProductVariantPrice: true,
                                    },
                                },
                            },
                        },
                    },
                },
                stock: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                                ProductVariantAttribute: true,
                                ProductVariantPrice: true,
                            },
                        },
                        location: true,
                    },
                },
                shipment: true,
                ShipmentItemStatus: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.shipmentItem.findUnique({
            where: { id },
            include: {
                orderItemFulfillment: {
                    include: {
                        orderItem: {
                            include: {
                                order: true,
                            },
                        },
                        stock: {
                            include: {
                                productVariant: {
                                    include: {
                                        product: true,
                                        ProductVariantAttribute: true,
                                        ProductVariantPrice: true,
                                    },
                                },
                            },
                        },
                    },
                },
                stock: {
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                                ProductVariantAttribute: true,
                                ProductVariantPrice: true,
                            },
                        },
                        location: true,
                    },
                },
                shipment: true,
                ShipmentItemStatus: true,
            },
        });
    }
    update(id, updateShipmentItemDto) {
        return this.prisma.shipmentItem.update({
            where: { id },
            data: updateShipmentItemDto,
        });
    }
    enable(id) {
        return this.prisma.shipmentItem.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.shipmentItem.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.shipmentItem.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.ShipmentItemService = ShipmentItemService;
exports.ShipmentItemService = ShipmentItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShipmentItemService);
//# sourceMappingURL=shipment-item.service.js.map