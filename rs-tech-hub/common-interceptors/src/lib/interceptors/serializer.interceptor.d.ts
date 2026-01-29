import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
/**
 * Serializer interceptor for data transformation using DTOs
 * Transforms response data using class-transformer with exclusion rules
 *
 * @example
 * @UseInterceptors(new SerializerInterceptor(UserDto))
 * @Controller('users')
 * export class UsersController {}
 */
export declare class SerializerInterceptor implements NestInterceptor {
    private readonly dto;
    constructor(dto: any);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
//# sourceMappingURL=serializer.interceptor.d.ts.map