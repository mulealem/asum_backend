"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const seed_admin_1 = require("./seed-admin");
const prisma = new client_1.PrismaClient();
const SALES_PERMISSIONS = JSON.stringify([
    'canViewDashboard',
    'canViewOrders',
    'canViewOrderDetail',
    'canApproveOrder',
    'canFulfillOrder',
    'canViewOrderPayment',
    'canAddOrderPayment',
    'canViewOrderShipment',
    'canAddOrderShipment',
    'canScheduleOrderShipment',
    'canStartOrderShipment',
    'canReceiveOrderShipment',
    'canAddShipmentDiscrepancy',
    'canCompleteShipment',
    'canViewPayment',
    'canAddPayment',
    'canViewShipment',
    'canViewInventory',
    'canViewInventoryDetail',
    'canViewProduct',
    'canViewProductVariant',
    'canViewReports',
    'canViewPurchaseRequests',
    'canViewPurchaseRequestDetail',
    'canCreatePurchaseRequest',
    'canApprovePurchaseRequest',
    'canReceivePurchaseRequest',
]);
async function ensureRecord(delegate, where, data, label) {
    const existing = await delegate.findFirst({ where });
    if (existing) {
        const updated = await delegate.update({
            where: { id: existing.id },
            data,
        });
        console.log(`Updated ${label}`);
        return updated;
    }
    const created = await delegate.create({ data });
    console.log(`Created ${label}`);
    return created;
}
async function ensureUserRole(userId, roleId, enabledById) {
    const existing = await prisma.userRole.findFirst({
        where: {
            userId,
            roleId,
        },
    });
    if (existing) {
        return prisma.userRole.update({
            where: { id: existing.id },
            data: {
                isEnabled: true,
                enabledById,
            },
        });
    }
    return prisma.userRole.create({
        data: {
            userId,
            roleId,
            isEnabled: true,
            enabledById,
        },
    });
}
async function ensureUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return ensureRecord(prisma.user, { email: data.email }, {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: hashedPassword,
        isEnabled: true,
        enabledById: data.enabledById,
    }, `user ${data.email}`);
}
async function seedConfiguration() {
    const { adminUser } = await (0, seed_admin_1.seedAdmin)(prisma);
    const enabledById = adminUser.id;
    const salesRole = await ensureRecord(prisma.role, { title: 'Sales' }, {
        title: 'Sales',
        permissions: SALES_PERMISSIONS,
        isEnabled: true,
        enabledById,
    }, 'role Sales');
    const salesUser = await ensureUser({
        email: process.env.DEMO_SALES_EMAIL || 'sales@example.com',
        name: process.env.DEMO_SALES_NAME || 'Sales Demo User',
        password: process.env.DEMO_SALES_PASSWORD || 'Sales@123456',
        phoneNumber: '0911001100',
        enabledById,
    });
    await ensureUserRole(salesUser.id, salesRole.id, enabledById);
    await ensureRecord(prisma.paymentOption, { title: 'Cash' }, {
        title: 'Cash',
        abbreviation: 'CASH',
        description: 'Immediate cash payment',
        isEnabled: true,
        enabledById,
    }, 'payment option Cash');
    await ensureRecord(prisma.paymentOption, { title: 'Bank Transfer' }, {
        title: 'Bank Transfer',
        abbreviation: 'BANK',
        description: 'Bank transfer payment option',
        isEnabled: true,
        enabledById,
    }, 'payment option Bank Transfer');
    await ensureRecord(prisma.paymentOption, { title: 'Mobile Money' }, {
        title: 'Mobile Money',
        abbreviation: 'MOMO',
        description: 'Mobile wallet payment option',
        isEnabled: true,
        enabledById,
    }, 'payment option Mobile Money');
    const cbeBank = await ensureRecord(prisma.bank, { title: 'Commercial Bank of Ethiopia' }, {
        title: 'Commercial Bank of Ethiopia',
        abbreviation: 'CBE',
        description: 'Primary banking partner',
        isEnabled: true,
        enabledById,
    }, 'bank Commercial Bank of Ethiopia');
    const dashenBank = await ensureRecord(prisma.bank, { title: 'Dashen Bank' }, {
        title: 'Dashen Bank',
        abbreviation: 'DB',
        description: 'Secondary banking partner',
        isEnabled: true,
        enabledById,
    }, 'bank Dashen Bank');
    await ensureRecord(prisma.bankAccount, { accountNumber: '100000000001' }, {
        bankId: cbeBank.id,
        accountNumber: '100000000001',
        accountName: 'Inventory Demo Main Account',
        isEnabled: true,
        enabledById,
    }, 'bank account CBE main');
    await ensureRecord(prisma.bankAccount, { accountNumber: '200000000002' }, {
        bankId: dashenBank.id,
        accountNumber: '200000000002',
        accountName: 'Inventory Demo Reserve Account',
        isEnabled: true,
        enabledById,
    }, 'bank account Dashen reserve');
    await ensureRecord(prisma.brand, { title: 'Dell' }, {
        title: 'Dell',
        abbreviation: 'DELL',
        description: 'Laptop brand',
        isEnabled: true,
        enabledById,
    }, 'brand Dell');
    await ensureRecord(prisma.brand, { title: 'Samsung' }, {
        title: 'Samsung',
        abbreviation: 'SMSG',
        description: 'Phone brand',
        isEnabled: true,
        enabledById,
    }, 'brand Samsung');
    await ensureRecord(prisma.brand, { title: 'Apple' }, {
        title: 'Apple',
        abbreviation: 'AAPL',
        description: 'Tablet brand',
        isEnabled: true,
        enabledById,
    }, 'brand Apple');
    await ensureRecord(prisma.location, { title: 'Main Warehouse' }, {
        title: 'Main Warehouse',
        abbreviation: 'MWH',
        description: 'Primary fulfillment warehouse',
        isEnabled: true,
        enabledById,
    }, 'location Main Warehouse');
    await ensureRecord(prisma.typeOfProduct, { title: 'Electronics' }, {
        title: 'Electronics',
        abbreviation: 'ELEC',
        description: 'Electronic devices and accessories',
        isEnabled: true,
        enabledById,
    }, 'type of product Electronics');
    await ensureRecord(prisma.supplier, { title: 'Addis Tech Distributors' }, {
        title: 'Addis Tech Distributors',
        abbreviation: 'ATD',
        description: 'Primary demo supplier',
        isEnabled: true,
        enabledById,
    }, 'supplier Addis Tech Distributors');
    await ensureRecord(prisma.stockSource, { title: 'Supplier Purchase' }, {
        title: 'Supplier Purchase',
        abbreviation: 'PUR',
        description: 'Purchased from supplier',
        isEnabled: true,
        enabledById,
    }, 'stock source Supplier Purchase');
    await ensureRecord(prisma.shipmentStatusOption, { title: 'Scheduled' }, {
        title: 'Scheduled',
        abbreviation: 'SCH',
        description: 'Shipment has been scheduled',
        isEnabled: true,
        enabledById,
    }, 'shipment status Scheduled');
    await ensureRecord(prisma.shipmentStatusOption, { title: 'In Transit' }, {
        title: 'In Transit',
        abbreviation: 'TRN',
        description: 'Shipment is on the way',
        isEnabled: true,
        enabledById,
    }, 'shipment status In Transit');
    await ensureRecord(prisma.shipmentStatusOption, { title: 'Delivered' }, {
        title: 'Delivered',
        abbreviation: 'DLV',
        description: 'Shipment reached destination',
        isEnabled: true,
        enabledById,
    }, 'shipment status Delivered');
    await ensureRecord(prisma.shipmentItemStatusOption, { title: 'Packed' }, {
        title: 'Packed',
        abbreviation: 'PCK',
        description: 'Shipment item packed and ready',
        isEnabled: true,
        enabledById,
    }, 'shipment item status Packed');
    await ensureRecord(prisma.shipmentItemStatusOption, { title: 'Delivered' }, {
        title: 'Delivered',
        abbreviation: 'DLV',
        description: 'Shipment item delivered',
        isEnabled: true,
        enabledById,
    }, 'shipment item status Delivered');
    const truckCarrierType = await ensureRecord(prisma.carrierType, { title: 'Truck' }, {
        title: 'Truck',
        abbreviation: 'TRK',
        description: 'Road freight carrier',
        isEnabled: true,
        enabledById,
    }, 'carrier type Truck');
    await ensureRecord(prisma.carrier, { title: 'Ethio Rapid Logistics' }, {
        title: 'Ethio Rapid Logistics',
        identifier: 'ERL-001',
        description: 'Demo fulfillment carrier',
        carrierTypeId: truckCarrierType.id,
        isEnabled: true,
        enabledById,
    }, 'carrier Ethio Rapid Logistics');
    console.log('Configuration seed completed successfully.');
}
seedConfiguration()
    .catch((error) => {
    console.error('Configuration seeding failed:', error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-config.js.map