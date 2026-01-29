"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseLimitInterceptor = exports.createLicenseProtectedProvider = exports.LicenseValidatorModule = exports.LicenseValidatorService = void 0;
// Core Service
var license_validator_service_1 = require("./lib/license-validator.service");
Object.defineProperty(exports, "LicenseValidatorService", { enumerable: true, get: function () { return license_validator_service_1.LicenseValidatorService; } });
// Module
var license_validator_module_1 = require("./lib/license-validator.module");
Object.defineProperty(exports, "LicenseValidatorModule", { enumerable: true, get: function () { return license_validator_module_1.LicenseValidatorModule; } });
var license_protected_provider_factory_1 = require("./lib/services/license-protected-provider.factory");
Object.defineProperty(exports, "createLicenseProtectedProvider", { enumerable: true, get: function () { return license_protected_provider_factory_1.createLicenseProtectedProvider; } });
var license_limit_interceptor_1 = require("./lib/interceptors/license-limit.interceptor");
Object.defineProperty(exports, "LicenseLimitInterceptor", { enumerable: true, get: function () { return license_limit_interceptor_1.LicenseLimitInterceptor; } });
