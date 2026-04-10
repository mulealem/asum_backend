"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let PaginationInterceptor = class PaginationInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const pagination = this.getPaginationParams(request);
        if (!pagination) {
            return next.handle();
        }
        return next.handle().pipe((0, rxjs_1.map)((payload) => {
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
        }));
    }
    getPaginationParams(request) {
        const source = {
            ...(request.query ?? {}),
            ...(request.body && typeof request.body === 'object' ? request.body : {}),
        };
        const page = this.parsePositiveInteger(source.page);
        const pageSize = this.parsePositiveInteger(source.pageSize) ??
            this.parsePositiveInteger(source.take);
        const skip = this.parseNonNegativeInteger(source.skip);
        if (page === null && pageSize === null && skip === null) {
            return null;
        }
        const resolvedPageSize = pageSize ?? 20;
        const resolvedSkip = skip ?? ((page ?? 1) - 1) * resolvedPageSize;
        const resolvedPage = page ?? Math.floor(resolvedSkip / resolvedPageSize) + 1;
        return {
            page: resolvedPage,
            pageSize: resolvedPageSize,
            skip: resolvedSkip,
        };
    }
    parsePositiveInteger(value) {
        if (value === undefined || value === null || value === '') {
            return null;
        }
        const parsed = Number(value);
        if (!Number.isInteger(parsed) || parsed <= 0) {
            return null;
        }
        return parsed;
    }
    parseNonNegativeInteger(value) {
        if (value === undefined || value === null || value === '') {
            return null;
        }
        const parsed = Number(value);
        if (!Number.isInteger(parsed) || parsed < 0) {
            return null;
        }
        return parsed;
    }
};
exports.PaginationInterceptor = PaginationInterceptor;
exports.PaginationInterceptor = PaginationInterceptor = __decorate([
    (0, common_1.Injectable)()
], PaginationInterceptor);
//# sourceMappingURL=pagination.interceptor.js.map