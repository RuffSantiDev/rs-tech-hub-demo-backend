"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestIdInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
/**
 * Request ID interceptor for adding correlation IDs
 * Generates or uses existing request IDs for request tracing
 *
 * @example
 * @UseInterceptors(RequestIdInterceptor)
 * @Controller('users')
 * export class UsersController {}
 */
let RequestIdInterceptor = class RequestIdInterceptor {
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        // Generate or use existing request ID
        const requestId = request.headers['x-request-id'] ||
            request.headers['x-correlation-id'] ||
            this.generateId();
        request.id = requestId;
        response.setHeader('X-Request-Id', requestId);
        response.setHeader('X-Correlation-Id', requestId);
        return next.handle();
    }
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
};
exports.RequestIdInterceptor = RequestIdInterceptor;
exports.RequestIdInterceptor = RequestIdInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RequestIdInterceptor);
