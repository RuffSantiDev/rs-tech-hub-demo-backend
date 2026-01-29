"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityHeadersInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Security headers interceptor for adding security-related HTTP headers
 * Helps protect against common web vulnerabilities
 *
 * @example
 * @UseInterceptors(new SecurityHeadersInterceptor({
 *   contentSecurityPolicy: "default-src 'self'",
 *   xFrameOptions: 'DENY'
 * }))
 * @Controller('users')
 * export class UsersController {}
 */
let SecurityHeadersInterceptor = class SecurityHeadersInterceptor {
    options;
    constructor(options = {}) {
        this.options = options;
    }
    intercept(context, next) {
        if (context.getType() !== 'http') {
            common_1.Logger.debug('SecurityHeadersInterceptor: Non-HTTP context, skipping header setting.', 'SecurityHeadersInterceptor');
            return next.handle();
        }
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, operators_1.tap)(() => {
            this.setSecurityHeaders(response);
        }));
    }
    setSecurityHeaders(response) {
        // Content Security Policy
        if (this.options.contentSecurityPolicy) {
            response.setHeader('Content-Security-Policy', this.options.contentSecurityPolicy);
        }
        // X-Content-Type-Options
        if (this.options.xContentTypeOptions !== false) {
            response.setHeader('X-Content-Type-Options', 'nosniff');
        }
        // X-Frame-Options
        const frameOptions = this.options.xFrameOptions || 'DENY';
        response.setHeader('X-Frame-Options', frameOptions);
        // X-XSS-Protection
        if (this.options.xXssProtection !== false) {
            response.setHeader('X-XSS-Protection', '1; mode=block');
        }
        // Referrer-Policy
        const referrerPolicy = this.options.referrerPolicy || 'strict-origin-when-cross-origin';
        response.setHeader('Referrer-Policy', referrerPolicy);
        // Strict-Transport-Security
        if (this.options.strictTransportSecurity) {
            response.setHeader('Strict-Transport-Security', this.options.strictTransportSecurity);
        }
        // Additional security headers
        response.setHeader('X-Powered-By', ''); // Remove X-Powered-By header
        response.setHeader('X-Download-Options', 'noopen');
        response.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    }
};
exports.SecurityHeadersInterceptor = SecurityHeadersInterceptor;
exports.SecurityHeadersInterceptor = SecurityHeadersInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], SecurityHeadersInterceptor);
