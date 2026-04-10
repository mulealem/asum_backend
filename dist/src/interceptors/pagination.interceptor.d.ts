import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class PaginationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
    private getPaginationParams;
    private parsePositiveInteger;
    private parseNonNegativeInteger;
}
