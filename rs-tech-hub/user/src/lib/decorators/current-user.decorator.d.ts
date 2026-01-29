import { UserModel as User } from '../models/user.model';
/**
 * Extract current user from request
 * Supports both HTTP and GraphQL contexts
 *
 * @example
 * async getProfile(@CurrentUser() user: User) {}
 * async getProfile(@CurrentUser('id') userId: string) {}
 */
export declare const CurrentUser: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | keyof User | undefined)[]) => ParameterDecorator;
//# sourceMappingURL=current-user.decorator.d.ts.map