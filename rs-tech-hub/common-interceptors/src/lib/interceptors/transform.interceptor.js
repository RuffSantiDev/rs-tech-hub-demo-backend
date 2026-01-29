"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Transform interceptor for standardizing response format
 * Wraps responses in a consistent structure with metadata
 *
 * @example
 * @UseInterceptors(new TransformInterceptor({ dataKey: 'payload', metaKey: 'metadata' }))
 * @Controller('users')
 * export class UsersController {}
 */
let TransformInterceptor = class TransformInterceptor {
    options;
    constructor(options = {}) {
        this.options = options;
    }
    intercept(context, next) {
        return next
            .handle()
            .pipe((0, operators_1.map)((data) => this.transformResponse(data, context)));
    }
    transformResponse(data, context) {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        return {
            [this.options.statusKey ?? 'status']: 'success',
            [this.options.dataKey ?? 'data']: data,
            [this.options.metaKey ?? 'meta']: {
                timestamp: new Date().toISOString(),
                requestId: request.id,
                path: request.url,
                method: request.method,
                statusCode: response.statusCode,
            },
        };
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], TransformInterceptor);
