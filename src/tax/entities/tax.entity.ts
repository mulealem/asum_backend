import { z } from 'zod';

export class Tax {
  id: string;
  name: string;
  abbreviation: string;
  rate: number;
  type: string;
  description: string;
  isEnabled: boolean;
  enabledById: string;
  disabledById: string;
  disabledDate: Date;
}

export const TaxParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  name: z.string().optional(),
  abbreviation: z.string().optional(),
  type: z.enum(['SALES', 'PURCHASE', 'ALL']).optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  disabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
  disabledStartDate: z.coerce.string().optional(),
  disabledEndDate: z.coerce.string().optional(),
});
