import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

type PaginationParams = {
  page: number;
  pageSize: number;
  skip: number;
};

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const pagination = this.getPaginationParams(request);

    if (!pagination) {
      return next.handle();
    }

    return next.handle().pipe(
      map((payload) => {
        if (!Array.isArray(payload)) {
          return payload;
        }

        const { skip, pageSize, page } = pagination;

        return {
          data: payload.slice(skip, skip + pageSize),
          total: payload.length,
          page,
          pageSize,
        };
      }),
    );
  }

  private getPaginationParams(request: Request): PaginationParams | null {
    const source = {
      ...(request.query ?? {}),
      ...(request.body && typeof request.body === 'object' ? request.body : {}),
    } as Record<string, unknown>;

    const page = this.parsePositiveInteger(source.page);
    const pageSize =
      this.parsePositiveInteger(source.pageSize) ??
      this.parsePositiveInteger(source.take);
    const skip = this.parseNonNegativeInteger(source.skip);

    if (page === null && pageSize === null && skip === null) {
      return null;
    }

    const resolvedPageSize = pageSize ?? 20;
    const resolvedSkip = skip ?? ((page ?? 1) - 1) * resolvedPageSize;
    const resolvedPage =
      page ?? Math.floor(resolvedSkip / resolvedPageSize) + 1;

    return {
      page: resolvedPage,
      pageSize: resolvedPageSize,
      skip: resolvedSkip,
    };
  }

  private parsePositiveInteger(value: unknown): number | null {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed <= 0) {
      return null;
    }

    return parsed;
  }

  private parseNonNegativeInteger(value: unknown): number | null {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed < 0) {
      return null;
    }

    return parsed;
  }
}
