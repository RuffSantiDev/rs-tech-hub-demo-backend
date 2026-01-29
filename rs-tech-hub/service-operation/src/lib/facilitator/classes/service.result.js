"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResult = void 0;
const serviceStatus_enum_1 = require("./serviceStatus.enum");
class ServiceResult {
    name;
    input;
    status;
    output;
    error;
    constructor(name, input) {
        this.name = name;
        this.status = serviceStatus_enum_1.ServiceStatus.PENDING;
        this.input = input;
    }
    success(output) {
        this.status = serviceStatus_enum_1.ServiceStatus.COMPLETED;
        this.output = output;
    }
    failure(error) {
        this.status = serviceStatus_enum_1.ServiceStatus.FAILED;
        this.error = error;
    }
    extractOrThrow(errorMessage) {
        if (this.status !== serviceStatus_enum_1.ServiceStatus.COMPLETED ||
            this.output === undefined ||
            this.output === null) {
            throw new Error(errorMessage || this.error?.message || `Operation '${this.name}' failed`);
        }
        return this.output;
    }
}
exports.ServiceResult = ServiceResult;
