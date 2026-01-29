"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailResolverOutput = exports.UpdatePasswordResolverOutput = exports.VerifyEmailResolverInput = exports.UpdatePasswordResolverInput = exports.RefreshTokenModel = exports.RolesGuard = exports.Roles = exports.AuthStarterService = exports.AuthStarterResolver = exports.AuthStarterModule = void 0;
const tslib_1 = require("tslib");
// Main Module
var auth_starter_module_1 = require("./lib/auth-starter.module");
Object.defineProperty(exports, "AuthStarterModule", { enumerable: true, get: function () { return auth_starter_module_1.AuthStarterModule; } });
// Resolvers
var auth_starter_resolver_1 = require("./lib/auth-starter.resolver");
Object.defineProperty(exports, "AuthStarterResolver", { enumerable: true, get: function () { return auth_starter_resolver_1.AuthStarterResolver; } });
// Services
var auth_starter_service_1 = require("./lib/auth-starter.service");
Object.defineProperty(exports, "AuthStarterService", { enumerable: true, get: function () { return auth_starter_service_1.AuthStarterService; } });
var roles_guard_1 = require("./lib/guards/roles.guard");
Object.defineProperty(exports, "Roles", { enumerable: true, get: function () { return roles_guard_1.Roles; } });
Object.defineProperty(exports, "RolesGuard", { enumerable: true, get: function () { return roles_guard_1.RolesGuard; } });
// Models
var nestjs_refresh_token_1 = require("@rs-tech-hub/nestjs-refresh-token");
Object.defineProperty(exports, "RefreshTokenModel", { enumerable: true, get: function () { return nestjs_refresh_token_1.RefreshTokenModel; } });
// DTOs - Service Inputs and Outputs
tslib_1.__exportStar(require("./lib/dto/service/input/index"), exports);
tslib_1.__exportStar(require("./lib/dto/service/output/index"), exports);
// DTOs - Resolver Inputs
var updatePassword_resolver_input_1 = require("./lib/dto/resolver/input/updatePassword.resolver.input");
Object.defineProperty(exports, "UpdatePasswordResolverInput", { enumerable: true, get: function () { return updatePassword_resolver_input_1.UpdatePasswordResolverInput; } });
var verifyEmail_resolver_input_1 = require("./lib/dto/resolver/input/verifyEmail.resolver.input");
Object.defineProperty(exports, "VerifyEmailResolverInput", { enumerable: true, get: function () { return verifyEmail_resolver_input_1.VerifyEmailResolverInput; } });
// DTOs - Resolver Outputs
var updatePassword_resolver_output_1 = require("./lib/dto/resolver/output/updatePassword.resolver.output");
Object.defineProperty(exports, "UpdatePasswordResolverOutput", { enumerable: true, get: function () { return updatePassword_resolver_output_1.UpdatePasswordResolverOutput; } });
var verifyEmail_resolver_output_1 = require("./lib/dto/resolver/output/verifyEmail.resolver.output");
Object.defineProperty(exports, "VerifyEmailResolverOutput", { enumerable: true, get: function () { return verifyEmail_resolver_output_1.VerifyEmailResolverOutput; } });
// Auth Core related exports
tslib_1.__exportStar(require("@rs-tech-hub/nestjs-auth-core"), exports);
