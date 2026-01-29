"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HateoasInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * HATEOAS interceptor for adding hypermedia links
 * Automatically adds navigation links to API responses
 *
 * @example
 * @UseInterceptors(new HateoasInterceptor({
 *   baseUrl: 'https://api.example.com',
 *   relations: {
 *     user: (data) => [
 *       { rel: 'self', href: `/users/${data.id}` },
 *       { rel: 'edit', href: `/users/${data.id}`, method: 'PUT' }
 *     ]
 *   }
 * }))
 * @Get(':id')
 * async findOne(@Param('id') id: string) {
 *   return this.service.findOne(id);
 * }
 */
let HateoasInterceptor = class HateoasInterceptor {
    options;
    constructor(options = {}) {
        this.options = options;
    }
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        return next
            .handle()
            .pipe((0, operators_1.map)((data) => this.addHateoasLinks(data, context)));
    }
    addHateoasLinks(data, context) {
        if (!data || typeof data !== 'object') {
            return data;
        }
        const request = context.switchToHttp().getRequest();
        const baseUrl = this.options.baseUrl || `${request.protocol}://${request.get('host')}`;
        if (Array.isArray(data)) {
            return data.map((item) => this.addLinksToItem(item, baseUrl, request));
        }
        return this.addLinksToItem(data, baseUrl, request);
    }
    addLinksToItem(item, baseUrl, request) {
        if (!item || typeof item !== 'object') {
            return item;
        }
        const links = [];
        // Add self link
        const currentPath = request.url;
        links.push({
            rel: 'self',
            href: `${baseUrl}${currentPath}`,
            method: request.method,
        });
        // Add custom relations if configured
        if (this.options.relations) {
            Object.entries(this.options.relations).forEach(([key, relationFn]) => {
                try {
                    const customLinks = relationFn(item);
                    links.push(...customLinks.map((link) => ({
                        ...link,
                        href: link.href.startsWith('http')
                            ? link.href
                            : `${baseUrl}${link.href}`,
                    })));
                }
                catch (error) {
                    // Silently ignore relation errors
                }
            });
        }
        // Add common CRUD links based on resource type
        if (item.id) {
            const resourcePath = this.extractResourcePath(request.url);
            links.push({
                rel: 'edit',
                href: `${baseUrl}${resourcePath}/${item.id}`,
                method: 'PUT',
            }, {
                rel: 'delete',
                href: `${baseUrl}${resourcePath}/${item.id}`,
                method: 'DELETE',
            }, {
                rel: 'collection',
                href: `${baseUrl}${resourcePath}`,
                method: 'GET',
            });
        }
        return {
            ...item,
            _links: links.reduce((acc, link) => {
                acc[link.rel] = {
                    href: link.href,
                    ...(link.method && { method: link.method }),
                    ...(link.type && { type: link.type }),
                };
                return acc;
            }, {}),
        };
    }
    extractResourcePath(url) {
        // Remove query parameters and extract base path
        const path = url.split('?')[0];
        const segments = path.split('/').filter(Boolean);
        // If last segment is an ID (numeric or UUID-like), remove it
        if (segments.length > 0) {
            const lastSegment = segments[segments.length - 1];
            if (/^\d+$/.test(lastSegment) || /^[0-9a-f-]{36}$/i.test(lastSegment)) {
                segments.pop();
            }
        }
        return '/' + segments.join('/');
    }
};
exports.HateoasInterceptor = HateoasInterceptor;
exports.HateoasInterceptor = HateoasInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], HateoasInterceptor);
