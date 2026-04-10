import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { Observable, tap } from 'rxjs';

type RequestWithCorrelationId = Request & {
  correlationId?: string;
};

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<RequestWithCorrelationId>();
    const response = http.getResponse<Response>();
    const correlationId =
      (request.headers['x-correlation-id'] as string | undefined) ??
      randomUUID();
    const startedAt = Date.now();

    request.correlationId = correlationId;
    response.setHeader('x-correlation-id', correlationId);

    this.logger.log(
      `[${correlationId}] ${request.method} ${request.originalUrl || request.url} started`,
    );

    return next.handle().pipe(
      tap({
        next: () => {
          this.logger.log(
            `[${correlationId}] ${request.method} ${request.originalUrl || request.url} ${response.statusCode} ${Date.now() - startedAt}ms`,
          );
        },
        error: () => {
          this.logger.error(
            `[${correlationId}] ${request.method} ${request.originalUrl || request.url} ${response.statusCode} ${Date.now() - startedAt}ms`,
          );
        },
      }),
    );
  }
}
