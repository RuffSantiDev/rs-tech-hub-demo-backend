import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '@rs-tech-hub/nestjs-user';
/**
 * Metadata key for defining required roles
 */
export declare const ROLES_KEY = "roles";
/**
 * Decorator to specify required roles for a route or resolver
 *
 * @param roles - Array of role names required to access the route
 *
 * @example
 * ```typescript
 * @Mutation(() => User)
 * @Roles(['admin', 'moderator'])
 * @UseGuards(GqlAuthGuard, RolesGuard)
 * async deleteUser(@Args('id') id: string) {
 *   return this.userService.delete(id);
 * }
 * ```
 */
export declare const Roles: import("@nestjs/core").ReflectableDecorator<string[], string[]>;
/**
 * Guard that checks if the authenticated user has the required role(s)
 *
 * This guard should be used after an authentication guard (AuthGuard or GqlAuthGuard)
 * to ensure the user is authenticated before checking roles.
 *
 * Works with both REST and GraphQL contexts.
 *
 * @example
 * ```typescript
 * @Controller('admin')
 * @UseGuards(AuthGuard, RolesGuard)
 * export class AdminController {
 *   @Roles(['admin'])
 *   @Get('users')
 *   async getAllUsers() {
 *     return this.userService.findAll();
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * @Resolver()
 * @UseGuards(GqlAuthGuard, RolesGuard)
 * export class AdminResolver {
 *   @Roles(['admin', 'superadmin'])
 *   @Mutation(() => Boolean)
 *   async deleteAccount(@Args('id') id: string) {
 *     return this.accountService.delete(id);
 *   }
 * }
 * ```
 */
export declare class RolesGuard implements CanActivate {
    private reflector;
    private userRepository;
    constructor(reflector: Reflector, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=roles.guard.d.ts.map