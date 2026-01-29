import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { ResponseWrapper } from '../types/index.js';
/**
 * Response wrapper interceptor for standardized API responses
 * Wraps all responses in a consistent envelope format
 *
 * @example
 * @UseInterceptors(ResponseWrapperInterceptor)
 * @Controller('users')
 * export class UsersController {}
 */
export declare class ResponseWrapperInterceptor<T> implements NestInterceptor<T, ResponseWrapper<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseWrapper<T>>;
}
//# sourceMappingURL=response-wrapper.interceptor.d.ts.map