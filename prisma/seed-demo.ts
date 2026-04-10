import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { seedAdmin } from './seed-admin';

const prisma = new PrismaClient();

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
]);

async function ensureRecord(
  delegate: any,
  where: Record<string, unknown>,
  data: Record<string, unknown>,
  label: string,
) {
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

async function ensureUserRole(
  userId: string,
  roleId: string,
  enabledById: string,
) {
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

async function ensureUser(data: {
  email: string;
  name: string;
  password: string;
  phoneNumber?: string;
  enabledById: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return ensureRecord(
    prisma.user,
    { email: data.email },
    {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
      isEnabled: true,
      enabledById: data.enabledById,
    },
    `user ${data.email}`,
  );
}

async function seedDemo() {
  const { adminUser } = await seedAdmin(prisma);
  const enabledById = adminUser.id;

  const salesRole = await ensureRecord(
    prisma.role,
    { title: 'Sales' },
    {
      title: 'Sales',
      permissions: SALES_PERMISSIONS,
      isEnabled: true,
      enabledById,
    },
    'role Sales',
  );

  const salesUser = await ensureUser({
    email: process.env.DEMO_SALES_EMAIL || 'sales@example.com',
    name: process.env.DEMO_SALES_NAME || 'Sales Demo User',
    password: process.env.DEMO_SALES_PASSWORD || 'Sales@123456',
    phoneNumber: '0911001100',
    enabledById,
  });

  await ensureUserRole(salesUser.id, salesRole.id, enabledById);

  const cash = await ensureRecord(
    prisma.paymentOption,
    { title: 'Cash' },
    {
      title: 'Cash',
      abbreviation: 'CASH',
      description: 'Immediate cash payment',
      isEnabled: true,
      enabledById,
    },
    'payment option Cash',
  );

  const bankTransfer = await ensureRecord(
    prisma.paymentOption,
    { title: 'Bank Transfer' },
    {
      title: 'Bank Transfer',
      abbreviation: 'BANK',
      description: 'Bank transfer payment option',
      isEnabled: true,
      enabledById,
    },
    'payment option Bank Transfer',
  );

  await ensureRecord(
    prisma.paymentOption,
    { title: 'Mobile Money' },
    {
      title: 'Mobile Money',
      abbreviation: 'MOMO',
      description: 'Mobile wallet payment option',
      isEnabled: true,
      enabledById,
    },
    'payment option Mobile Money',
  );

  const cbeBank = await ensureRecord(
    prisma.bank,
    { title: 'Commercial Bank of Ethiopia' },
    {
      title: 'Commercial Bank of Ethiopia',
      abbreviation: 'CBE',
      description: 'Primary banking partner',
      isEnabled: true,
      enabledById,
    },
    'bank Commercial Bank of Ethiopia',
  );

  const dashenBank = await ensureRecord(
    prisma.bank,
    { title: 'Dashen Bank' },
    {
      title: 'Dashen Bank',
      abbreviation: 'DB',
      description: 'Secondary banking partner',
      isEnabled: true,
      enabledById,
    },
    'bank Dashen Bank',
  );

  const cbeAccount = await ensureRecord(
    prisma.bankAccount,
    { accountNumber: '100000000001' },
    {
      bankId: cbeBank.id,
      accountNumber: '100000000001',
      accountName: 'Inventory Demo Main Account',
      isEnabled: true,
      enabledById,
    },
    'bank account CBE main',
  );

  await ensureRecord(
    prisma.bankAccount,
    { accountNumber: '200000000002' },
    {
      bankId: dashenBank.id,
      accountNumber: '200000000002',
      accountName: 'Inventory Demo Reserve Account',
      isEnabled: true,
      enabledById,
    },
    'bank account Dashen reserve',
  );

  const dell = await ensureRecord(
    prisma.brand,
    { title: 'Dell' },
    {
      title: 'Dell',
      abbreviation: 'DELL',
      description: 'Laptop brand',
      isEnabled: true,
      enabledById,
    },
    'brand Dell',
  );

  const samsung = await ensureRecord(
    prisma.brand,
    { title: 'Samsung' },
    {
      title: 'Samsung',
      abbreviation: 'SMSG',
      description: 'Phone brand',
      isEnabled: true,
      enabledById,
    },
    'brand Samsung',
  );

  const apple = await ensureRecord(
    prisma.brand,
    { title: 'Apple' },
    {
      title: 'Apple',
      abbreviation: 'AAPL',
      description: 'Tablet brand',
      isEnabled: true,
      enabledById,
    },
    'brand Apple',
  );

  const mainWarehouse = await ensureRecord(
    prisma.location,
    { title: 'Main Warehouse' },
    {
      title: 'Main Warehouse',
      abbreviation: 'MWH',
      description: 'Primary fulfillment warehouse',
      isEnabled: true,
      enabledById,
    },
    'location Main Warehouse',
  );

  const electronics = await ensureRecord(
    prisma.typeOfProduct,
    { title: 'Electronics' },
    {
      title: 'Electronics',
      abbreviation: 'ELEC',
      description: 'Electronic devices and accessories',
      isEnabled: true,
      enabledById,
    },
    'type of product Electronics',
  );

  const wholesaler = await ensureRecord(
    prisma.supplier,
    { title: 'Addis Tech Distributors' },
    {
      title: 'Addis Tech Distributors',
      abbreviation: 'ATD',
      description: 'Primary demo supplier',
      isEnabled: true,
      enabledById,
    },
    'supplier Addis Tech Distributors',
  );

  const purchaseSource = await ensureRecord(
    prisma.stockSource,
    { title: 'Supplier Purchase' },
    {
      title: 'Supplier Purchase',
      abbreviation: 'PUR',
      description: 'Purchased from supplier',
      isEnabled: true,
      enabledById,
    },
    'stock source Supplier Purchase',
  );

  const scheduledStatus = await ensureRecord(
    prisma.shipmentStatusOption,
    { title: 'Scheduled' },
    {
      title: 'Scheduled',
      abbreviation: 'SCH',
      description: 'Shipment has been scheduled',
      isEnabled: true,
      enabledById,
    },
    'shipment status Scheduled',
  );

  const inTransitStatus = await ensureRecord(
    prisma.shipmentStatusOption,
    { title: 'In Transit' },
    {
      title: 'In Transit',
      abbreviation: 'TRN',
      description: 'Shipment is on the way',
      isEnabled: true,
      enabledById,
    },
    'shipment status In Transit',
  );

  const deliveredStatus = await ensureRecord(
    prisma.shipmentStatusOption,
    { title: 'Delivered' },
    {
      title: 'Delivered',
      abbreviation: 'DLV',
      description: 'Shipment reached destination',
      isEnabled: true,
      enabledById,
    },
    'shipment status Delivered',
  );

  const packedItemStatus = await ensureRecord(
    prisma.shipmentItemStatusOption,
    { title: 'Packed' },
    {
      title: 'Packed',
      abbreviation: 'PCK',
      description: 'Shipment item packed and ready',
      isEnabled: true,
      enabledById,
    },
    'shipment item status Packed',
  );

  const deliveredItemStatus = await ensureRecord(
    prisma.shipmentItemStatusOption,
    { title: 'Delivered' },
    {
      title: 'Delivered',
      abbreviation: 'DLV',
      description: 'Shipment item delivered',
      isEnabled: true,
      enabledById,
    },
    'shipment item status Delivered',
  );

  const truckCarrierType = await ensureRecord(
    prisma.carrierType,
    { title: 'Truck' },
    {
      title: 'Truck',
      abbreviation: 'TRK',
      description: 'Road freight carrier',
      isEnabled: true,
      enabledById,
    },
    'carrier type Truck',
  );

  const carrier = await ensureRecord(
    prisma.carrier,
    { title: 'Ethio Rapid Logistics' },
    {
      title: 'Ethio Rapid Logistics',
      identifier: 'ERL-001',
      description: 'Demo fulfillment carrier',
      carrierTypeId: truckCarrierType.id,
      isEnabled: true,
      enabledById,
    },
    'carrier Ethio Rapid Logistics',
  );

  const customerOne = await ensureRecord(
    prisma.customer,
    { phoneNumber: '0911223344' },
    {
      name: 'General Trading PLC',
      phoneNumber: '0911223344',
      tin: '1002003001',
      address: 'Bole, Addis Ababa',
      isEnabled: true,
      enabledById,
    },
    'customer General Trading PLC',
  );

  const customerTwo = await ensureRecord(
    prisma.customer,
    { phoneNumber: '0911556677' },
    {
      name: 'Blue Nile Retail',
      phoneNumber: '0911556677',
      tin: '1002003002',
      address: 'Piassa, Addis Ababa',
      isEnabled: true,
      enabledById,
    },
    'customer Blue Nile Retail',
  );

  const laptopProduct = await ensureRecord(
    prisma.product,
    { title: 'Laptop' },
    {
      typeOfProductId: electronics.id,
      title: 'Laptop',
      abbreviation: 'LTP',
      description: 'Business laptops for demo sales',
      isEnabled: true,
      enabledById,
    },
    'product Laptop',
  );

  const phoneProduct = await ensureRecord(
    prisma.product,
    { title: 'Smartphone' },
    {
      typeOfProductId: electronics.id,
      title: 'Smartphone',
      abbreviation: 'PHN',
      description: 'Smartphones for retail demo',
      isEnabled: true,
      enabledById,
    },
    'product Smartphone',
  );

  const tabletProduct = await ensureRecord(
    prisma.product,
    { title: 'Tablet' },
    {
      typeOfProductId: electronics.id,
      title: 'Tablet',
      abbreviation: 'TAB',
      description: 'Tablets for field sales demo',
      isEnabled: true,
      enabledById,
    },
    'product Tablet',
  );

  const monitorProduct = await ensureRecord(
    prisma.product,
    { title: 'Monitor' },
    {
      typeOfProductId: electronics.id,
      title: 'Monitor',
      abbreviation: 'MTR',
      description: 'Monitors for workstation demo setups',
      isEnabled: true,
      enabledById,
    },
    'product Monitor',
  );

  const smartwatchProduct = await ensureRecord(
    prisma.product,
    { title: 'Smartwatch' },
    {
      typeOfProductId: electronics.id,
      title: 'Smartwatch',
      abbreviation: 'SWT',
      description: 'Wearable devices for demo sales',
      isEnabled: true,
      enabledById,
    },
    'product Smartwatch',
  );

  const laptopVariant = await ensureRecord(
    prisma.productVariant,
    { code: 'DELL-LAT-5440-16-512' },
    {
      productId: laptopProduct.id,
      brandId: dell.id,
      code: 'DELL-LAT-5440-16-512',
      isEnabled: true,
      enabledById,
    },
    'variant Dell Latitude 5440',
  );

  const phoneVariant = await ensureRecord(
    prisma.productVariant,
    { code: 'SMSG-A54-8-128-BLK' },
    {
      productId: phoneProduct.id,
      brandId: samsung.id,
      code: 'SMSG-A54-8-128-BLK',
      isEnabled: true,
      enabledById,
    },
    'variant Samsung A54',
  );

  const tabletVariant = await ensureRecord(
    prisma.productVariant,
    { code: 'APPL-IPAD10-64-SLV' },
    {
      productId: tabletProduct.id,
      brandId: apple.id,
      code: 'APPL-IPAD10-64-SLV',
      isEnabled: true,
      enabledById,
    },
    'variant iPad 10th Gen',
  );

  const monitorVariant = await ensureRecord(
    prisma.productVariant,
    { code: 'DELL-P2723DE-27-QHD' },
    {
      productId: monitorProduct.id,
      brandId: dell.id,
      code: 'DELL-P2723DE-27-QHD',
      isEnabled: true,
      enabledById,
    },
    'variant Dell 27 Monitor',
  );

  const smartwatchVariant = await ensureRecord(
    prisma.productVariant,
    { code: 'SMSG-GW6-44-BLK' },
    {
      productId: smartwatchProduct.id,
      brandId: samsung.id,
      code: 'SMSG-GW6-44-BLK',
      isEnabled: true,
      enabledById,
    },
    'variant Samsung Galaxy Watch',
  );

  await ensureRecord(
    prisma.productVariantAttribute,
    { productVariantId: laptopVariant.id, key: 'RAM' },
    {
      productVariantId: laptopVariant.id,
      key: 'RAM',
      value: '16GB',
      isEnabled: true,
      enabledById,
    },
    'attribute Dell Latitude RAM',
  );

  await ensureRecord(
    prisma.productVariantAttribute,
    { productVariantId: laptopVariant.id, key: 'Storage' },
    {
      productVariantId: laptopVariant.id,
      key: 'Storage',
      value: '512GB SSD',
      isEnabled: true,
      enabledById,
    },
    'attribute Dell Latitude Storage',
  );

  await ensureRecord(
    prisma.productVariantAttribute,
    { productVariantId: phoneVariant.id, key: 'Color' },
    {
      productVariantId: phoneVariant.id,
      key: 'Color',
      value: 'Black',
      isEnabled: true,
      enabledById,
    },
    'attribute Samsung A54 Color',
  );

  await ensureRecord(
    prisma.productVariantAttribute,
    { productVariantId: tabletVariant.id, key: 'Storage' },
    {
      productVariantId: tabletVariant.id,
      key: 'Storage',
      value: '64GB',
      isEnabled: true,
      enabledById,
    },
    'attribute iPad Storage',
  );

  await ensureRecord(
    prisma.productVariantAttribute,
    { productVariantId: monitorVariant.id, key: 'Size' },
    {
      productVariantId: monitorVariant.id,
      key: 'Size',
      value: '27-inch',
      isEnabled: true,
      enabledById,
    },
    'attribute Dell Monitor Size',
  );

  await ensureRecord(
    prisma.productVariantAttribute,
    { productVariantId: smartwatchVariant.id, key: 'Color' },
    {
      productVariantId: smartwatchVariant.id,
      key: 'Color',
      value: 'Black',
      isEnabled: true,
      enabledById,
    },
    'attribute Galaxy Watch Color',
  );

  const laptopPrice = await ensureRecord(
    prisma.productVariantPrice,
    { productVariantId: laptopVariant.id, tag: 'retail' },
    {
      productVariantId: laptopVariant.id,
      listPrice: 85000,
      currency: 'ETB',
      tag: 'retail',
      isEnabled: true,
      enabledById,
    },
    'price Dell Latitude retail',
  );

  const phonePrice = await ensureRecord(
    prisma.productVariantPrice,
    { productVariantId: phoneVariant.id, tag: 'retail' },
    {
      productVariantId: phoneVariant.id,
      listPrice: 25000,
      currency: 'ETB',
      tag: 'retail',
      isEnabled: true,
      enabledById,
    },
    'price Samsung A54 retail',
  );

  const tabletPrice = await ensureRecord(
    prisma.productVariantPrice,
    { productVariantId: tabletVariant.id, tag: 'retail' },
    {
      productVariantId: tabletVariant.id,
      listPrice: 42000,
      currency: 'ETB',
      tag: 'retail',
      isEnabled: true,
      enabledById,
    },
    'price iPad retail',
  );

  await ensureRecord(
    prisma.productVariantPrice,
    { productVariantId: monitorVariant.id, tag: 'retail' },
    {
      productVariantId: monitorVariant.id,
      listPrice: 28000,
      currency: 'ETB',
      tag: 'retail',
      isEnabled: true,
      enabledById,
    },
    'price Dell Monitor retail',
  );

  await ensureRecord(
    prisma.productVariantPrice,
    { productVariantId: smartwatchVariant.id, tag: 'retail' },
    {
      productVariantId: smartwatchVariant.id,
      listPrice: 18000,
      currency: 'ETB',
      tag: 'retail',
      isEnabled: true,
      enabledById,
    },
    'price Galaxy Watch retail',
  );

  const laptopStock = await ensureRecord(
    prisma.stock,
    { batchId: 'BATCH-LAPTOP-001' },
    {
      productVariantId: laptopVariant.id,
      supplierId: wholesaler.id,
      locationId: mainWarehouse.id,
      batchId: 'BATCH-LAPTOP-001',
      totalPurchasedUnits: 6,
      remainingUnits: 5,
      stockSourceId: purchaseSource.id,
      referenceNumber: 'PO-1001',
      receiptNumber: 'GRN-1001',
      transportationFree: 3500,
      taxFee: 6800,
      miscellaneousFee: 500,
      purchasePrice: 72000,
      expectedRetailPrice: 85000,
      isEnabled: true,
      enabledById,
      manufacturedDate: new Date('2025-10-01T00:00:00.000Z'),
    },
    'stock batch laptop',
  );

  const phoneStock = await ensureRecord(
    prisma.stock,
    { batchId: 'BATCH-PHONE-001' },
    {
      productVariantId: phoneVariant.id,
      supplierId: wholesaler.id,
      locationId: mainWarehouse.id,
      batchId: 'BATCH-PHONE-001',
      totalPurchasedUnits: 20,
      remainingUnits: 18,
      stockSourceId: purchaseSource.id,
      referenceNumber: 'PO-1002',
      receiptNumber: 'GRN-1002',
      transportationFree: 2200,
      taxFee: 3200,
      miscellaneousFee: 300,
      purchasePrice: 19000,
      expectedRetailPrice: 25000,
      isEnabled: true,
      enabledById,
      manufacturedDate: new Date('2025-11-15T00:00:00.000Z'),
    },
    'stock batch phone',
  );

  await ensureRecord(
    prisma.stock,
    { batchId: 'BATCH-TABLET-001' },
    {
      productVariantId: tabletVariant.id,
      supplierId: wholesaler.id,
      locationId: mainWarehouse.id,
      batchId: 'BATCH-TABLET-001',
      totalPurchasedUnits: 8,
      remainingUnits: 8,
      stockSourceId: purchaseSource.id,
      referenceNumber: 'PO-1003',
      receiptNumber: 'GRN-1003',
      transportationFree: 1800,
      taxFee: 2600,
      miscellaneousFee: 250,
      purchasePrice: 36000,
      expectedRetailPrice: 42000,
      isEnabled: true,
      enabledById,
      manufacturedDate: new Date('2025-12-01T00:00:00.000Z'),
    },
    'stock batch tablet',
  );

  await ensureRecord(
    prisma.stock,
    { batchId: 'BATCH-MONITOR-001' },
    {
      productVariantId: monitorVariant.id,
      supplierId: wholesaler.id,
      locationId: mainWarehouse.id,
      batchId: 'BATCH-MONITOR-001',
      totalPurchasedUnits: 10,
      remainingUnits: 10,
      stockSourceId: purchaseSource.id,
      referenceNumber: 'PO-1004',
      receiptNumber: 'GRN-1004',
      transportationFree: 1400,
      taxFee: 2200,
      miscellaneousFee: 200,
      purchasePrice: 22000,
      expectedRetailPrice: 28000,
      isEnabled: true,
      enabledById,
      manufacturedDate: new Date('2025-12-10T00:00:00.000Z'),
    },
    'stock batch monitor',
  );

  await ensureRecord(
    prisma.stock,
    { batchId: 'BATCH-WATCH-001' },
    {
      productVariantId: smartwatchVariant.id,
      supplierId: wholesaler.id,
      locationId: mainWarehouse.id,
      batchId: 'BATCH-WATCH-001',
      totalPurchasedUnits: 15,
      remainingUnits: 15,
      stockSourceId: purchaseSource.id,
      referenceNumber: 'PO-1005',
      receiptNumber: 'GRN-1005',
      transportationFree: 900,
      taxFee: 1500,
      miscellaneousFee: 150,
      purchasePrice: 13000,
      expectedRetailPrice: 18000,
      isEnabled: true,
      enabledById,
      manufacturedDate: new Date('2026-01-05T00:00:00.000Z'),
    },
    'stock batch smartwatch',
  );

  const completedOrder = await ensureRecord(
    prisma.order,
    { orderNumber: 1001 },
    {
      customerId: customerOne.id,
      paymentOptionId: bankTransfer.id,
      paymentOptionRefernce: 'TRX-1001',
      expectedBankAccountId: cbeAccount.id,
      remark: 'Completed demo order for laptop and phone',
      isFullyPaid: true,
      isPartiallyPaid: false,
      isFullyApproved: true,
      isPartiallyApproved: false,
      isEnabled: true,
      enabledById,
      status: 'SHIPPED',
      lastApprovedDate: new Date('2026-03-18T10:00:00.000Z'),
      isPartiallyFulfilled: false,
      isFullyFulfilled: true,
      lastFulfilledDate: new Date('2026-03-19T11:00:00.000Z'),
      isPartiallyShipped: false,
      isFullyShipped: true,
      orderNumber: 1001,
    },
    'order #1001',
  );

  const pendingOrder = await ensureRecord(
    prisma.order,
    { orderNumber: 1002 },
    {
      customerId: customerTwo.id,
      paymentOptionId: cash.id,
      paymentOptionRefernce: 'WALK-IN',
      expectedBankAccountId: null,
      remark: 'Pending approval demo order for tablet',
      isFullyPaid: false,
      isPartiallyPaid: false,
      isFullyApproved: false,
      isPartiallyApproved: false,
      isEnabled: true,
      enabledById,
      status: 'PENDING_APPROVAL',
      isPartiallyFulfilled: false,
      isFullyFulfilled: false,
      isPartiallyShipped: false,
      isFullyShipped: false,
      orderNumber: 1002,
    },
    'order #1002',
  );

  const completedLaptopItem = await ensureRecord(
    prisma.orderItem,
    { orderId: completedOrder.id, productVariantId: laptopVariant.id },
    {
      orderId: completedOrder.id,
      productVariantId: laptopVariant.id,
      productVariantPriceId: laptopPrice.id,
      orderQuantity: 1,
      purchasedQuantity: 1,
      price: 85000,
      currency: 'ETB',
      isApproved: true,
      approvedById: enabledById,
      approvedAt: new Date('2026-03-18T10:00:00.000Z'),
      isEnabled: true,
      enabledById,
      isPartiallyFulfilled: false,
      fulfilledQuantity: 1,
      isFullyFulfilled: true,
      isPartiallyShipped: false,
      shippedQuantity: 1,
      isFullyShipped: true,
    },
    'order item laptop for #1001',
  );

  const completedPhoneItem = await ensureRecord(
    prisma.orderItem,
    { orderId: completedOrder.id, productVariantId: phoneVariant.id },
    {
      orderId: completedOrder.id,
      productVariantId: phoneVariant.id,
      productVariantPriceId: phonePrice.id,
      orderQuantity: 2,
      purchasedQuantity: 2,
      price: 25000,
      currency: 'ETB',
      isApproved: true,
      approvedById: enabledById,
      approvedAt: new Date('2026-03-18T10:00:00.000Z'),
      isEnabled: true,
      enabledById,
      isPartiallyFulfilled: false,
      fulfilledQuantity: 2,
      isFullyFulfilled: true,
      isPartiallyShipped: false,
      shippedQuantity: 2,
      isFullyShipped: true,
    },
    'order item phone for #1001',
  );

  await ensureRecord(
    prisma.orderItem,
    { orderId: pendingOrder.id, productVariantId: tabletVariant.id },
    {
      orderId: pendingOrder.id,
      productVariantId: tabletVariant.id,
      productVariantPriceId: tabletPrice.id,
      orderQuantity: 1,
      purchasedQuantity: 1,
      price: 42000,
      currency: 'ETB',
      isApproved: false,
      approvedById: null,
      approvedAt: null,
      isEnabled: true,
      enabledById,
      isPartiallyFulfilled: false,
      fulfilledQuantity: 0,
      isFullyFulfilled: false,
      isPartiallyShipped: false,
      shippedQuantity: 0,
      isFullyShipped: false,
    },
    'order item tablet for #1002',
  );

  const completedPayment = await ensureRecord(
    prisma.payment,
    { referenceNumber: 'PAY-1001' },
    {
      amount: 135000,
      unassignedAmount: 0,
      isEnabled: true,
      enabledById,
      paymentOptionId: bankTransfer.id,
      bankAccountId: cbeAccount.id,
      referenceNumber: 'PAY-1001',
      receiptNumber: 'RCPT-1001',
      customerId: customerOne.id,
    },
    'payment PAY-1001',
  );

  await ensureRecord(
    prisma.orderPayment,
    { orderId: completedOrder.id, paymentId: completedPayment.id },
    {
      orderId: completedOrder.id,
      paymentId: completedPayment.id,
      paidAmount: 135000,
      isEnabled: true,
      enabledById,
    },
    'order payment for #1001',
  );

  const laptopFulfillment = await ensureRecord(
    prisma.orderItemFulfillment,
    { orderItemId: completedLaptopItem.id, stockId: laptopStock.id },
    {
      orderItemId: completedLaptopItem.id,
      stockId: laptopStock.id,
      fulfilledQuantity: 1,
      shippedQuantity: 1,
      isEnabled: true,
      enabledById,
    },
    'fulfillment laptop for #1001',
  );

  const phoneFulfillment = await ensureRecord(
    prisma.orderItemFulfillment,
    { orderItemId: completedPhoneItem.id, stockId: phoneStock.id },
    {
      orderItemId: completedPhoneItem.id,
      stockId: phoneStock.id,
      fulfilledQuantity: 2,
      shippedQuantity: 2,
      isEnabled: true,
      enabledById,
    },
    'fulfillment phone for #1001',
  );

  const shipment = await ensureRecord(
    prisma.shipment,
    { shipmentNumber: 'SHP-1001' },
    {
      carrierId: carrier.id,
      shipmentNumber: 'SHP-1001',
      shipmentScheduledDate: new Date('2026-03-19T08:00:00.000Z'),
      isShipmentStarted: true,
      shipmentStartDate: new Date('2026-03-19T09:00:00.000Z'),
      shipmentStartedById: enabledById,
      isShipmentLoaded: true,
      shipmentLoadedDate: new Date('2026-03-19T10:00:00.000Z'),
      shipmentLoadedById: enabledById,
      isShipmentArrived: true,
      expectedArrivalDate: new Date('2026-03-20T10:00:00.000Z'),
      actualArrivalDate: new Date('2026-03-20T09:30:00.000Z'),
      arrivalConfirmedById: enabledById,
      isShipmentCompleted: true,
      shipmentCompletedDate: new Date('2026-03-20T10:30:00.000Z'),
      shipmentCompletedById: enabledById,
      isEnabled: true,
      enabledById,
    },
    'shipment SHP-1001',
  );

  await ensureRecord(
    prisma.shipmentStatus,
    { shipmentId: shipment.id, statusId: scheduledStatus.id },
    {
      shipmentId: shipment.id,
      statusId: scheduledStatus.id,
      isEnabled: true,
      enabledById,
    },
    'shipment status scheduled for SHP-1001',
  );

  await ensureRecord(
    prisma.shipmentStatus,
    { shipmentId: shipment.id, statusId: inTransitStatus.id },
    {
      shipmentId: shipment.id,
      statusId: inTransitStatus.id,
      isEnabled: true,
      enabledById,
    },
    'shipment status in transit for SHP-1001',
  );

  await ensureRecord(
    prisma.shipmentStatus,
    { shipmentId: shipment.id, statusId: deliveredStatus.id },
    {
      shipmentId: shipment.id,
      statusId: deliveredStatus.id,
      isEnabled: true,
      enabledById,
    },
    'shipment status delivered for SHP-1001',
  );

  const laptopShipmentItem = await ensureRecord(
    prisma.shipmentItem,
    { shipmentId: shipment.id, orderItemFulfillmentId: laptopFulfillment.id },
    {
      shipmentId: shipment.id,
      orderItemFulfillmentId: laptopFulfillment.id,
      quantity: 1,
      isEnabled: true,
      enabledById,
    },
    'shipment item laptop for SHP-1001',
  );

  const phoneShipmentItem = await ensureRecord(
    prisma.shipmentItem,
    { shipmentId: shipment.id, orderItemFulfillmentId: phoneFulfillment.id },
    {
      shipmentId: shipment.id,
      orderItemFulfillmentId: phoneFulfillment.id,
      quantity: 2,
      isEnabled: true,
      enabledById,
    },
    'shipment item phone for SHP-1001',
  );

  await ensureRecord(
    prisma.shipmentItemStatus,
    { shipmentItemId: laptopShipmentItem.id, statusId: packedItemStatus.id },
    {
      shipmentItemId: laptopShipmentItem.id,
      statusId: packedItemStatus.id,
      isEnabled: true,
      enabledById,
    },
    'shipment item packed status for laptop',
  );

  await ensureRecord(
    prisma.shipmentItemStatus,
    { shipmentItemId: laptopShipmentItem.id, statusId: deliveredItemStatus.id },
    {
      shipmentItemId: laptopShipmentItem.id,
      statusId: deliveredItemStatus.id,
      isEnabled: true,
      enabledById,
    },
    'shipment item delivered status for laptop',
  );

  await ensureRecord(
    prisma.shipmentItemStatus,
    { shipmentItemId: phoneShipmentItem.id, statusId: packedItemStatus.id },
    {
      shipmentItemId: phoneShipmentItem.id,
      statusId: packedItemStatus.id,
      isEnabled: true,
      enabledById,
    },
    'shipment item packed status for phone',
  );

  await ensureRecord(
    prisma.shipmentItemStatus,
    { shipmentItemId: phoneShipmentItem.id, statusId: deliveredItemStatus.id },
    {
      shipmentItemId: phoneShipmentItem.id,
      statusId: deliveredItemStatus.id,
      isEnabled: true,
      enabledById,
    },
    'shipment item delivered status for phone',
  );

  console.log('Demo seed completed successfully.');
}

if (require.main === module) {
  seedDemo()
    .catch((error) => {
      console.error('Demo seeding failed:', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
