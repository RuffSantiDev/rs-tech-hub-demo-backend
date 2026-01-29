import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
/**
 * GraphQL authentication guard using JWT
 *
 * Protects GraphQL resolvers by validating JWT tokens from the Authorization header.
 * Supports the @Public() decorator to allow unauthenticated access to specific resolvers.
 *
 * @example
 * ```typescript
 * @Resolver()
 * @UseGuards(GqlAuthGuard)
 * export class UserResolver {
 *   @Query(() => User)
 *   async me(@CurrentUser() user: AuthenticatedUser) {
 *     return this.userService.findById(user.sub);
 *   }
 *
 *   @Public()
 *   @Query(() => String)
 *   async health() {
 *     return 'OK';
 *   }
 * }
 * ```
 */
export declare class JWTAuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private readonly configService;
    constructor(jwtService: JwtService, reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=jwt-auth.guard.d.ts.map