/**
 * Parameter decorator that extracts the current authenticated user from the request
 *
 * Works with both REST and GraphQL contexts. The user object is populated by
 * authentication guards (AuthGuard, GqlAuthGuard) and strategies (JwtStrategy).
 *
 * @returns The authenticated user object or undefined if not authenticated
 *
 * @example
 * ```typescript
 * @Query(() => User)
 * @UseGuards(GqlAuthGuard)
 * async me(@CurrentUser() user: AuthenticatedUser) {
 *   return this.userService.findById(user.sub);
 * }
 * ```
 *
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(AuthGuard)
 * async getProfile(@CurrentUser() user: AuthenticatedUser) {
 *   return this.userService.getProfile(user.sub);
 * }
 * ```
 */
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
//# sourceMappingURL=current-user.decorator.d.ts.map