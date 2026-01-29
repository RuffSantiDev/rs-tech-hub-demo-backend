import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { CompressionOptions } from '../types/index.js';
/**
 * Compression interceptor for enabling response compression
 * Adds compression headers to enable gzip/deflate compression
 *
 * @example
 * @UseInterceptors(new CompressionInterceptor({ threshold: 1024 }))
 * @Get()
 * async getLargeData() {
 *   return this.service.getBigResponse();
 * }
 */
export declare class CompressionInterceptor implements NestInterceptor {
    private readonly options;
    constructor(options?: CompressionOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private setupCompression;
    private shouldCompress;
}
//# sourceMappingURL=compression.interceptor.d.ts.map