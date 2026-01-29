import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
/**
 * Guard for service-to-service authentication using a shared secret token
 *
 * This guard validates requests using a SERVICE_TOKEN environment variable.
 * It's intended for internal service-to-service communication, not for user authentication.
 *
 * @example
 * ```typescript
 * @Controller('internal')
 * @UseGuards(ServiceAuthGuard)
 * export class InternalController {
 *   @Post('sync')
 *   async syncData() {
 *     // Only accessible with valid SERVICE_TOKEN
 *   }
 * }
 * ```
 *
 * Environment Variables Required:
 * - SERVICE_TOKEN: The shared secret token for service authentication
 */
export declare class ServiceAuthGuard implements CanActivate {
    private readonly configService;
    private reflector;
    private readonly logger;
    constructor(configService: ConfigService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=service-auth.guard.d.ts.map