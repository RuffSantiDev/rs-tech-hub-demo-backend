import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Pagination interceptor for adding pagination metadata
 * Automatically paginates array responses and adds pagination metadata
 *
 * @example
 * @UseInterceptors(PaginationInterceptor)
 * @Get()
 * async findAll(@Query() query: any) {
 *   return this.service.findAll();
 * }
 */
export declare class PaginationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
//# sourceMappingURL=pagination.interceptor.d.ts.map