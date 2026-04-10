import { User } from '../../user/entities/user.entity';
import { z } from 'zod';
export declare class DiscardedStock {
    id: string;
    stockId: string;
    discardedReasonId: string;
    quantity: number;
    isEnabled: boolean;
    enabledById: string;
    enabledBy: User;
    disabledById: string;
    disabledBy: User;
    disabledDate: Date;
}
export declare const DiscardedStockParameterSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    stockIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    discardedReasonIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    quantity: z.ZodNumber;
    isEnabled: z.ZodOptional<z.ZodBoolean>;
    enabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    disabledByIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabledStartDate: z.ZodOptional<z.ZodString>;
    enabledEndDate: z.ZodOptional<z.ZodString>;
    disabledStartDate: z.ZodOptional<z.ZodString>;
    disabledEndDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    quantity?: number;
    stockIds?: string[];
    discardedReasonIds?: string[];
}, {
    isEnabled?: boolean;
    ids?: string[];
    enabledByIds?: string[];
    disabledByIds?: string[];
    enabledStartDate?: string;
    enabledEndDate?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    quantity?: number;
    stockIds?: string[];
    discardedReasonIds?: string[];
}>;
