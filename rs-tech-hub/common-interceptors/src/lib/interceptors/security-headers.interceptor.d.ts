import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { SecurityHeadersOptions } from '../types/index.js';
/**
 * Security headers interceptor for adding security-related HTTP headers
 * Helps protect against common web vulnerabilities
 *
 * @example
 * @UseInterceptors(new SecurityHeadersInterceptor({
 *   contentSecurityPolicy: "default-src 'self'",
 *   xFrameOptions: 'DENY'
 * }))
 * @Controller('users')
 * export class UsersController {}
 */
export declare class SecurityHeadersInterceptor implements NestInterceptor {
    private readonly options;
    constructor(options?: SecurityHeadersOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private setSecurityHeaders;
}
//# sourceMappingURL=security-headers.interceptor.d.ts.map