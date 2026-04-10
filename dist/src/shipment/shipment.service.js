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
exports.ShipmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ShipmentService = class ShipmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        const { carrierId, enabledById, fromLocationId, toLocationId, ...rest } = data;
        return this.prisma.shipment.create({
            data: {
                ...rest,
                carrier: {
                    connect: { id: carrierId },
                },
                enabledBy: {
                    connect: { id: enabledById },
                },
                ...(fromLocationId
                    ? { fromLocation: { connect: { id: fromLocationId } } }
                    : {}),
                ...(toLocationId
                    ? { toLocation: { connect: { id: toLocationId } } }
                    : {}),
            },
        });
    }
    createWithItems(data, enabledById) {
        const { items, ...shipmentData } = data;
        return this.prisma.$transaction(async (tx) => {
            await this.validateShipmentItemQuantities(tx, items);
            const shipment = await tx.shipment.create({
                data: {
                    shipmentNumber: shipmentData.shipmentNumber,
                    shipmentScheduledDate: shipmentData.shipmentScheduledDate,
                    expectedArrivalDate: shipmentData.expectedArrivalDate,
                    note: shipmentData.note,
                    carrier: { connect: { id: shipmentData.carrierId } },
                    enabledBy: { connect: { id: enabledById } },
                    ...(shipmentData.fromLocationId
                        ? { fromLocation: { connect: { id: shipmentData.fromLocationId } } }
                        : {}),
                    ...(shipmentData.toLocationId
                        ? { toLocation: { connect: { id: shipmentData.toLocationId } } }
                        : {}),
                },
            });
            await tx.shipmentItem.createMany({
                data: items.map((item) => ({
                    shipmentId: shipment.id,
                    orderItemFulfillmentId: item.orderItemFulfillmentId,
                    quantity: item.quantity,
                    enabledById,
                })),
            });
            return tx.shipment.findUnique({
                where: { id: shipment.id },
                include: {
                    carrier: true,
                    fromLocation: true,
                    toLocation: true,
                    shipmentItems: true,
                    ShipmentStatus: true,
                },
            });
        });
    }
    createTransferWithItems(data, enabledById) {
        const { items, ...shipmentData } = data;
        return this.prisma.$transaction(async (tx) => {
            await this.validateTransferItemQuantities(tx, items, shipmentData.fromLocationId);
            const shipment = await tx.shipment.create({
                data: {
                    type: 'TRANSFER',
                    shipmentNumber: shipmentData.shipmentNumber,
                    shipmentScheduledDate: shipmentData.shipmentScheduledDate,
                    expectedArrivalDate: shipmentData.expectedArrivalDate,
                    note: shipmentData.note,
                    carrier: { connect: { id: shipmentData.carrierId } },
                    enabledBy: { connect: { id: enabledById } },
                    fromLocation: { connect: { id: shipmentData.fromLocationId } },
                    toLocation: { connect: { id: shipmentData.toLocationId } },
                },
            });
            await tx.shipmentItem.createMany({
                data: items.map((item) => ({
                    shipmentId: shipment.id,
                    stockId: item.stockId,
                    quantity: item.quantity,
                    enabledById,
                })),
            });
            return tx.shipment.findUnique({
                where: { id: shipment.id },
                include: {
                    carrier: true,
                    fromLocation: true,
                    toLocation: true,
                    shipmentItems: true,
                    ShipmentStatus: true,
                },
            });
        });
    }
    async validateTransferItemQuantities(tx, items, fromLocationId) {
        if (items.length === 0) {
            throw new common_1.BadRequestException('At least one item is required');
        }
        const stockIds = Array.from(new Set(items.map((item) => item.stockId)));
        const stocks = await tx.stock.findMany({
            where: { id: { in: stockIds }, isEnabled: true },
            select: { id: true, remainingUnits: true, locationId: true },
        });
        if (stocks.length !== stockIds.length) {
            throw new common_1.NotFoundException('One or more stock records were not found');
        }
        for (const stock of stocks) {
            if (stock.locationId !== fromLocationId) {
                throw new common_1.BadRequestException(`Stock ${stock.id} does not belong to the source location`);
            }
        }
        const existingTransferItems = await tx.shipmentItem.findMany({
            where: {
                isEnabled: true,
                stockId: { in: stockIds },
                shipment: {
                    isShipmentCompleted: false,
                    isEnabled: true,
                    type: 'TRANSFER',
                },
            },
            select: { stockId: true, quantity: true },
        });
        const alreadyAllocatedByStock = new Map();
        for (const existing of existingTransferItems) {
            if (!existing.stockId)
                continue;
            alreadyAllocatedByStock.set(existing.stockId, (alreadyAllocatedByStock.get(existing.stockId) ?? 0) +
                existing.quantity);
        }
        const requestedByStock = new Map();
        for (const item of items) {
            if (!item.quantity || item.quantity <= 0) {
                throw new common_1.BadRequestException('Transfer item quantity must be greater than 0');
            }
            requestedByStock.set(item.stockId, (requestedByStock.get(item.stockId) ?? 0) + item.quantity);
        }
        const stockMap = new Map(stocks.map((s) => [s.id, s]));
        for (const [stockId, requestedQuantity] of requestedByStock) {
            const stock = stockMap.get(stockId);
            if (!stock) {
                throw new common_1.NotFoundException(`Stock ${stockId} was not found`);
            }
            const available = stock.remainingUnits - (alreadyAllocatedByStock.get(stockId) ?? 0);
            if (requestedQuantity > available) {
                throw new common_1.BadRequestException(`Transfer quantity for stock ${stockId} exceeds available units`);
            }
        }
    }
    async validateShipmentItemQuantities(tx, items) {
        if (items.length === 0) {
            throw new common_1.BadRequestException('At least one shipment item is required');
        }
        const fulfillmentIds = Array.from(new Set(items.map((item) => item.orderItemFulfillmentId)));
        const fulfillments = await tx.orderItemFulfillment.findMany({
            where: { id: { in: fulfillmentIds }, isEnabled: true },
            select: { id: true, fulfilledQuantity: true, shippedQuantity: true },
        });
        if (fulfillments.length !== fulfillmentIds.length) {
            throw new common_1.NotFoundException('One or more order item fulfillment records were not found');
        }
        const existingShipmentItems = await tx.shipmentItem.findMany({
            where: {
                isEnabled: true,
                orderItemFulfillmentId: { in: fulfillmentIds },
                shipment: { isShipmentCompleted: false, isEnabled: true },
            },
            select: { orderItemFulfillmentId: true, quantity: true },
        });
        const requestedByFulfillment = new Map();
        const alreadyAllocatedByFulfillment = new Map();
        for (const item of items) {
            if (!item.quantity || item.quantity <= 0) {
                throw new common_1.BadRequestException('Shipment item quantity must be greater than 0');
            }
            requestedByFulfillment.set(item.orderItemFulfillmentId, (requestedByFulfillment.get(item.orderItemFulfillmentId) ?? 0) +
                item.quantity);
        }
        for (const existing of existingShipmentItems) {
            if (!existing.orderItemFulfillmentId)
                continue;
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
    async bulkAdvance(ids, userId) {
        const results = [];
        for (const id of ids) {
            try {
                const shipment = await this.prisma.shipment.findUnique({
                    where: { id },
                    include: { shipmentItems: { where: { isEnabled: true } } },
                });
                if (!shipment) {
                    results.push({ id, status: 'error', error: 'Shipment not found' });
                    continue;
                }
                if (!shipment.isShipmentLoaded) {
                    await this.load(id, userId);
                    results.push({ id, status: 'loaded' });
                }
                else if (!shipment.isShipmentStarted) {
                    await this.start(id, userId);
                    results.push({ id, status: 'started' });
                }
                else if (!shipment.isShipmentArrived) {
                    await this.markAsArrived(id, userId);
                    results.push({ id, status: 'arrived' });
                }
                else if (!shipment.isShipmentCompleted) {
                    await this.markAsCompleted(id, userId);
                    results.push({ id, status: 'completed' });
                }
                else {
                    results.push({
                        id,
                        status: 'error',
                        error: 'Shipment is already completed',
                    });
                }
            }
            catch (e) {
                results.push({ id, status: 'error', error: e.message });
            }
        }
        return results;
    }
    findAll() {
        return this.prisma.shipment.findMany({
            include: {
                carrier: true,
                fromLocation: true,
                toLocation: true,
                ShipmentStatus: true,
                shipmentItems: true,
            },
        });
    }
    filter(query) {
        if (typeof query.ids === 'string') {
            query.ids = [query.ids];
        }
        const statusConditions = [];
        if (query.statuses && Array.isArray(query.statuses)) {
            const statusOr = [];
            for (const s of query.statuses) {
                if (s === 'pending')
                    statusOr.push({ isShipmentLoaded: false });
                else if (s === 'loaded')
                    statusOr.push({
                        isShipmentLoaded: true,
                        isShipmentStarted: false,
                    });
                else if (s === 'started')
                    statusOr.push({
                        isShipmentStarted: true,
                        isShipmentArrived: false,
                    });
                else if (s === 'arrived')
                    statusOr.push({
                        isShipmentArrived: true,
                        isShipmentCompleted: false,
                    });
                else if (s === 'completed')
                    statusOr.push({ isShipmentCompleted: true });
            }
            if (statusOr.length > 0) {
                statusConditions.push({ OR: statusOr });
            }
        }
        return this.prisma.shipment.findMany({
            where: {
                AND: [
                    ...statusConditions,
                    query.types ? { type: { in: query.types } } : {},
                    query.carrierIds ? { carrierId: { in: query.carrierIds } } : {},
                    query.fromLocationIds
                        ? { fromLocationId: { in: query.fromLocationIds } }
                        : {},
                    query.toLocationIds
                        ? { toLocationId: { in: query.toLocationIds } }
                        : {},
                    query.shipmentNumber
                        ? { shipmentNumber: { contains: query.shipmentNumber } }
                        : {},
                    query.shipmentScheduledDateStartDate
                        ? { shipmentScheduledDate: { gte: query.shipmentStartDate } }
                        : {},
                    query.shipmentScheduledDateEndDate
                        ? { shipmentScheduledDate: { lte: query.shipmentEndDate } }
                        : {},
                    query.expectedArrivalStartDate
                        ? { expectedArrivalDate: { gte: query.expectedArrivalStartDate } }
                        : {},
                    query.expectedArrivalEndDate
                        ? { expectedArrivalDate: { lte: query.expectedArrivalEndDate } }
                        : {},
                    query.actualArrivalStartDate
                        ? { actualArrivalDate: { gte: query.actualArrivalStartDate } }
                        : {},
                    query.actualArrivalEndDate
                        ? { actualArrivalDate: { lte: query.actualArrivalEndDate } }
                        : {},
                    query.shipmentStartedByIds
                        ? { shipmentStartedById: { in: query.shipmentStartedByIds } }
                        : {},
                    query.arrivalConfirmedByIds
                        ? {
                            arrivalConfirmedById: {
                                in: query.arrivalConfirmedByIds,
                            },
                        }
                        : {},
                    query.shipmentStartDateStartDate
                        ? { shipmentStartDate: { gte: query.shipmentStartDateStartDate } }
                        : {},
                    query.shipmentStartDateEndDate
                        ? { shipmentStartDate: { lte: query.shipmentStartDateEndDate } }
                        : {},
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
                carrier: true,
                fromLocation: true,
                toLocation: true,
                ShipmentStatus: true,
                shipmentItems: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.shipment.findUnique({
            where: { id },
            include: {
                carrier: { include: { carrierType: true } },
                fromLocation: true,
                toLocation: true,
                ShipmentStatus: true,
                shipmentItems: true,
                shipmentStartedBy: { select: { id: true, name: true } },
                shipmentLoadedBy: { select: { id: true, name: true } },
                arrivalConfirmedBy: { select: { id: true, name: true } },
                shipmentCompletedBy: { select: { id: true, name: true } },
                enabledBy: { select: { id: true, name: true } },
            },
        });
    }
    update(id, updateShipmentDto) {
        return this.prisma.shipment.update({
            where: { id },
            data: updateShipmentDto,
        });
    }
    async load(id, loadedById) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id },
            include: { shipmentItems: { where: { isEnabled: true } } },
        });
        if (!shipment) {
            throw new common_1.NotFoundException('Shipment not found');
        }
        if (shipment.isShipmentLoaded) {
            throw new common_1.BadRequestException('Shipment is already loaded');
        }
        if (shipment.shipmentItems.length === 0) {
            throw new common_1.BadRequestException('Shipment must have at least one item before loading');
        }
        return this.prisma.shipment.update({
            where: { id },
            data: {
                isShipmentLoaded: true,
                shipmentLoadedById: loadedById,
                shipmentLoadedDate: new Date(),
            },
        });
    }
    async start(id, startedById) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id },
        });
        if (!shipment) {
            throw new common_1.NotFoundException('Shipment not found');
        }
        if (!shipment.isShipmentLoaded) {
            throw new common_1.BadRequestException('Shipment must be loaded before it can be started');
        }
        if (shipment.isShipmentStarted) {
            throw new common_1.BadRequestException('Shipment is already started');
        }
        return this.prisma.shipment.update({
            where: { id },
            data: {
                isShipmentStarted: true,
                shipmentStartedById: startedById,
                shipmentStartDate: new Date(),
            },
        });
    }
    async markAsArrived(id, arrivedById) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id },
        });
        if (!shipment) {
            throw new common_1.NotFoundException('Shipment not found');
        }
        if (!shipment.isShipmentStarted) {
            throw new common_1.BadRequestException('Shipment must be started before it can be marked as arrived');
        }
        if (shipment.isShipmentArrived) {
            throw new common_1.BadRequestException('Shipment is already marked as arrived');
        }
        return this.prisma.shipment.update({
            where: { id },
            data: {
                isShipmentArrived: true,
                arrivalConfirmedById: arrivedById,
                actualArrivalDate: new Date(),
            },
        });
    }
    markAsCompleted(id, completedById) {
        return this.prisma.$transaction(async (tx) => {
            const shipment = await tx.shipment.findUnique({
                where: { id },
                include: {
                    shipmentItems: {
                        where: {
                            isEnabled: true,
                        },
                        select: {
                            id: true,
                            quantity: true,
                            orderItemFulfillmentId: true,
                            stockId: true,
                        },
                    },
                },
            });
            if (!shipment) {
                throw new common_1.NotFoundException('Shipment not found');
            }
            if (!shipment.isShipmentArrived) {
                throw new common_1.BadRequestException('Shipment must be marked as arrived before completion');
            }
            if (shipment.type === 'TRANSFER') {
                await this.completeTransfer(tx, shipment, completedById);
            }
            else {
                await this.completeOrderShipment(tx, shipment);
            }
            return tx.shipment.update({
                where: { id },
                data: {
                    isShipmentCompleted: true,
                    shipmentCompletedById: completedById,
                    shipmentCompletedDate: new Date(),
                },
            });
        });
    }
    async completeTransfer(tx, shipment, completedById) {
        if (!shipment.toLocationId) {
            throw new common_1.BadRequestException('Transfer shipment must have a destination location');
        }
        const stockItems = shipment.shipmentItems.filter((item) => item.stockId);
        for (const item of stockItems) {
            const sourceStock = await tx.stock.findUnique({
                where: { id: item.stockId },
            });
            if (!sourceStock) {
                throw new common_1.NotFoundException(`Source stock ${item.stockId} was not found`);
            }
            if (sourceStock.remainingUnits < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for transfer: stock ${item.stockId} has ${sourceStock.remainingUnits} units but ${item.quantity} requested`);
            }
            await tx.stock.update({
                where: { id: item.stockId },
                data: {
                    remainingUnits: sourceStock.remainingUnits - item.quantity,
                },
            });
            const newStock = await tx.stock.create({
                data: {
                    productVariantId: sourceStock.productVariantId,
                    supplierId: sourceStock.supplierId,
                    locationId: shipment.toLocationId,
                    batchId: sourceStock.batchId,
                    totalPurchasedUnits: item.quantity,
                    remainingUnits: item.quantity,
                    manufacturedDate: sourceStock.manufacturedDate,
                    expirationDate: sourceStock.expirationDate,
                    referenceNumber: sourceStock.referenceNumber,
                    receiptNumber: sourceStock.receiptNumber,
                    stockSourceId: sourceStock.stockSourceId,
                    enabledById: completedById,
                    transportationFree: sourceStock.transportationFree,
                    taxFee: sourceStock.taxFee,
                    miscellaneousFee: sourceStock.miscellaneousFee,
                    purchasePrice: sourceStock.purchasePrice,
                    expectedRetailPrice: sourceStock.expectedRetailPrice,
                },
            });
            await tx.stockTransactionItem.create({
                data: {
                    stockId: newStock.id,
                    quantity: item.quantity,
                    enabledById: completedById,
                },
            });
        }
    }
    async completeOrderShipment(tx, shipment) {
        const shipmentItems = shipment.shipmentItems.filter((item) => item.orderItemFulfillmentId);
        const requestedByFulfillment = new Map();
        for (const item of shipmentItems) {
            const fulfillmentId = item.orderItemFulfillmentId;
            requestedByFulfillment.set(fulfillmentId, (requestedByFulfillment.get(fulfillmentId) ?? 0) + item.quantity);
        }
        const fulfillmentIds = Array.from(requestedByFulfillment.keys());
        const fulfillments = fulfillmentIds.length
            ? await tx.orderItemFulfillment.findMany({
                where: { id: { in: fulfillmentIds } },
                select: {
                    id: true,
                    fulfilledQuantity: true,
                    shippedQuantity: true,
                    orderItemId: true,
                },
            })
            : [];
        if (fulfillments.length !== fulfillmentIds.length) {
            throw new common_1.NotFoundException('One or more shipment fulfillment records were not found');
        }
        const fulfillmentMap = new Map(fulfillments.map((fulfillment) => [fulfillment.id, fulfillment]));
        const requestedByOrderItem = new Map();
        for (const [fulfillmentId, requestedQuantity] of requestedByFulfillment) {
            const fulfillment = fulfillmentMap.get(fulfillmentId);
            if (!fulfillment) {
                throw new common_1.NotFoundException(`Order fulfillment ${fulfillmentId} was not found`);
            }
            if (fulfillment.shippedQuantity + requestedQuantity >
                fulfillment.fulfilledQuantity) {
                throw new common_1.BadRequestException('Shipment quantity cannot exceed fulfilled quantity');
            }
            requestedByOrderItem.set(fulfillment.orderItemId, (requestedByOrderItem.get(fulfillment.orderItemId) ?? 0) +
                requestedQuantity);
        }
        for (const [fulfillmentId, requestedQuantity] of requestedByFulfillment) {
            const fulfillment = fulfillmentMap.get(fulfillmentId);
            await tx.orderItemFulfillment.update({
                where: { id: fulfillmentId },
                data: {
                    shippedQuantity: fulfillment.shippedQuantity + requestedQuantity,
                },
            });
        }
        const orderItemIds = Array.from(requestedByOrderItem.keys());
        const orderItems = orderItemIds.length
            ? await tx.orderItem.findMany({
                where: { id: { in: orderItemIds } },
                select: {
                    id: true,
                    orderId: true,
                    purchasedQuantity: true,
                    fulfilledQuantity: true,
                    shippedQuantity: true,
                },
            })
            : [];
        if (orderItems.length !== orderItemIds.length) {
            throw new common_1.NotFoundException('One or more order items were not found');
        }
        const orderItemMap = new Map(orderItems.map((item) => [item.id, item]));
        const affectedOrderIds = new Set();
        for (const [orderItemId, requestedQuantity] of requestedByOrderItem) {
            const orderItem = orderItemMap.get(orderItemId);
            if (!orderItem) {
                throw new common_1.NotFoundException(`Order item ${orderItemId} was not found`);
            }
            const nextShippedQuantity = orderItem.shippedQuantity + requestedQuantity;
            if (nextShippedQuantity > orderItem.fulfilledQuantity) {
                throw new common_1.BadRequestException('Order item shipped quantity cannot exceed fulfilled quantity');
            }
            affectedOrderIds.add(orderItem.orderId);
            await tx.orderItem.update({
                where: { id: orderItemId },
                data: {
                    shippedQuantity: nextShippedQuantity,
                    isPartiallyShipped: nextShippedQuantity > 0,
                    isFullyShipped: nextShippedQuantity >= orderItem.purchasedQuantity,
                },
            });
        }
        for (const orderId of affectedOrderIds) {
            const refreshedOrderItems = await tx.orderItem.findMany({
                where: { orderId },
                select: {
                    isPartiallyShipped: true,
                    isFullyShipped: true,
                },
            });
            const isFullyShipped = refreshedOrderItems.length > 0 &&
                refreshedOrderItems.every((item) => item.isFullyShipped);
            const isPartiallyShipped = refreshedOrderItems.some((item) => item.isPartiallyShipped);
            await tx.order.update({
                where: { id: orderId },
                data: {
                    isPartiallyShipped,
                    isFullyShipped,
                    status: isFullyShipped ? 'SHIPPED' : 'PARTIALLY_SHIPPED',
                },
            });
        }
    }
    enable(id) {
        return this.prisma.shipment.update({
            where: { id },
            data: { isEnabled: true },
        });
    }
    disable(id, disabledById) {
        return this.prisma.shipment.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledById: disabledById,
                disabledDate: new Date(),
            },
        });
    }
    remove(id) {
        return this.prisma.shipment.update({
            where: { id },
            data: {
                isEnabled: false,
                disabledDate: new Date(),
            },
        });
    }
};
exports.ShipmentService = ShipmentService;
exports.ShipmentService = ShipmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShipmentService);
//# sourceMappingURL=shipment.service.js.map