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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const report_service_1 = require("./report.service");
const report_query_dto_1 = require("./dto/report-query.dto");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    inventoryStatus(query) {
        return this.reportService.inventoryStatus(query);
    }
    sales(query) {
        return this.reportService.salesReport(query);
    }
    inventoryValuation(query) {
        return this.reportService.inventoryValuation(query);
    }
    stockMovement(query) {
        return this.reportService.stockMovement(query);
    }
    topCustomers(query) {
        return this.reportService.topCustomers(query);
    }
    supplierPerformance(query) {
        return this.reportService.supplierPerformance(query);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)('inventory-status'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(report_query_dto_1.InventoryStatusQuerySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "inventoryStatus", null);
__decorate([
    (0, common_1.Post)('sales'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(report_query_dto_1.SalesReportQuerySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "sales", null);
__decorate([
    (0, common_1.Post)('inventory-valuation'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(report_query_dto_1.InventoryValuationQuerySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "inventoryValuation", null);
__decorate([
    (0, common_1.Post)('stock-movement'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(report_query_dto_1.StockMovementQuerySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "stockMovement", null);
__decorate([
    (0, common_1.Post)('top-customers'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(report_query_dto_1.TopCustomersQuerySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "topCustomers", null);
__decorate([
    (0, common_1.Post)('supplier-performance'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(report_query_dto_1.SupplierPerformanceQuerySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "supplierPerformance", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('report'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map