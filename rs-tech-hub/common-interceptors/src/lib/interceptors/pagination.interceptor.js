"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Pagination interceptor for adding pagination metadata
 * Automatically paginates array responses and adds pagination metadata
 *
 * @example
 * @UseInterceptors(PaginationInterceptor)
 * @Get()
 * async findAll(@Query() query: any) {
 *   return this.service.findAll();
 * }
 */
let PaginationInterceptor = class PaginationInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const page = parseInt(request.query.page) || 1;
        const pageSize = Math.min(parseInt(request.query.pageSize) || 10, 100); // Max 100 items per page
        return next.handle().pipe((0, operators_1.map)((data) => {
            // Only paginate array responses
            if (!Array.isArray(data)) {
                return data;
            }
            const total = data.length;
            const totalPages = Math.ceil(total / pageSize);
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const paginatedData = data.slice(start, end);
            const response = {
                data: paginatedData,
                meta: {
                    total,
                    page,
                    pageSize,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrevious: page > 1,
                },
            };
            return response;
        }));
    }
};
exports.PaginationInterceptor = PaginationInterceptor;
exports.PaginationInterceptor = PaginationInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PaginationInterceptor);
