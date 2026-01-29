"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOperationResult = ServiceOperationResult;
const common_1 = require("@nestjs/common");
const service_result_1 = require("../facilitator/classes/service.result");
const dataSanitizer_1 = require("../helpers/dataSanitizer");
/**
 * Decorator that wraps method execution in ServiceResult.
 * Returns ServiceResult instead of throwing errors.
 *
 * Use this when you want to handle errors programmatically
 * instead of catching exceptions.
 *
 * @example
 * @Injectable()
 * @WithServiceOperations()
 * export class UserService {
 *   @ServiceOperationResult()
 *   async createUser(input: CreateUserInput): Promise<ServiceResult<CreateUserInput, User>> {
 *     return this.prisma.user.create({ data: input });
 *   }
 * }
 *
 * // Usage:
 * const result = await userService.createUser(input);
 * if (result.status === ServiceStatus.COMPLETED) {
 *   return result.output;
 * } else {
 *   handleError(result.error);
 * }
 */
function ServiceOperationResult(options = {}) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const operationName = options.operationName || propertyKey;
        descriptor.value = async function (...args) {
            const result = new service_result_1.ServiceResult(operationName, args[0]);
            // Sanitize and log input
            if (options.sanitizeInput !== false) {
                const sanitizedInput = (0, dataSanitizer_1.sanitizeData)(args[0]);
                common_1.Logger.log(`[${operationName}] Executing with input: ${JSON.stringify(sanitizedInput)}`);
            }
            try {
                // Support both sync and async methods
                const output = await Promise.resolve(originalMethod.apply(this, args));
                result.success(output);
                return result;
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
                    common_1.Logger.error(`@ServiceOperationResult requires ErrorHandlingService. Use @WithServiceOperations() on class "${target.constructor.name}"`);
                    // Still return a result with the original error
                    result.failure({
                        message: error instanceof Error ? error.message : String(error),
                        code: 'UNKNOWN_ERROR',
                    });
                    return result;
                }
                const serviceError = errorService.handleError(operationName, error);
                result.failure(serviceError);
                return result;
            }
        };
        return descriptor;
    };
}
