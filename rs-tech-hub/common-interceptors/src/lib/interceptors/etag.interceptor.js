"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETagInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const operators_1 = require("rxjs/operators");
/**
 * ETag interceptor for adding HTTP ETag headers
 * Generates ETags for responses to enable conditional requests
 *
 * @example
 * @UseInterceptors(new ETagInterceptor({ algorithm: 'sha256', weak: true }))
 * @Get(':id')
 * async findOne(@Param('id') id: string) {
 *   return this.service.findOne(id);
 * }
 */
let ETagInterceptor = class ETagInterceptor {
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
            this.setETagHeader(request, response, data);
        }));
    }
    setETagHeader(request, response, data) {
        // Don't set ETag for non-GET requests or if already set
        if (request.method !== 'GET' || response.getHeader('ETag')) {
            return;
        }
        const etag = this.generateETag(data);
        response.setHeader('ETag', etag);
        // Check if client has matching ETag
        const clientETag = request.headers['if-none-match'];
        if (clientETag && clientETag === etag) {
            response.status(304).end();
            return;
        }
        // Set cache headers for ETag support
        const cacheControl = response.getHeader('Cache-Control');
        if (!cacheControl) {
            response.setHeader('Cache-Control', 'private, max-age=0, must-revalidate');
        }
    }
    generateETag(data) {
        const algorithm = this.options.algorithm || 'md5';
        const isWeak = this.options.weak ?? false;
        // Serialize data for hashing
        let content;
        if (typeof data === 'string') {
            content = data;
        }
        else if (Buffer.isBuffer(data)) {
            content = data.toString();
        }
        else {
            content = JSON.stringify(data);
        }
        // Generate hash
        const hash = (0, crypto_1.createHash)(algorithm).update(content).digest('hex');
        // Format as ETag
        const etag = `"${hash}"`;
        return isWeak ? `W/${etag}` : etag;
    }
};
exports.ETagInterceptor = ETagInterceptor;
exports.ETagInterceptor = ETagInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ETagInterceptor);
