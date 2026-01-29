import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Request ID interceptor for adding correlation IDs
 * Generates or uses existing request IDs for request tracing
 *
 * @example
 * @UseInterceptors(RequestIdInterceptor)
 * @Controller('users')
 * export class UsersController {}
 */
export declare class RequestIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private generateId;
}
//# sourceMappingURL=request-id.interceptor.d.ts.map