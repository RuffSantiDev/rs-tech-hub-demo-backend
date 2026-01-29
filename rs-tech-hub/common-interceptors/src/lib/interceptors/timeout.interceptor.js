"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * Timeout interceptor for enforcing request timeouts
 * Automatically cancels requests that exceed the specified timeout
 *
 * @example
 * @UseInterceptors(new TimeoutInterceptor(5000)) // 5 seconds
 * @Get()
 * async longRunningOperation() {
 *   return this.service.processLongTask();
 * }
 */
let TimeoutInterceptor = class TimeoutInterceptor {
    timeoutMs;
    constructor(timeoutMs = 30000) {
        this.timeoutMs = timeoutMs;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.timeout)(this.timeoutMs), (0, operators_1.catchError)((err) => {
            if (err instanceof rxjs_1.TimeoutError) {
                throw new common_1.RequestTimeoutException(`Request took too long to process (timeout: ${this.timeoutMs}ms)`);
            }
            throw err;
        }));
    }
};
exports.TimeoutInterceptor = TimeoutInterceptor;
exports.TimeoutInterceptor = TimeoutInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], TimeoutInterceptor);
