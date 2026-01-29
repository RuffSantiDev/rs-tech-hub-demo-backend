"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Compression interceptor for enabling response compression
 * Adds compression headers to enable gzip/deflate compression
 *
 * @example
 * @UseInterceptors(new CompressionInterceptor({ threshold: 1024 }))
 * @Get()
 * async getLargeData() {
 *   return this.service.getBigResponse();
 * }
 */
let CompressionInterceptor = class CompressionInterceptor {
    options;
    constructor(options = {}) {
        this.options = options;
    }
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe((0, operators_1.tap)((data) => {
            this.setupCompression(request, response, data);
        }));
    }
    setupCompression(request, response, data) {
        const acceptEncoding = request.headers['accept-encoding'] || '';
        // Check if compression should be applied
        if (!this.shouldCompress(request, response, data)) {
            return;
        }
        // Set compression headers based on client support
        if (acceptEncoding.includes('gzip')) {
            response.setHeader('Content-Encoding', 'gzip');
            response.setHeader('Vary', 'Accept-Encoding');
        }
        else if (acceptEncoding.includes('deflate')) {
            response.setHeader('Content-Encoding', 'deflate');
            response.setHeader('Vary', 'Accept-Encoding');
        }
    }
    shouldCompress(request, response, data) {
        // Apply custom filter if provided
        if (this.options.filter) {
            return this.options.filter(request, response);
        }
        // Don't compress if already compressed
        if (response.getHeader('Content-Encoding')) {
            return false;
        }
        // Check content type
        const contentType = response.getHeader('Content-Type') || '';
        const compressibleTypes = [
            'text/',
            'application/json',
            'application/javascript',
            'application/xml',
            'application/rss+xml',
            'application/atom+xml',
            'image/svg+xml',
        ];
        const isCompressibleType = compressibleTypes.some((type) => contentType.startsWith(type));
        if (!isCompressibleType) {
            return false;
        }
        // Check size threshold
        const threshold = this.options.threshold || 1024;
        const dataSize = data ? JSON.stringify(data).length : 0;
        return dataSize >= threshold;
    }
};
exports.CompressionInterceptor = CompressionInterceptor;
exports.CompressionInterceptor = CompressionInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], CompressionInterceptor);
