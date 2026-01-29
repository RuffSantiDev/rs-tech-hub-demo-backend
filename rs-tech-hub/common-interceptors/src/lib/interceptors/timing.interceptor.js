"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimingInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Timing interceptor for adding response time headers
 * Measures request processing time and adds X-Response-Time header
 *
 * @example
 * @UseInterceptors(TimingInterceptor)
 * @Controller('users')
 * export class UsersController {}
 */
let TimingInterceptor = class TimingInterceptor {
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const now = Date.now();
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, operators_1.tap)(() => {
            const duration = Date.now() - now;
            response.setHeader('X-Response-Time', `${duration}ms`);
        }));
    }
};
exports.TimingInterceptor = TimingInterceptor;
exports.TimingInterceptor = TimingInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], TimingInterceptor);
