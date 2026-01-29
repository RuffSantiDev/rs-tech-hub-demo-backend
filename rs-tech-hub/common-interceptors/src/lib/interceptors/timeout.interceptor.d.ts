import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Timeout interceptor for enforcing request timeouts
 * Automatically cancels requests that exceed the specified timeout
 *
 * @example
 * @UseInterceptors(new TimeoutInterceptor(5000)) // 5 seconds
 * @Get()
 * async longRunningOperation() {
 *   return this.service.processLongTask();
 * }
 */
export declare class TimeoutInterceptor implements NestInterceptor {
    private readonly timeoutMs;
    constructor(timeoutMs?: number);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
//# sourceMappingURL=timeout.interceptor.d.ts.map