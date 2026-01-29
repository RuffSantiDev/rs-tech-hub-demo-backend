"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestFromContext = exports.extractTokenFromHeader = exports.extractRefreshToken = exports.Public = exports.IS_PUBLIC_KEY = exports.PassportGlobalModule = exports.JwtGlobalModule = exports.JwtStrategy = exports.JwtRefreshStrategy = exports.ServiceAuthGuard = exports.JwtRefreshGuard = exports.GqlAuthGuard = exports.BasicAuthGuard = exports.AuthGuard = exports.RefreshToken = exports.CurrentUser = exports.CurrentUserId = void 0;
const tslib_1 = require("tslib");
// ============================================================================
// Decorators
// ============================================================================
var current_user_id_decorator_1 = require("./lib/decorators/current-user-id.decorator");
Object.defineProperty(exports, "CurrentUserId", { enumerable: true, get: function () { return current_user_id_decorator_1.CurrentUserId; } });
var current_user_decorator_1 = require("./lib/decorators/current-user.decorator");
Object.defineProperty(exports, "CurrentUser", { enumerable: true, get: function () { return current_user_decorator_1.CurrentUser; } });
var refresh_token_decorator_1 = require("./lib/decorators/refresh-token.decorator");
Object.defineProperty(exports, "RefreshToken", { enumerable: true, get: function () { return refresh_token_decorator_1.RefreshToken; } });
// ============================================================================
// Guards
// ============================================================================
var auth_guard_1 = require("./lib/guards/auth.guard");
Object.defineProperty(exports, "AuthGuard", { enumerable: true, get: function () { return auth_guard_1.AuthGuard; } });
var basic_auth_guard_1 = require("./lib/guards/basic-auth.guard");
Object.defineProperty(exports, "BasicAuthGuard", { enumerable: true, get: function () { return basic_auth_guard_1.BasicAuthGuard; } });
var gql_auth_guard_1 = require("./lib/guards/gql-auth.guard");
Object.defineProperty(exports, "GqlAuthGuard", { enumerable: true, get: function () { return gql_auth_guard_1.GqlAuthGuard; } });
var jwt_refresh_guard_1 = require("./lib/guards/jwt-refresh.guard");
Object.defineProperty(exports, "JwtRefreshGuard", { enumerable: true, get: function () { return jwt_refresh_guard_1.JwtRefreshGuard; } });
var service_auth_guard_1 = require("./lib/guards/service-auth.guard");
Object.defineProperty(exports, "ServiceAuthGuard", { enumerable: true, get: function () { return service_auth_guard_1.ServiceAuthGuard; } });
// ============================================================================
// Strategies
// ============================================================================
var jwt_refresh_strategy_1 = require("./lib/strategies/jwt-refresh.strategy");
Object.defineProperty(exports, "JwtRefreshStrategy", { enumerable: true, get: function () { return jwt_refresh_strategy_1.JwtRefreshStrategy; } });
var jwt_strategy_1 = require("./lib/strategies/jwt.strategy");
Object.defineProperty(exports, "JwtStrategy", { enumerable: true, get: function () { return jwt_strategy_1.JwtStrategy; } });
// ============================================================================
// Global Modules
// ============================================================================
var jwt_global_module_1 = require("./lib/global/jwt-global.module");
Object.defineProperty(exports, "JwtGlobalModule", { enumerable: true, get: function () { return jwt_global_module_1.JwtGlobalModule; } });
var passport_global_module_1 = require("./lib/global/passport-global.module");
Object.defineProperty(exports, "PassportGlobalModule", { enumerable: true, get: function () { return passport_global_module_1.PassportGlobalModule; } });
// ============================================================================
// Reflectors & Decorators
// ============================================================================
var isPublic_reflector_1 = require("./lib/reflectors/isPublic.reflector");
Object.defineProperty(exports, "IS_PUBLIC_KEY", { enumerable: true, get: function () { return isPublic_reflector_1.IS_PUBLIC_KEY; } });
Object.defineProperty(exports, "Public", { enumerable: true, get: function () { return isPublic_reflector_1.Public; } });
// ============================================================================
// Utilities
// ============================================================================
var context_utils_1 = require("./lib/utils/context.utils");
Object.defineProperty(exports, "extractRefreshToken", { enumerable: true, get: function () { return context_utils_1.extractRefreshToken; } });
Object.defineProperty(exports, "extractTokenFromHeader", { enumerable: true, get: function () { return context_utils_1.extractTokenFromHeader; } });
Object.defineProperty(exports, "getRequestFromContext", { enumerable: true, get: function () { return context_utils_1.getRequestFromContext; } });
// ============================================================================
// Errors
// ============================================================================
tslib_1.__exportStar(require("./lib/errors"), exports);
