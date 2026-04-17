import { z } from 'zod';

export const ProformaParameterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  proformaTo: z.string().optional(),
  status: z
    .enum(['DRAFT', 'SENT', 'ACCEPTED', 'CONVERTED', 'CANCELLED'])
    .optional(),
  customerId: z.string().uuid().optional(),
  isEnabled: z.boolean().optional(),
  enabledByIds: z.array(z.string().uuid()).optional(),
  enabledStartDate: z.coerce.string().optional(),
  enabledEndDate: z.coerce.string().optional(),
});
