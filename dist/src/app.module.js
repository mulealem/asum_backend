"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const bank_module_1 = require("./bank/bank.module");
const user_module_1 = require("./user/user.module");
const user_role_module_1 = require("./user-role/user-role.module");
const role_module_1 = require("./role/role.module");
const payment_option_module_1 = require("./payment-option/payment-option.module");
const brand_module_1 = require("./brand/brand.module");
const location_module_1 = require("./location/location.module");
const type_of_product_module_1 = require("./type-of-product/type-of-product.module");
const customer_module_1 = require("./customer/customer.module");
const product_module_1 = require("./product/product.module");
const product_variant_module_1 = require("./product-variant/product-variant.module");
const supplier_module_1 = require("./supplier/supplier.module");
const stock_source_module_1 = require("./stock-source/stock-source.module");
const product_variant_attribute_module_1 = require("./product-variant-attribute/product-variant-attribute.module");
const product_variant_price_module_1 = require("./product-variant-price/product-variant-price.module");
const stock_module_1 = require("./stock/stock.module");
const order_module_1 = require("./order/order.module");
const order_item_module_1 = require("./order-item/order-item.module");
const order_payment_module_1 = require("./order-payment/order-payment.module");
const payment_module_1 = require("./payment/payment.module");
const order_item_fulfillment_module_1 = require("./order-item-fulfillment/order-item-fulfillment.module");
const prisma_module_1 = require("./prisma.module");
const auth_module_1 = require("./auth/auth.module");
const shipment_status_option_module_1 = require("./shipment-status-option/shipment-status-option.module");
const shipment_item_status_option_module_1 = require("./shipment-item-status-option/shipment-item-status-option.module");
const carrier_type_module_1 = require("./carrier-type/carrier-type.module");
const carrier_module_1 = require("./carrier/carrier.module");
const shipment_module_1 = require("./shipment/shipment.module");
const shipment_item_module_1 = require("./shipment-item/shipment-item.module");
const shipment_status_module_1 = require("./shipment-status/shipment-status.module");
const shipment_item_status_module_1 = require("./shipment-item-status/shipment-item-status.module");
const bank_account_module_1 = require("./bank-account/bank-account.module");
const stock_discard_reason_module_1 = require("./stock-discard-reason/stock-discard-reason.module");
const discarded_stock_module_1 = require("./discarded-stock/discarded-stock.module");
const stock_transaction_item_module_1 = require("./stock-transaction-item/stock-transaction-item.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const report_module_1 = require("./report/report.module");
const purchase_request_module_1 = require("./purchase-request/purchase-request.module");
const purchase_request_item_module_1 = require("./purchase-request-item/purchase-request-item.module");
const expense_module_1 = require("./expense/expense.module");
const organization_setting_module_1 = require("./organization-setting/organization-setting.module");
const tax_module_1 = require("./tax/tax.module");
const stock_adjust_reason_module_1 = require("./stock-adjust-reason/stock-adjust-reason.module");
const stock_adjustment_module_1 = require("./stock-adjustment/stock-adjustment.module");
const proforma_module_1 = require("./proforma/proforma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bank_module_1.BankModule,
            user_module_1.UserModule,
            user_role_module_1.UserRoleModule,
            role_module_1.RoleModule,
            payment_option_module_1.PaymentOptionModule,
            brand_module_1.BrandModule,
            location_module_1.LocationModule,
            type_of_product_module_1.TypeOfProductModule,
            customer_module_1.CustomerModule,
            product_module_1.ProductModule,
            product_variant_module_1.ProductVariantModule,
            supplier_module_1.SupplierModule,
            stock_source_module_1.StockSourceModule,
            product_variant_attribute_module_1.ProductVariantAttributeModule,
            product_variant_price_module_1.ProductVariantPriceModule,
            stock_module_1.StockModule,
            order_module_1.OrderModule,
            order_item_module_1.OrderItemModule,
            order_payment_module_1.OrderPaymentModule,
            payment_module_1.PaymentModule,
            order_item_fulfillment_module_1.OrderItemFulfillmentModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            shipment_status_option_module_1.ShipmentStatusOptionModule,
            shipment_item_status_option_module_1.ShipmentItemStatusOptionModule,
            carrier_type_module_1.CarrierTypeModule,
            carrier_module_1.CarrierModule,
            shipment_module_1.ShipmentModule,
            shipment_item_module_1.ShipmentItemModule,
            shipment_status_module_1.ShipmentStatusModule,
            shipment_item_status_module_1.ShipmentItemStatusModule,
            bank_account_module_1.BankAccountModule,
            stock_discard_reason_module_1.StockDiscardReasonModule,
            discarded_stock_module_1.DiscardedStockModule,
            stock_transaction_item_module_1.StockTransactionItemModule,
            dashboard_module_1.DashboardModule,
            report_module_1.ReportModule,
            purchase_request_module_1.PurchaseRequestModule,
            purchase_request_item_module_1.PurchaseRequestItemModule,
            expense_module_1.ExpenseModule,
            organization_setting_module_1.OrganizationSettingModule,
            tax_module_1.TaxModule,
            stock_adjust_reason_module_1.StockAdjustReasonModule,
            stock_adjustment_module_1.StockAdjustmentModule,
            proforma_module_1.ProformaModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map