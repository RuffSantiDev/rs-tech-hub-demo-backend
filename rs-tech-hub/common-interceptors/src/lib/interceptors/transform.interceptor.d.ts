import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { TransformOptions } from '../types/index.js';
/**
 * Transform interceptor for standardizing response format
 * Wraps responses in a consistent structure with metadata
 *
 * @example
 * @UseInterceptors(new TransformInterceptor({ dataKey: 'payload', metaKey: 'metadata' }))
 * @Controller('users')
 * export class UsersController {}
 */
export declare class TransformInterceptor implements NestInterceptor {
    private readonly options;
    constructor(options?: TransformOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private transformResponse;
}
//# sourceMappingURL=transform.interceptor.d.ts.map