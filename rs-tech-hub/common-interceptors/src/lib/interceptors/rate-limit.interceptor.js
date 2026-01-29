"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const operators_1 = require("rxjs/operators");
/**
 * Rate limit interceptor for tracking request rates
 * Monitors request frequency and adds rate limit headers
 * Supports both HTTP REST and GraphQL contexts
 *
 * @example
 * @UseInterceptors(new RateLimitInterceptor({
 *   windowMs: 60000, // 1 minute
 *   max: 100, // 100 requests per minute
 *   headers: true
 * }))
 * @Controller('api')
 * export class ApiController {}
 */
let RateLimitInterceptor = class RateLimitInterceptor {
    store = new Map();
    options = {
        windowMs: 60000, // 1 minute window
        max: 20, // 20 requests per minute per IP
        headers: true, // Include X-RateLimit-* headers in response
        skipSuccessfulRequests: false, // Count all requests
        skipFailedRequests: false, // Count failed auth attempts (important for security)
    };
    intercept(context, next) {
        const contextType = context.getType();
        let request;
        let response;
        if (contextType === 'graphql') {
            const gqlContext = graphql_1.GqlExecutionContext.create(context);
            const ctx = gqlContext.getContext();
            request = ctx.req;
            response = ctx.res;
        }
        else if (contextType === 'http') {
            request = context.switchToHttp().getRequest();
            response = context.switchToHttp().getResponse();
        }
        else {
            // Skip rate limiting for other context types (e.g., WebSockets, Microservices)
            return next.handle();
        }
        if (!request || !response) {
            return next.handle();
        }
        const key = this.getClientKey(request);
        const now = Date.now();
        const windowMs = this.options.windowMs;
        const maxRequests = this.options.max;
        // Get or create client record
        let clientRecord = this.store.get(key);
        if (!clientRecord || now > clientRecord.resetTime) {
            clientRecord = {
                count: 0,
                resetTime: now + windowMs,
            };
            this.store.set(key, clientRecord);
        }
        // Increment request count
        clientRecord.count++;
        // Calculate remaining and reset time
        const remaining = Math.max(0, maxRequests - clientRecord.count);
        const resetTime = Math.ceil(clientRecord.resetTime / 1000);
        // Add rate limit headers if enabled
        if (this.options.headers !== false) {
            response.setHeader('X-RateLimit-Limit', maxRequests);
            response.setHeader('X-RateLimit-Remaining', remaining);
            response.setHeader('X-RateLimit-Reset', resetTime);
            response.setHeader('X-RateLimit-Window', Math.ceil(windowMs / 1000));
        }
        // Check if limit exceeded
        if (clientRecord.count > maxRequests) {
            response.setHeader('Retry-After', Math.ceil((clientRecord.resetTime - now) / 1000));
            throw new common_1.HttpException('Too many requests', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        return next.handle().pipe((0, operators_1.tap)(() => {
            // Optional: Handle successful vs failed requests differently
            if (this.options.skipSuccessfulRequests && response.statusCode < 400) {
                clientRecord.count--;
            }
        }), (0, operators_1.tap)(undefined, (error) => {
            // Optional: Handle failed requests
            if (this.options.skipFailedRequests) {
                clientRecord.count--;
            }
        }));
    }
    getClientKey(request) {
        // Use IP address as the client identifier
        // In production, you might want to use user ID or API key
        const forwarded = request.headers['x-forwarded-for'];
        const ip = forwarded
            ? forwarded.split(',')[0].trim()
            : request.connection.remoteAddress;
        return `rate_limit:${ip}`;
    }
};
exports.RateLimitInterceptor = RateLimitInterceptor;
exports.RateLimitInterceptor = RateLimitInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RateLimitInterceptor);
