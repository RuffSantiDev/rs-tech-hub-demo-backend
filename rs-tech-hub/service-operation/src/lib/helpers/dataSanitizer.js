"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeData = sanitizeData;
const sensitiveFields = [
    'password',
    'oldPassword',
    'newPassword',
    'token',
    'refreshToken',
    'hash',
    'salt',
    'activationKey',
    'activationToken',
    'key',
    'licenseKey',
];
function sanitizeData(data) {
    if (Array.isArray(data)) {
        return data.map((item) => sanitizeData(item));
    }
    else if (typeof data === 'object' && data !== null) {
        const sanitizedData = {};
        const dataObj = data;
        for (const key in dataObj) {
            // Skip sensitive fields
            if (sensitiveFields.includes(key)) {
                continue; // Skip this field entirely
            }
            // Recursively sanitize nested objects/arrays
            sanitizedData[key] = sanitizeData(dataObj[key]);
        }
        return sanitizedData;
    }
    return data;
}
