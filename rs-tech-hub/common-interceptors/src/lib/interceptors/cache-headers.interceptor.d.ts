import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { CacheHeadersOptions } from '../types/index.js';
/**
 * Cache headers interceptor for adding HTTP cache headers
 * Configures browser and proxy caching behavior
 *
 * @example
 * @UseInterceptors(new CacheHeadersInterceptor({ maxAge: 3600, public: true }))
 * @Get()
 * async findAll() {
 *   return this.service.findAll();
 * }
 */
export declare class CacheHeadersInterceptor implements NestInterceptor {
    private readonly options;
    constructor(options?: CacheHeadersOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private setCacheHeaders;
}
//# sourceMappingURL=cache-headers.interceptor.d.ts.map