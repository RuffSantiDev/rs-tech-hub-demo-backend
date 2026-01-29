"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStatusLegacy = exports.ServiceStatus = void 0;
var ServiceStatus;
(function (ServiceStatus) {
    ServiceStatus["PENDING"] = "PENDING";
    ServiceStatus["COMPLETED"] = "COMPLETED";
    ServiceStatus["FAILED"] = "FAILED";
    ServiceStatus["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    ServiceStatus["NOT_FOUND"] = "NOT_FOUND";
    ServiceStatus["UNAUTHORIZED"] = "UNAUTHORIZED";
    ServiceStatus["FORBIDDEN"] = "FORBIDDEN";
    ServiceStatus["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ServiceStatus["ERROR"] = "ERROR";
})(ServiceStatus || (exports.ServiceStatus = ServiceStatus = {}));
// Add backwards compatibility
exports.ServiceStatusLegacy = {
    SUCCESS: ServiceStatus.COMPLETED,
    FAILURE: ServiceStatus.FAILED,
    ERROR: ServiceStatus.FAILED,
};
