import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { HateoasOptions } from '../types/index.js';
/**
 * HATEOAS interceptor for adding hypermedia links
 * Automatically adds navigation links to API responses
 *
 * @example
 * @UseInterceptors(new HateoasInterceptor({
 *   baseUrl: 'https://api.example.com',
 *   relations: {
 *     user: (data) => [
 *       { rel: 'self', href: `/users/${data.id}` },
 *       { rel: 'edit', href: `/users/${data.id}`, method: 'PUT' }
 *     ]
 *   }
 * }))
 * @Get(':id')
 * async findOne(@Param('id') id: string) {
 *   return this.service.findOne(id);
 * }
 */
export declare class HateoasInterceptor implements NestInterceptor {
    private readonly options;
    constructor(options?: HateoasOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private addHateoasLinks;
    private addLinksToItem;
    private extractResourcePath;
}
//# sourceMappingURL=hateoas.interceptor.d.ts.map