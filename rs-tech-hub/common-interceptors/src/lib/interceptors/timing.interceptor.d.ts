import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Timing interceptor for adding response time headers
 * Measures request processing time and adds X-Response-Time header
 *
 * @example
 * @UseInterceptors(TimingInterceptor)
 * @Controller('users')
 * export class UsersController {}
 */
export declare class TimingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
//# sourceMappingURL=timing.interceptor.d.ts.map