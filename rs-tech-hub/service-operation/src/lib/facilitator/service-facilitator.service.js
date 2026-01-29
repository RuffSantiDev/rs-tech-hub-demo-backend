"use strict";
var ServiceFacilitatorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceFacilitatorService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const error_handling_service_1 = require("../errors/error-handling.service");
const dataSanitizer_1 = require("../helpers/dataSanitizer");
const service_result_1 = require("./classes/service.result");
let ServiceFacilitatorService = ServiceFacilitatorService_1 = class ServiceFacilitatorService {
    errorService;
    constructor(errorService) {
        this.errorService = errorService || new error_handling_service_1.ErrorHandlingService();
    }
    logger = new common_1.Logger(ServiceFacilitatorService_1.name);
    // This service is responsible for facilitating the execution of service operations.
    async executeServiceOperation(operationName, operation, input, errorCallback) {
        const result = new service_result_1.ServiceResult(operationName, input);
        if (!input) {
            this.logger.log(`Executing service operation '${operationName}' with no input.`);
        }
        else {
            const sanitizedInput = this.sanitizer(input);
            this.logger.log(`Executing service operation '${operationName}' with sanitized input: ${JSON.stringify(sanitizedInput)}`);
        }
        try {
            const operationResult = operation();
            const data = operationResult instanceof Promise
                ? await operationResult
                : operationResult;
            result.success(data);
            const sanitizedOutput = this.sanitizer(data);
            this.logger.log(`Service '${operationName}' completed successfully with sanitized output: ${JSON.stringify(sanitizedOutput)}`);
        }
        catch (e) {
            if (errorCallback) {
                const callbackResult = errorCallback();
                if (callbackResult instanceof Promise) {
                    await callbackResult;
                }
            }
            const error = this.errorService.handleError(operationName, e);
            result.failure(error);
            this.logger.error(`Service '${operationName}' failed with result: ${JSON.stringify(result)}`);
        }
        return result;
    }
    async executeHiddenOperation(operationName, operation, input, errorCallback) {
        const result = new service_result_1.ServiceResult(operationName, input);
        try {
            const operationResult = operation();
            const data = operationResult instanceof Promise
                ? await operationResult
                : operationResult;
            result.success(data);
        }
        catch (e) {
            if (errorCallback) {
                const callbackResult = errorCallback();
                if (callbackResult instanceof Promise) {
                    await callbackResult;
                }
            }
            const error = this.errorService.handleError(operationName, e);
            result.failure(error);
            this.logger.error(`Service '${operationName}' failed with result: ${JSON.stringify(result)}`);
        }
        return result.extractOrThrow();
    }
    handleError(method, error) {
        return this.errorService.handleError(method, error);
    }
    sanitizer(data) {
        return (0, dataSanitizer_1.sanitizeData)(data);
    }
    async executeAndExtract(operationName, operation, input, errorMessage, errorCallback) {
        const result = await this.executeServiceOperation(operationName, operation, input, errorCallback);
        return result.extractOrThrow(errorMessage);
    }
};
exports.ServiceFacilitatorService = ServiceFacilitatorService;
exports.ServiceFacilitatorService = ServiceFacilitatorService = ServiceFacilitatorService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [error_handling_service_1.ErrorHandlingService])
], ServiceFacilitatorService);
