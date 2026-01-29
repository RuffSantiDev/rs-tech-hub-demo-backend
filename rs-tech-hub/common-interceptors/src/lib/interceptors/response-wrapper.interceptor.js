"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWrapperInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Response wrapper interceptor for standardized API responses
 * Wraps all responses in a consistent envelope format
 *
 * @example
 * @UseInterceptors(ResponseWrapperInterceptor)
 * @Controller('users')
 * export class UsersController {}
 */
let ResponseWrapperInterceptor = class ResponseWrapperInterceptor {
    intercept(context, next) {
        if (context.getType() !== 'http') {
            common_1.Logger.debug('ResponseWrapperInterceptor: Non-HTTP context, skipping response wrapping.', 'ResponseWrapperInterceptor');
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        return next.handle().pipe((0, operators_1.map)((data) => ({
            success: true,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                requestId: request.id || 'unknown',
                version: '1.0.0',
            },
        })));
    }
};
exports.ResponseWrapperInterceptor = ResponseWrapperInterceptor;
exports.ResponseWrapperInterceptor = ResponseWrapperInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ResponseWrapperInterceptor);
