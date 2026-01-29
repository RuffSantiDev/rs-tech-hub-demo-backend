"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlingService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
// Create src/common/services/error-handling.service.ts
let ErrorHandlingService = class ErrorHandlingService {
    handleError(method, error) {
        const errorObj = error;
        common_1.Logger.error(`Error in ${method}: ${errorObj.message}`, errorObj.stack);
        return {
            message: errorObj.message,
            code: errorObj.code || 'UNKNOWN_ERROR',
        };
    }
};
exports.ErrorHandlingService = ErrorHandlingService;
exports.ErrorHandlingService = ErrorHandlingService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ErrorHandlingService);
