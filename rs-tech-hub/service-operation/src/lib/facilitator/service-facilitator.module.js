"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceFacilitatorModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const error_handling_module_1 = require("../errors/error-handling.module");
const service_facilitator_service_1 = require("./service-facilitator.service");
let ServiceFacilitatorModule = class ServiceFacilitatorModule {
};
exports.ServiceFacilitatorModule = ServiceFacilitatorModule;
exports.ServiceFacilitatorModule = ServiceFacilitatorModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [error_handling_module_1.ErrorHandlingModule],
        providers: [service_facilitator_service_1.ServiceFacilitatorService],
        exports: [service_facilitator_service_1.ServiceFacilitatorService],
    })
], ServiceFacilitatorModule);
