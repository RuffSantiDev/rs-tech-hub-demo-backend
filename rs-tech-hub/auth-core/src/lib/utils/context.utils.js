"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestFromContext = getRequestFromContext;
exports.extractTokenFromHeader = extractTokenFromHeader;
exports.extractRefreshToken = extractRefreshToken;
const graphql_1 = require("@nestjs/graphql");
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
function getRequestFromContext(context) {
    if (context.getType() === 'graphql') {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    return context.switchToHttp().getRequest();
}
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
function extractTokenFromHeader(request, tokenType = 'Bearer') {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === tokenType ? token : undefined;
}
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
function extractRefreshToken(request) {
    // First try to extract from cookie
    if (request?.cookies?.refresh_token) {
        return request.cookies.refresh_token;
    }
    // Then try header
    return request?.headers['x-refresh-token'];
}
