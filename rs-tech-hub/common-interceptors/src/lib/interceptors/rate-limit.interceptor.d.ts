import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Rate limit interceptor for tracking request rates
 * Monitors request frequency and adds rate limit headers
 * Supports both HTTP REST and GraphQL contexts
 *
 * @example
 * @UseInterceptors(new RateLimitInterceptor({
 *   windowMs: 60000, // 1 minute
 *   max: 100, // 100 requests per minute
 *   headers: true
 * }))
 * @Controller('api')
 * export class ApiController {}
 */
export declare class RateLimitInterceptor implements NestInterceptor {
    private readonly store;
    options: {
        windowMs: number;
        max: number;
        headers: boolean;
        skipSuccessfulRequests: boolean;
        skipFailedRequests: boolean;
    };
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private getClientKey;
}
//# sourceMappingURL=rate-limit.interceptor.d.ts.map