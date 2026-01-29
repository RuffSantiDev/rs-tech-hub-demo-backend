"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_CONSTANTS = void 0;
/**
 * Time-related constants
 */
exports.TIME_CONSTANTS = {
    MILLISECONDS_PER_SECOND: 1000,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    DAYS_PER_WEEK: 7,
    MONTHS_PER_YEAR: 12,
    // Computed values
    MILLISECONDS_PER_MINUTE: 60 * 1000,
    MILLISECONDS_PER_HOUR: 60 * 60 * 1000,
    MILLISECONDS_PER_DAY: 24 * 60 * 60 * 1000,
    MILLISECONDS_PER_WEEK: 7 * 24 * 60 * 60 * 1000,
    APPROXIMATE_MILLISECONDS_PER_MONTH: 30 * 24 * 60 * 60 * 1000,
    APPROXIMATE_MILLISECONDS_PER_YEAR: 365 * 24 * 60 * 60 * 1000,
};
