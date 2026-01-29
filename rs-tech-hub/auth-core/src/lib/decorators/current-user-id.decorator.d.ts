/**
 * Parameter decorator that extracts the current user's ID from the request
 *
 * This is a convenience decorator that extracts just the user ID (sub claim)
 * instead of the full user object.
 *
 * @returns The user ID (sub claim from JWT) or undefined if not authenticated
 *
 * @example
 * ```typescript
 * @Query(() => User)
 * async getMyProfile(@CurrentUserId() userId: string) {
 *   return this.userService.findOne(userId);
 * }
 * ```
 *
 * @example
 * ```typescript
 * @Get('me')
 * async getCurrentUser(@CurrentUserId() userId: string) {
 *   return this.userService.findById(userId);
 * }
 * ```
 */
export declare const CurrentUserId: (...dataOrPipes: unknown[]) => ParameterDecorator;
//# sourceMappingURL=current-user-id.decorator.d.ts.map