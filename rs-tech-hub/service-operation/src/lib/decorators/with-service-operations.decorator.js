"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithServiceOperations = WithServiceOperations;
const common_1 = require("@nestjs/common");
const error_handling_service_1 = require("../errors/error-handling.service");
/**
 * Class decorator that ensures ErrorHandlingService is available
 * for all @ServiceOperation decorated methods.
 *
 * This decorator properly injects ErrorHandlingService as a class property
 * that can be accessed by method decorators.
 *
 * @example
 * @Injectable()
 * @WithServiceOperations()
 * export class UserService {
 *   @ServiceOperation()
 *   async createUser(input: CreateUserInput) {
 *     return this.prisma.user.create({ data: input });
 *   }
 * }
 */
function WithServiceOperations() {
    return function (constructor) {
        // Create a new constructor that extends the original
        const enhancedConstructor = class extends constructor {
            constructor(...args) {
                super(...args);
            }
        };
        // Apply property injection for ErrorHandlingService
        (0, common_1.Inject)(error_handling_service_1.ErrorHandlingService)(enhancedConstructor.prototype, 'errorService');
        // Preserve the original constructor name
        Object.defineProperty(enhancedConstructor, 'name', {
            value: constructor.name,
            writable: false,
        });
        return enhancedConstructor;
    };
}
