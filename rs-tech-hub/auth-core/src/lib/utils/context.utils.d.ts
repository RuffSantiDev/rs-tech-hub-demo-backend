import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
/**
 * Extracts the request object from either REST or GraphQL execution context
 *
 * @param context - The execution context from NestJS
 * @returns The Express request object
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class MyGuard implements CanActivate {
 *   canActivate(context: ExecutionContext): boolean {
 *     const request = getRequestFromContext(context);
 *     const token = request.headers.authorization;
 *     // ... rest of guard logic
 *   }
 * }
 * ```
 */
export declare function getRequestFromContext(context: ExecutionContext): Request;
/**
 * Extracts a token from the Authorization header
 *
 * @param request - The Express request object
 * @param tokenType - The expected token type (default: 'Bearer')
 * @returns The token string or undefined if not found
 *
 * @example
 * ```typescript
 * const token = extractTokenFromHeader(request);
 * // For 'Authorization: Bearer abc123', returns 'abc123'
 * ```
 */
export declare function extractTokenFromHeader(request: Request, tokenType?: string): string | undefined;
/**
 * Extracts the refresh token from either cookies or custom header
 *
 * @param request - The Express request object
 * @returns The refresh token string or undefined if not found
 *
 * @example
 * ```typescript
 * const refreshToken = extractRefreshToken(request);
 * ```
 */
export declare function extractRefreshToken(request: Request): string | undefined;
//# sourceMappingURL=context.utils.d.ts.map