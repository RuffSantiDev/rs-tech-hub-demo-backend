import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Basic authentication guard using username/password from environment variables
 *
 * Protects endpoints using HTTP Basic Authentication. Credentials are configured
 * via BASIC_AUTH_ERROR_USERNAME and BASIC_AUTH_ERROR_PASSWORD environment variables.
 *
 * Useful for:
 * - Simple admin panels
 * - Swagger/API documentation protection
 * - Internal tools
 * - Development/staging environments
 *
 * @example
 * ```typescript
 * @Controller('admin')
 * @UseGuards(BasicAuthGuard)
 * export class AdminController {
 *   @Get('dashboard')
 *   async getDashboard() {
 *     return { message: 'Admin Dashboard' };
 *   }
 * }
 * ```
 *
 * Environment Variables Required:
 * - BASIC_AUTH_ERROR_USERNAME: Username for basic authentication
 * - BASIC_AUTH_ERROR_PASSWORD: Password for basic authentication
 */
export declare class BasicAuthGuard implements CanActivate {
    private readonly configService;
    private readonly authMiddleware;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
//# sourceMappingURL=basic-auth.guard.d.ts.map