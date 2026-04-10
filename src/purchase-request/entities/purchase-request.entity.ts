import { z } from 'zod';

export class PurchaseRequest {
  id: string;
  createdAt: Date;
  purchaseRequestNumber: number;
  supplierId: string;
  status: string;
  remark: string;
  expectedDeliveryDate: Date;
  approvedDate: Date;
  approvedById: string;
  orderedDate: Date;
  receivedDate: Date;
  isEnabled: boolean;
  enableRemark: string;
  enabledById: string;
  disableRemark: string;
  disabledById: string;
  disabledDate: Date;
}

export const PurchaseRequestParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  supplierIds: z.array(z.string().uuid()).optional(),
  status: z.string().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
  purchaseRequestNumber: z.number().optional(),
});
