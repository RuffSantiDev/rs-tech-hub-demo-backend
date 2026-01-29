import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { SensitiveDataFilterOptions } from '../types/index.js';
/**
 * Sensitive data filter interceptor for removing sensitive information
 * Automatically filters out specified fields from response data
 *
 * @example
 * @UseInterceptors(new SensitiveDataFilterInterceptor({
 *   fields: ['password', 'ssn', 'creditCard'],
 *   replacement: '[REDACTED]'
 * }))
 * @Get()
 * async findAll() {
 *   return this.service.findAll();
 * }
 */
export declare class SensitiveDataFilterInterceptor implements NestInterceptor {
    private readonly options;
    private readonly defaultSensitiveFields;
    constructor(options?: SensitiveDataFilterOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private filterSensitiveData;
    private filterFieldDeep;
    private filterByPatterns;
}
//# sourceMappingURL=sensitive-data-filter.interceptor.d.ts.map