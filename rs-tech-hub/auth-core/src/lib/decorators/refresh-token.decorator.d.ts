/**
 * Parameter decorator that extracts the refresh token from the request
 *
 * This decorator tries to extract the refresh token from:
 * 1. Cookie (`refresh_token`)
 * 2. Custom header (`x-refresh-token`)
 *
 * @returns The refresh token string or undefined if not found
 *
 * @example
 * ```typescript
 * @Mutation(() => AuthResponse)
 * @UseGuards(JwtRefreshGuard)
 * async refreshAccessToken(@RefreshToken() refreshToken: string) {
 *   return this.authService.refreshTokens(refreshToken);
 * }
 * ```
 *
 * @example
 * ```typescript
 * @Post('refresh')
 * @UseGuards(JwtRefreshGuard)
 * async refresh(@RefreshToken() token: string) {
 *   return this.authService.createNewAccessToken(token);
 * }
 * ```
 */
export declare const RefreshToken: (...dataOrPipes: unknown[]) => ParameterDecorator;
//# sourceMappingURL=refresh-token.decorator.d.ts.map