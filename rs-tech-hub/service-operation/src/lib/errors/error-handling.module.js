"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlingModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const error_handling_service_1 = require("./error-handling.service");
let ErrorHandlingModule = class ErrorHandlingModule {
};
exports.ErrorHandlingModule = ErrorHandlingModule;
exports.ErrorHandlingModule = ErrorHandlingModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [error_handling_service_1.ErrorHandlingService],
        exports: [error_handling_service_1.ErrorHandlingService],
    })
], ErrorHandlingModule);
