"use strict";
var PrismaExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/client/client");
/**
 * Filter for handling Prisma database exceptions
 * Converts Prisma error codes to user-friendly HTTP responses
 *
 * @example
 * @UseFilters(PrismaExceptionFilter)
 * @Controller('users')
 * export class UsersController {}
 */
let PrismaExceptionFilter = PrismaExceptionFilter_1 = class PrismaExceptionFilter {
    logger = new common_1.Logger(PrismaExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Database error';
        let code;
        let meta;
        if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            ({ status, message } = this.handleKnownRequestError(exception));
            code = exception.code;
            meta = exception.meta;
        }
        else if (exception instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
            message = 'Unknown database error occurred';
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else if (exception instanceof client_1.Prisma.PrismaClientRustPanicError) {
            message = 'Database engine error';
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else if (exception instanceof client_1.Prisma.PrismaClientInitializationError) {
            message = 'Database connection error';
            status = common_1.HttpStatus.SERVICE_UNAVAILABLE;
        }
        else if (exception instanceof client_1.Prisma.PrismaClientValidationError) {
            message = 'Database query validation error';
            status = common_1.HttpStatus.BAD_REQUEST;
        }
        const errorResponse = {
            statusCode: status,
            message,
            error: 'Database Error',
            timestamp: new Date().toISOString(),
            path: request.url,
            requestId: request.id,
            code,
            meta: this.sanitizeMeta(meta),
        };
        // Add stack trace in development
        if (process.env.NODE_ENV === 'development') {
            errorResponse.stack = exception.stack;
        }
        // Log the error
        this.logger.error({
            message: `Prisma Exception: ${message}`,
            code,
            meta,
            path: request.url,
            method: request.method,
            requestId: request.id,
            stack: exception.stack,
        });
        response.status(status).json(errorResponse);
    }
    handleKnownRequestError(exception) {
        switch (exception.code) {
            case 'P2002':
                // Unique constraint violation
                return {
                    status: common_1.HttpStatus.CONFLICT,
                    message: this.formatUniqueConstraintMessage(exception),
                };
            case 'P2025':
                // Record not found
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Record not found',
                };
            case 'P2003':
                // Foreign key constraint violation
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Invalid reference to related record',
                };
            case 'P2014':
                // Required relation violation
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Required relation missing',
                };
            case 'P2021':
                // Table does not exist
                return {
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Database schema error',
                };
            case 'P2022':
                // Column does not exist
                return {
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Database schema error',
                };
            case 'P2023':
                // Inconsistent column data
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Invalid data format',
                };
            case 'P2024':
                // Connection timeout
                return {
                    status: common_1.HttpStatus.REQUEST_TIMEOUT,
                    message: 'Database connection timeout',
                };
            case 'P2034':
                // Transaction conflict
                return {
                    status: common_1.HttpStatus.CONFLICT,
                    message: 'Transaction conflict, please retry',
                };
            default:
                return {
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: exception.message || 'Database operation failed',
                };
        }
    }
    formatUniqueConstraintMessage(exception) {
        const target = exception.meta?.target;
        if (Array.isArray(target) && target.length > 0) {
            const fields = target.join(', ');
            return `Duplicate value for field(s): ${fields}`;
        }
        return 'Duplicate value detected';
    }
    sanitizeMeta(meta) {
        if (!meta)
            return undefined;
        // Remove sensitive information from meta
        const sanitized = { ...meta };
        // Remove database-specific details that might leak schema info in production
        if (process.env.NODE_ENV === 'production') {
            delete sanitized.table;
            delete sanitized.database;
            delete sanitized.column;
        }
        return sanitized;
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = PrismaExceptionFilter_1 = tslib_1.__decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError, client_1.Prisma.PrismaClientUnknownRequestError, client_1.Prisma.PrismaClientRustPanicError, client_1.Prisma.PrismaClientInitializationError, client_1.Prisma.PrismaClientValidationError)
], PrismaExceptionFilter);
