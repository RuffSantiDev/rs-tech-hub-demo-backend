import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
/**
 * REST API authentication guard using JWT
 *
 * Protects REST endpoints by validating JWT tokens from the Authorization header.
 * Supports the @Public() decorator to allow unauthenticated access to specific endpoints.
 *
 * @example
 * ```typescript
 * @Controller('users')
 * @UseGuards(AuthGuard)
 * export class UsersController {
 *   @Get('me')
 *   async getCurrentUser(@CurrentUser() user: AuthenticatedUser) {
 *     return this.userService.findById(user.sub);
 *   }
 *
 *   @Public()
 *   @Post('register')
 *   async register(@Body() dto: RegisterDto) {
 *     return this.authService.register(dto);
 *   }
 * }
 * ```
 */
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private readonly configService;
    constructor(jwtService: JwtService, reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=auth.guard.d.ts.map