"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensitiveDataFilterInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Sensitive data filter interceptor for removing sensitive information
 * Automatically filters out specified fields from response data
 *
 * @example
 * @UseInterceptors(new SensitiveDataFilterInterceptor({
 *   fields: ['password', 'ssn', 'creditCard'],
 *   replacement: '[REDACTED]'
 * }))
 * @Get()
 * async findAll() {
 *   return this.service.findAll();
 * }
 */
let SensitiveDataFilterInterceptor = class SensitiveDataFilterInterceptor {
    options;
    defaultSensitiveFields = [
        'password',
        'passwd',
        'secret',
        'token',
        'apiKey',
        'api_key',
        'accessToken',
        'access_token',
        'refreshToken',
        'refresh_token',
        'ssn',
        'socialSecurityNumber',
        'creditCard',
        'credit_card',
        'cardNumber',
        'card_number',
        'cvv',
        'cvv2',
        'pin',
        'privateKey',
        'private_key',
    ];
    constructor(options = {}) {
        this.options = options;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => this.filterSensitiveData(data)));
    }
    filterSensitiveData(data) {
        if (data === null || data === undefined) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((item) => this.filterSensitiveData(item));
        }
        if (typeof data !== 'object') {
            return data;
        }
        const filtered = { ...data };
        const fieldsToFilter = [
            ...this.defaultSensitiveFields,
            ...(this.options.fields || []),
        ];
        const replacement = this.options.replacement || '[REDACTED]';
        // Filter by field names
        fieldsToFilter.forEach((field) => {
            if (this.options.deep) {
                this.filterFieldDeep(filtered, field, replacement);
            }
            else {
                if (Object.prototype.hasOwnProperty.call(filtered, field)) {
                    filtered[field] = replacement;
                }
            }
        });
        // Filter by patterns
        if (this.options.patterns) {
            this.filterByPatterns(filtered, this.options.patterns, replacement);
        }
        // Recursively filter nested objects if deep filtering is enabled
        if (this.options.deep) {
            Object.keys(filtered).forEach((key) => {
                if (typeof filtered[key] === 'object' && filtered[key] !== null) {
                    filtered[key] = this.filterSensitiveData(filtered[key]);
                }
            });
        }
        return filtered;
    }
    filterFieldDeep(obj, fieldName, replacement) {
        if (!obj || typeof obj !== 'object') {
            return;
        }
        Object.keys(obj).forEach((key) => {
            if (key.toLowerCase().includes(fieldName.toLowerCase())) {
                obj[key] = replacement;
            }
            else if (typeof obj[key] === 'object' && obj[key] !== null) {
                this.filterFieldDeep(obj[key], fieldName, replacement);
            }
        });
    }
    filterByPatterns(obj, patterns, replacement) {
        if (!obj || typeof obj !== 'object') {
            return;
        }
        Object.keys(obj).forEach((key) => {
            if (patterns.some((pattern) => pattern.test(key))) {
                obj[key] = replacement;
            }
            else if (typeof obj[key] === 'object' && obj[key] !== null) {
                this.filterByPatterns(obj[key], patterns, replacement);
            }
        });
    }
};
exports.SensitiveDataFilterInterceptor = SensitiveDataFilterInterceptor;
exports.SensitiveDataFilterInterceptor = SensitiveDataFilterInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], SensitiveDataFilterInterceptor);
