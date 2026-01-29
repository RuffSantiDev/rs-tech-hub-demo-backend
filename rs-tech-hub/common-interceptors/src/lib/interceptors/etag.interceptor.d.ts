import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { ETagOptions } from '../types/index.js';
/**
 * ETag interceptor for adding HTTP ETag headers
 * Generates ETags for responses to enable conditional requests
 *
 * @example
 * @UseInterceptors(new ETagInterceptor({ algorithm: 'sha256', weak: true }))
 * @Get(':id')
 * async findOne(@Param('id') id: string) {
 *   return this.service.findOne(id);
 * }
 */
export declare class ETagInterceptor implements NestInterceptor {
    private readonly options;
    constructor(options?: ETagOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private setETagHeader;
    private generateETag;
}
//# sourceMappingURL=etag.interceptor.d.ts.map