import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
// import { BookModule } from './book/book.module';
import { BankModule } from './bank/bank.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RoleModule } from './role/role.module';
import { PaymentOptionModule } from './payment-option/payment-option.module';
import { BrandModule } from './brand/brand.module';
import { LocationModule } from './location/location.module';
import { TypeOfProductModule } from './type-of-product/type-of-product.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { SupplierModule } from './supplier/supplier.module';
import { StockSourceModule } from './stock-source/stock-source.module';
import { ProductVariantAttributeModule } from './product-variant-attribute/product-variant-attribute.module';
import { ProductVariantPriceModule } from './product-variant-price/product-variant-price.module';
import { StockModule } from './stock/stock.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderPaymentModule } from './order-payment/order-payment.module';
import { PaymentModule } from './payment/payment.module';
import { OrderItemFulfillmentModule } from './order-item-fulfillment/order-item-fulfillment.module';
// import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { ShipmentStatusOptionModule } from './shipment-status-option/shipment-status-option.module';
import { ShipmentItemStatusOptionModule } from './shipment-item-status-option/shipment-item-status-option.module';
import { CarrierTypeModule } from './carrier-type/carrier-type.module';
import { CarrierModule } from './carrier/carrier.module';
import { ShipmentModule } from './shipment/shipment.module';
import { ShipmentItemModule } from './shipment-item/shipment-item.module';
import { ShipmentStatusModule } from './shipment-status/shipment-status.module';
import { ShipmentItemStatusModule } from './shipment-item-status/shipment-item-status.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { StockDiscardReasonModule } from './stock-discard-reason/stock-discard-reason.module';
import { DiscardedStockModule } from './discarded-stock/discarded-stock.module';
import { StockTransactionItemModule } from './stock-transaction-item/stock-transaction-item.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportModule } from './report/report.module';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { PurchaseRequestItemModule } from './purchase-request-item/purchase-request-item.module';
import { ExpenseModule } from './expense/expense.module';
import { PermissionsGuard } from './auth/permissions.guard';
import { OrganizationSettingModule } from './organization-setting/organization-setting.module';
import { TaxModule } from './tax/tax.module';
import { StockAdjustReasonModule } from './stock-adjust-reason/stock-adjust-reason.module';
import { StockAdjustmentModule } from './stock-adjustment/stock-adjustment.module';
import { ProformaModule } from './proforma/proforma.module';

@Module({
  imports: [
    BankModule,
    UserModule,
    UserRoleModule,
    RoleModule,
    PaymentOptionModule,
    BrandModule,
    LocationModule,
    TypeOfProductModule,
    CustomerModule,
    ProductModule,
    ProductVariantModule,
    SupplierModule,
    StockSourceModule,
    ProductVariantAttributeModule,
    ProductVariantPriceModule,
    StockModule,
    OrderModule,
    OrderItemModule,
    OrderPaymentModule,
    PaymentModule,
    OrderItemFulfillmentModule,
    PrismaModule,
    AuthModule,
    ShipmentStatusOptionModule,
    ShipmentItemStatusOptionModule,
    CarrierTypeModule,
    CarrierModule,
    ShipmentModule,
    ShipmentItemModule,
    ShipmentStatusModule,
    ShipmentItemStatusModule,
    BankAccountModule,
    StockDiscardReasonModule,
    DiscardedStockModule,
    StockTransactionItemModule,
    DashboardModule,
    ReportModule,
    PurchaseRequestModule,
    PurchaseRequestItemModule,
    ExpenseModule,
    OrganizationSettingModule,
    TaxModule,
    StockAdjustReasonModule,
    StockAdjustmentModule,
    ProformaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
