import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ReportService } from './report.service';
import {
  InventoryStatusQuerySchema,
  SalesReportQuerySchema,
  InventoryValuationQuerySchema,
  StockMovementQuerySchema,
  TopCustomersQuerySchema,
  SupplierPerformanceQuerySchema,
} from './dto/report-query.dto';

@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('inventory-status')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(InventoryStatusQuerySchema))
  inventoryStatus(@Body() query: any) {
    return this.reportService.inventoryStatus(query);
  }

  @Post('sales')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(SalesReportQuerySchema))
  sales(@Body() query: any) {
    return this.reportService.salesReport(query);
  }

  @Post('inventory-valuation')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(InventoryValuationQuerySchema))
  inventoryValuation(@Body() query: any) {
    return this.reportService.inventoryValuation(query);
  }

  @Post('stock-movement')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(StockMovementQuerySchema))
  stockMovement(@Body() query: any) {
    return this.reportService.stockMovement(query);
  }

  @Post('top-customers')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(TopCustomersQuerySchema))
  topCustomers(@Body() query: any) {
    return this.reportService.topCustomers(query);
  }

  @Post('supplier-performance')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(SupplierPerformanceQuerySchema))
  supplierPerformance(@Body() query: any) {
    return this.reportService.supplierPerformance(query);
  }
}
