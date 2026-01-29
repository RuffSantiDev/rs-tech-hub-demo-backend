"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ACTIVITY_CREATION_FAILED = exports.UNAUTHORIZED = exports.USER_ACTIVATION_KEY_INVALID = exports.USER_PASSWORD_RESET_KEY_INVALID = exports.USER_NO_PASSWORD_FOUND = exports.USER_IS_CURRENT_EMAIL = exports.USER_EMAIL_ALREADY_EXISTS = exports.USER_UPDATE_FAILED = exports.USER_EMAIL_UPDATE_FAILED = exports.USER_ROLE_UPDATE_FAILED = exports.USER_PASSWORD_UPDATE_FAILED = exports.USER_SCHEDULED_DELETION_NOT_REACHED = exports.USER_NOT_SCHEDULED_FOR_DELETION = exports.USER_REACTIVATION_FAILED = exports.USER_DISABLE_FAILED = exports.USER_DELETE_FAILED = exports.USER_SOFT_DELETE_FAILED = exports.USER_DEACTIVATION_FAILED = exports.USER_ACTIVATION_FAILED = exports.USER_NOT_SOFT_DELETED = exports.USER_STILL_ACTIVE = exports.USER_NOT_PENDING = exports.USER_NOT_INACTIVE = exports.USER_NOT_DISABLED = exports.USER_NOT_ACTIVE = exports.USER_NOT_ACTIVATED = exports.USER_ALREADY_INACTIVE = exports.USER_ALREADY_DISABLED = exports.USER_ALREADY_ACTIVATED = exports.USER_FAILED_TO_FETCH = exports.USER_ALREADY_EXISTS = exports.USER_ID_REQUIRED = exports.USER_NOT_FOUND = exports.USER_DOES_NOT_EXIST = void 0;
// ============================================================
// USER VALIDATION ERRORS - Existence & Requirements
// ============================================================
exports.USER_DOES_NOT_EXIST = 'user-error:user-does-not-exist';
exports.USER_NOT_FOUND = 'user-error:user-not-found';
exports.USER_ID_REQUIRED = 'user-error:id-required';
exports.USER_ALREADY_EXISTS = 'user-error:user-already-exists';
exports.USER_FAILED_TO_FETCH = 'user-error:failed-to-fetch-user';
// ============================================================
// USER STATUS ERRORS - State Validation
// ============================================================
exports.USER_ALREADY_ACTIVATED = 'user-error:user-already-activated';
exports.USER_ALREADY_DISABLED = 'user-error:user-already-disabled';
exports.USER_ALREADY_INACTIVE = 'user-error:user-already-inactive';
exports.USER_NOT_ACTIVATED = 'user-error:user-not-activated';
exports.USER_NOT_ACTIVE = 'user-error:user-not-active';
exports.USER_NOT_DISABLED = 'user-error:user-not-disabled';
exports.USER_NOT_INACTIVE = 'user-error:user-not-inactive';
exports.USER_NOT_PENDING = 'user-error:user-not-pending';
exports.USER_STILL_ACTIVE = 'user-error:user-still-active';
exports.USER_NOT_SOFT_DELETED = 'user-error:user-not-soft-deleted';
// ============================================================
// USER LIFECYCLE OPERATION ERRORS
// ============================================================
exports.USER_ACTIVATION_FAILED = 'user-error:activation-failed';
exports.USER_DEACTIVATION_FAILED = 'user-error:deactivation-failed';
exports.USER_SOFT_DELETE_FAILED = 'user-error:soft-delete-failed';
exports.USER_DELETE_FAILED = 'user-error:delete-failed';
exports.USER_DISABLE_FAILED = 'user-error:disable-failed';
exports.USER_REACTIVATION_FAILED = 'user-error:reactivation-failed';
exports.USER_NOT_SCHEDULED_FOR_DELETION = 'user-error:not-scheduled-for-deletion';
exports.USER_SCHEDULED_DELETION_NOT_REACHED = 'user-error:scheduled-deletion-not-reached';
// ============================================================
// USER UPDATE OPERATION ERRORS
// ============================================================
exports.USER_PASSWORD_UPDATE_FAILED = 'user-error:password-update-failed';
exports.USER_ROLE_UPDATE_FAILED = 'user-error:role-update-failed';
exports.USER_EMAIL_UPDATE_FAILED = 'user-error:email-update-failed';
exports.USER_UPDATE_FAILED = 'user-error:update-failed';
// ============================================================
// USER EMAIL ERRORS
// ============================================================
exports.USER_EMAIL_ALREADY_EXISTS = 'user-error:email-already-exists';
exports.USER_IS_CURRENT_EMAIL = 'user-error:is-current-email';
// ============================================================
// USER PASSWORD & SECURITY ERRORS
// ============================================================
exports.USER_NO_PASSWORD_FOUND = 'user-error:no-password-found';
exports.USER_PASSWORD_RESET_KEY_INVALID = 'user-error:password-reset-key-invalid';
// ============================================================
// USER ACTIVATION & KEY VALIDATION ERRORS
// ============================================================
exports.USER_ACTIVATION_KEY_INVALID = 'user-error:activation-key-invalid';
// ============================================================
// AUTHORIZATION ERRORS
// ============================================================
exports.UNAUTHORIZED = 'user-error:unauthorized';
// ============================================================
// USER ACTIVITY ERRORS
// ============================================================
exports.USER_ACTIVITY_CREATION_FAILED = 'user-activity-error:creation-failed';
