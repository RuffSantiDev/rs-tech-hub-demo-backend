"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheHeadersInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Cache headers interceptor for adding HTTP cache headers
 * Configures browser and proxy caching behavior
 *
 * @example
 * @UseInterceptors(new CacheHeadersInterceptor({ maxAge: 3600, public: true }))
 * @Get()
 * async findAll() {
 *   return this.service.findAll();
 * }
 */
let CacheHeadersInterceptor = class CacheHeadersInterceptor {
    options;
    constructor(options = {}) {
        this.options = options;
    }
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, operators_1.tap)(() => {
            this.setCacheHeaders(response);
        }));
    }
    setCacheHeaders(response) {
        const directives = [];
        if (this.options.noCache) {
            directives.push('no-cache');
        }
        if (this.options.noStore) {
            directives.push('no-store');
        }
        if (this.options.mustRevalidate) {
            directives.push('must-revalidate');
        }
        if (this.options.public) {
            directives.push('public');
        }
        if (this.options.private) {
            directives.push('private');
        }
        if (this.options.immutable) {
            directives.push('immutable');
        }
        if (this.options.maxAge !== undefined) {
            directives.push(`max-age=${this.options.maxAge}`);
        }
        if (this.options.sMaxAge !== undefined) {
            directives.push(`s-maxage=${this.options.sMaxAge}`);
        }
        if (directives.length > 0) {
            response.setHeader('Cache-Control', directives.join(', '));
        }
        // Set default cache headers if no options provided
        if (Object.keys(this.options).length === 0) {
            response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            response.setHeader('Pragma', 'no-cache');
            response.setHeader('Expires', '0');
        }
    }
};
exports.CacheHeadersInterceptor = CacheHeadersInterceptor;
exports.CacheHeadersInterceptor = CacheHeadersInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], CacheHeadersInterceptor);
