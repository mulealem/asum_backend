"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const correlationId = request.correlationId ||
            request.headers['x-correlation-id'];
        let status;
        let message;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message =
                typeof exceptionResponse === 'string'
                    ? exceptionResponse
                    : exceptionResponse.message || exception.message;
        }
        else if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            switch (exception.code) {
                case 'P2002':
                    status = common_1.HttpStatus.CONFLICT;
                    message = `Unique constraint violation on: ${exception.meta?.target?.join(', ') || 'unknown field'}`;
                    break;
                case 'P2025':
                    status = common_1.HttpStatus.NOT_FOUND;
                    message = 'Record not found';
                    break;
                case 'P2003':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Foreign key constraint violation';
                    break;
                case 'P2014':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Required relation violation';
                    break;
                default:
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = `Database error: ${exception.code}`;
            }
        }
        else if (exception instanceof client_1.Prisma.PrismaClientValidationError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Invalid data provided';
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
        }
        this.logger.error(`${correlationId ? `[${correlationId}] ` : ''}${request.method} ${request.url} ${status}`, exception instanceof Error ? exception.stack : String(exception));
        response.status(status).json({
            statusCode: status,
            message,
            correlationId,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map