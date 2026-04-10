import { z } from 'zod';

export class PurchaseRequestItem {
  id: string;
  createdAt: Date;
  purchaseRequestId: string;
  productVariantId: string;
  requestedQuantity: number;
  receivedQuantity: number;
  expectedUnitPrice: number;
  currency: string;
  remark: string;
  isEnabled: boolean;
  enableRemark: string;
  enabledById: string;
  disableRemark: string;
  disabledById: string;
  disabledDate: Date;
}

export const PurchaseRequestItemParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  purchaseRequestIds: z.array(z.string().uuid()).optional(),
  productVariantIds: z.array(z.string().uuid()).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});
