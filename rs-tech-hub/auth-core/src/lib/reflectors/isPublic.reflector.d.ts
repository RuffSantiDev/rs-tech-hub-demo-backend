/**
 * Metadata key for marking routes as public (no authentication required)
 */
export declare const IS_PUBLIC_KEY = "isPublic";
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
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
//# sourceMappingURL=isPublic.reflector.d.ts.map