"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOperation = ServiceOperation;
const common_1 = require("@nestjs/common");
const dataSanitizer_1 = require("../helpers/dataSanitizer");
function ServiceOperation(options = {}) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const operationName = options.operationName || propertyKey;
        descriptor.value = async function (...args) {
            // Sanitize and log input
            if (options.sanitizeInput !== false && options.logInput !== false) {
                const sanitizedInput = (0, dataSanitizer_1.sanitizeData)(args[0]);
                common_1.Logger.log(`[${operationName}] Executing with input: ${JSON.stringify(sanitizedInput)}`);
            }
            try {
                // Support both sync and async methods
                const output = await Promise.resolve(originalMethod.apply(this, args));
                if (options.logOutput) {
                    const sanitizedOutput = (0, dataSanitizer_1.sanitizeData)(output);
                    common_1.Logger.log(`[${operationName}] Success: ${JSON.stringify(sanitizedOutput)}`);
                }
                return output;
            }
            catch (error) {
                // Execute error callback if provided
                if (options.errorCallback) {
                    const callbackResult = options.errorCallback();
                    if (callbackResult instanceof Promise) {
                        await callbackResult;
                    }
                }
                // Get error service injected by @WithServiceOperations() class decorator
                // Falls back to manually injected errorHandlingService if available
                const errorService = this.errorService || this.errorHandlingService;
                if (!errorService) {
                    common_1.Logger.error(`@ServiceOperation requires ErrorHandlingService. Use @WithServiceOperations() on class "${target.constructor.name}"`);
                    throw error; // Rethrow original error if no error service
                }
                const serviceError = errorService.handleError(operationName, error);
                common_1.Logger.error(`[${operationName}] Failed: ${serviceError.message}`, serviceError.code);
                throw serviceError;
            }
        };
        return descriptor;
    };
}
