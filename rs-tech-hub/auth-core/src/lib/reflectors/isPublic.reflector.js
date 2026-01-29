"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
/**
 * Metadata key for marking routes as public (no authentication required)
 */
exports.IS_PUBLIC_KEY = 'isPublic';
/**
 * Decorator to mark a route or resolver as public (no authentication required)
 *
 * When applied to a route or resolver, authentication guards (AuthGuard, GqlAuthGuard)
 * will skip authentication checks and allow unauthenticated access.
 *
 * @example
 * ```typescript
 * @Controller('auth')
 * export class AuthController {
 *   @Public()
 *   @Post('login')
 *   async login(@Body() dto: LoginDto) {
 *     return this.authService.login(dto);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * @Resolver()
 * export class PublicResolver {
 *   @Public()
 *   @Query(() => String)
 *   async health() {
 *     return 'OK';
 *   }
 * }
 * ```
 */
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
