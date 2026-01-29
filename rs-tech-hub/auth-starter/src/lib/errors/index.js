"use strict";
// ============================================================================
// Authentication Error Constants
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ERROR_CONFIRM_SIGNUP_EMAIL_FAILED = exports.AUTH_ERROR_GENERATE_RESPONSE_FAILED = exports.AUTH_ERROR_UPDATE_PASSWORD_FAILED = exports.AUTH_ERROR_GET_CURRENT_USER_FAILED = exports.AUTH_ERROR_SIGNUP_FAILED = exports.AUTH_ERROR_LOGOUT_FAILED = exports.AUTH_ERROR_LOGIN_FAILED = exports.AUTH_ERROR_REFRESH_TOKEN_FAILED = exports.AUTH_ERROR_INSUFFICIENT_PERMISSIONS = exports.AUTH_ERROR_ACCESS_DENIED = exports.AUTH_ERROR_ACTIVATION_FAILED = exports.AUTH_ERROR_PROFILE_CREATE_FAILED = exports.AUTH_ERROR_USER_CREATE_FAILED = exports.AUTH_ERROR_ACCOUNT_CREATE_FAILED = exports.AUTH_ERROR_BASIC_INVALID_CREDENTIALS = exports.AUTH_ERROR_BASIC_HEADER_NOT_PROVIDED = exports.AUTH_ERROR_SERVICE_INVALID_TOKEN = exports.AUTH_ERROR_SERVICE_NOT_CONFIGURED = exports.AUTH_ERROR_USER_ALREADY_ACTIVE = exports.AUTH_ERROR_USER_ALREADY_VERIFIED = exports.AUTH_ERROR_USER_ID_REQUIRED = exports.AUTH_ERROR_USER_EMAIL_REQUIRED = exports.AUTH_ERROR_USER_NOT_AUTHENTICATED = exports.AUTH_ERROR_USER_NOT_FOUND_OR_INACTIVE = exports.AUTH_ERROR_USER_INACTIVE = exports.AUTH_ERROR_USER_NOT_FOUND = exports.AUTH_ERROR_PASSWORD_RESET_TOKEN_INVALID = exports.AUTH_ERROR_PASSWORD_RESET_TOKEN_EXPIRED = exports.AUTH_ERROR_PASSWORD_RESET_REQUEST_FAILED = exports.AUTH_ERROR_TOKEN_ID_REQUIRED = exports.AUTH_ERROR_INVALID_TOKEN_PAYLOAD = exports.AUTH_ERROR_EMAIL_VERIFICATION_FAILED = exports.AUTH_ERROR_EXPIRED_TOKEN = exports.AUTH_ERROR_INVALID_ACTIVATION_TOKEN = exports.AUTH_ERROR_INVALID_TOKEN = exports.AUTH_ERROR_NO_TOKEN = exports.AUTH_ERROR_INVALID_CREDENTIALS = void 0;
// Authentication Errors
exports.AUTH_ERROR_INVALID_CREDENTIALS = 'auth-error:invalid-credentials';
exports.AUTH_ERROR_NO_TOKEN = 'auth-error:no-token-provided';
exports.AUTH_ERROR_INVALID_TOKEN = 'auth-error:invalid-token';
exports.AUTH_ERROR_INVALID_ACTIVATION_TOKEN = 'auth-error:invalid-activation-token';
exports.AUTH_ERROR_EXPIRED_TOKEN = 'auth-error:expired-token';
exports.AUTH_ERROR_EMAIL_VERIFICATION_FAILED = 'auth-error:email-verification-failed';
// Token Validation Errors
exports.AUTH_ERROR_INVALID_TOKEN_PAYLOAD = 'auth-error:invalid-token-payload';
exports.AUTH_ERROR_TOKEN_ID_REQUIRED = 'auth-error:token-id-required';
// ...existing code...
// Password Reset Errors
exports.AUTH_ERROR_PASSWORD_RESET_REQUEST_FAILED = 'auth-error:password-reset-request-failed';
exports.AUTH_ERROR_PASSWORD_RESET_TOKEN_EXPIRED = 'auth-error:password-reset-token-expired';
exports.AUTH_ERROR_PASSWORD_RESET_TOKEN_INVALID = 'auth-error:password-reset-token-invalid';
// User Authentication Errors
exports.AUTH_ERROR_USER_NOT_FOUND = 'auth-error:user-not-found';
exports.AUTH_ERROR_USER_INACTIVE = 'auth-error:user-inactive';
exports.AUTH_ERROR_USER_NOT_FOUND_OR_INACTIVE = 'auth-error:user-not-found-or-inactive';
exports.AUTH_ERROR_USER_NOT_AUTHENTICATED = 'auth-error:user-not-authenticated';
exports.AUTH_ERROR_USER_EMAIL_REQUIRED = 'auth-error:user-email-required';
exports.AUTH_ERROR_USER_ID_REQUIRED = 'auth-error:user-id-required';
exports.AUTH_ERROR_USER_ALREADY_VERIFIED = 'auth-error:user-already-verified';
exports.AUTH_ERROR_USER_ALREADY_ACTIVE = 'auth-error:user-already-active';
// Service Authentication Errors
exports.AUTH_ERROR_SERVICE_NOT_CONFIGURED = 'auth-error:service-not-configured';
exports.AUTH_ERROR_SERVICE_INVALID_TOKEN = 'auth-error:service-invalid-token';
// Basic Authentication Errors
exports.AUTH_ERROR_BASIC_HEADER_NOT_PROVIDED = 'auth-error:basic-header-not-provided';
exports.AUTH_ERROR_BASIC_INVALID_CREDENTIALS = 'auth-error:basic-invalid-credentials';
// Account & User Creation Errors
exports.AUTH_ERROR_ACCOUNT_CREATE_FAILED = 'auth-error:account-create-failed';
exports.AUTH_ERROR_USER_CREATE_FAILED = 'auth-error:user-create-failed';
exports.AUTH_ERROR_PROFILE_CREATE_FAILED = 'auth-error:profile-create-failed';
// Activation Errors
exports.AUTH_ERROR_ACTIVATION_FAILED = 'auth-error:activation-failed';
// Authorization Errors
exports.AUTH_ERROR_ACCESS_DENIED = 'auth-error:access-denied';
exports.AUTH_ERROR_INSUFFICIENT_PERMISSIONS = 'auth-error:insufficient-permissions';
// Operation Errors
exports.AUTH_ERROR_REFRESH_TOKEN_FAILED = 'auth-error:refresh-token-failed';
exports.AUTH_ERROR_LOGIN_FAILED = 'auth-error:login-failed';
exports.AUTH_ERROR_LOGOUT_FAILED = 'auth-error:logout-failed';
exports.AUTH_ERROR_SIGNUP_FAILED = 'auth-error:signup-failed';
exports.AUTH_ERROR_GET_CURRENT_USER_FAILED = 'auth-error:get-current-user-failed';
exports.AUTH_ERROR_UPDATE_PASSWORD_FAILED = 'auth-error:update-password-failed';
exports.AUTH_ERROR_GENERATE_RESPONSE_FAILED = 'auth-error:generate-response-failed';
exports.AUTH_ERROR_CONFIRM_SIGNUP_EMAIL_FAILED = 'auth-error:confirm-signup-email-failed';
