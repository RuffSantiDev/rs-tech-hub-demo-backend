"use strict";
var ClockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const time_constants_1 = require("./constants/time.constants");
/**
 * Clock service providing time abstraction for testing and date utilities
 *
 * Features:
 * - Test mode for deterministic time in tests
 * - Production-safe (test mode disabled in production)
 * - Comprehensive date manipulation utilities
 * - Date comparison and formatting methods
 * - Timezone support
 * - Time snapshots and freeze functionality
 */
let ClockService = ClockService_1 = class ClockService {
    configService;
    logger = new common_1.Logger(ClockService_1.name);
    currentTime;
    isTestMode;
    testClockId = null;
    environment;
    timeSnapshots = new Map();
    isFrozen = false;
    frozenTime = null;
    constructor(configService) {
        this.configService = configService;
        this.currentTime = Date.now();
        this.isTestMode = false;
        this.environment = this.configService.get('NODE_ENV');
        if (this.environment === 'production') {
            this.logger.warn('ClockService is running in production mode. Test mode is disabled.');
            this.disableTestMode();
        }
    }
    // ============================================================================
    // Core Time Methods
    // ============================================================================
    /**
     * Get current timestamp in milliseconds
     * Returns test time if in test mode, otherwise returns actual current time
     *
     * @returns Current timestamp in milliseconds
     *
     * @example
     * ```typescript
     * const timestamp = this.clockService.now();
     * console.log(timestamp); // 1698249600000
     * ```
     */
    now() {
        if (this.isTestMode) {
            return this.isFrozen ? this.frozenTime : this.currentTime;
        }
        return Date.now();
    }
    /**
     * Get current date object
     * Returns test date if in test mode, otherwise returns actual current date
     *
     * @returns Current Date object
     *
     * @example
     * ```typescript
     * const date = this.clockService.nowDate();
     * console.log(date); // Date object
     * ```
     */
    nowDate() {
        return new Date(this.now());
    }
    /**
     * Get current timestamp (alias for now())
     *
     * @returns Current timestamp in milliseconds
     */
    getTimestamp() {
        return this.now();
    }
    /**
     * Get the current date without time (midnight)
     *
     * @returns Date object set to midnight
     *
     * @example
     * ```typescript
     * const today = this.clockService.getToday();
     * console.log(today); // 2024-10-15T00:00:00.000Z
     * ```
     */
    getToday() {
        const date = this.nowDate();
        date.setHours(0, 0, 0, 0);
        return date;
    }
    // ============================================================================
    // Test Mode Management
    // ============================================================================
    /**
     * Check if test mode is enabled
     *
     * @returns True if test mode is active
     */
    testMode() {
        return this.isTestMode;
    }
    /**
     * Enable test mode for deterministic time in tests
     * Only works in non-production environments
     *
     * @example
     * ```typescript
     * this.clockService.enableTestMode();
     * this.clockService.setTime(Date.parse('2024-01-01'));
     * ```
     */
    enableTestMode() {
        if (this.environment !== 'production') {
            this.isTestMode = true;
            this.logger.log('Test clock enabled');
        }
        else {
            this.logger.warn('Cannot enable test mode in production environment.');
        }
    }
    /**
     * Disable test mode and return to real time
     */
    disableTestMode() {
        this.isTestMode = false;
        this.currentTime = Date.now();
        this.testClockId = null;
        this.isFrozen = false;
        this.frozenTime = null;
        this.logger.log('Test clock disabled');
    }
    /**
     * Set the test clock time
     *
     * @param time - Timestamp in milliseconds
     *
     * @example
     * ```typescript
     * this.clockService.enableTestMode();
     * this.clockService.setTime(Date.parse('2024-01-01'));
     * ```
     */
    setTime(time) {
        if (this.isTestMode) {
            this.currentTime = time;
            this.logger.log('Test clock set to: ' + new Date(this.currentTime).toISOString());
        }
        else {
            this.logger.log('Test clock not enabled, cannot set time');
        }
    }
    /**
     * Set test clock identifier
     *
     * @param testClockId - Identifier for the test clock
     */
    setTestClockId(testClockId) {
        this.testClockId = testClockId;
        this.logger.log('Test clock ID set to: ' + this.testClockId);
    }
    /**
     * Advance test time by days
     *
     * @param days - Number of days to advance
     *
     * @example
     * ```typescript
     * this.clockService.advanceDays(7); // Advance 1 week
     * ```
     */
    advanceDays(days) {
        if (this.isTestMode) {
            this.currentTime += days * time_constants_1.TIME_CONSTANTS.MILLISECONDS_PER_DAY;
            this.logger.log('Advanced test time to: ' + new Date(this.now()).toISOString());
        }
    }
    /**
     * Advance test time by milliseconds
     *
     * @param milliseconds - Number of milliseconds to advance
     *
     * @example
     * ```typescript
     * this.clockService.advanceMs(5000); // Advance 5 seconds
     * ```
     */
    advanceMs(milliseconds) {
        if (this.isTestMode) {
            this.currentTime += milliseconds;
            this.logger.log('Advanced test time to: ' + new Date(this.now()).toISOString());
        }
    }
    /**
     * Advance test time by a specific unit
     *
     * @param amount - Amount to advance
     * @param unit - Time unit
     *
     * @example
     * ```typescript
     * this.clockService.advance(2, 'hour'); // Advance 2 hours
     * ```
     */
    advance(amount, unit) {
        const ms = this.convertToMilliseconds(amount, unit);
        this.advanceMs(ms);
    }
    // ============================================================================
    // Snapshot & Freeze Functionality
    // ============================================================================
    /**
     * Save current test time with a label
     *
     * @param label - Label for the snapshot
     *
     * @example
     * ```typescript
     * this.clockService.snapshot('beforeTest');
     * // ... do some test operations
     * this.clockService.restore('beforeTest');
     * ```
     */
    snapshot(label) {
        if (this.isTestMode) {
            this.timeSnapshots.set(label, this.currentTime);
            this.logger.log(`Time snapshot saved: ${label} = ${new Date(this.currentTime).toISOString()}`);
        }
    }
    /**
     * Restore test time from a snapshot
     *
     * @param label - Label of the snapshot to restore
     * @returns True if snapshot was found and restored
     */
    restore(label) {
        if (this.isTestMode && this.timeSnapshots.has(label)) {
            const savedTime = this.timeSnapshots.get(label);
            if (savedTime !== undefined) {
                this.currentTime = savedTime;
                this.logger.log(`Time restored: ${label} = ${new Date(this.currentTime).toISOString()}`);
                return true;
            }
        }
        return false;
    }
    /**
     * Clear all snapshots
     */
    clearSnapshots() {
        this.timeSnapshots.clear();
        this.logger.log('All time snapshots cleared');
    }
    /**
     * Freeze time at current moment or specific time
     *
     * @param atTime - Optional timestamp to freeze at
     *
     * @example
     * ```typescript
     * this.clockService.freeze(); // Freeze at current test time
     * this.clockService.freeze(Date.parse('2024-01-01')); // Freeze at specific time
     * ```
     */
    freeze(atTime) {
        if (this.isTestMode) {
            this.isFrozen = true;
            this.frozenTime = atTime ?? this.currentTime;
            this.logger.log(`Time frozen at: ${new Date(this.frozenTime).toISOString()}`);
        }
    }
    /**
     * Unfreeze time
     */
    unfreeze() {
        this.isFrozen = false;
        this.frozenTime = null;
        this.logger.log('Time unfrozen');
    }
    // ============================================================================
    // Date Arithmetic
    // ============================================================================
    /**
     * Add time to the current date
     *
     * @param amount - Amount to add
     * @param unit - Time unit
     * @returns New date with time added
     *
     * @example
     * ```typescript
     * const futureDate = this.clockService.add(7, 'day'); // 7 days from now
     * ```
     */
    add(amount, unit) {
        const date = this.nowDate();
        const ms = this.convertToMilliseconds(amount, unit);
        return new Date(date.getTime() + ms);
    }
    /**
     * Subtract time from the current date
     *
     * @param amount - Amount to subtract
     * @param unit - Time unit
     * @returns New date with time subtracted
     *
     * @example
     * ```typescript
     * const pastDate = this.clockService.subtract(3, 'month'); // 3 months ago
     * ```
     */
    subtract(amount, unit) {
        return this.add(-amount, unit);
    }
    /**
     * Add time to a specific date
     *
     * @param date - Starting date
     * @param amount - Amount to add
     * @param unit - Time unit
     * @returns New date with time added
     *
     * @example
     * ```typescript
     * const date = new Date('2024-01-01');
     * const future = this.clockService.addToDate(date, 1, 'year');
     * ```
     */
    addToDate(date, amount, unit) {
        const ms = this.convertToMilliseconds(amount, unit);
        return new Date(date.getTime() + ms);
    }
    /**
     * Subtract time from a specific date
     *
     * @param date - Starting date
     * @param amount - Amount to subtract
     * @param unit - Time unit
     * @returns New date with time subtracted
     */
    subtractFromDate(date, amount, unit) {
        return this.addToDate(date, -amount, unit);
    }
    /**
     * Get difference between two dates in specified unit
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @param unit - Unit to return difference in (default: millisecond)
     * @returns Difference in specified unit
     *
     * @example
     * ```typescript
     * const date1 = new Date('2024-01-01');
     * const date2 = new Date('2024-01-08');
     * const days = this.clockService.diff(date2, date1, 'day'); // 7
     * ```
     */
    diff(date1, date2, unit = 'millisecond') {
        const diffMs = date1.getTime() - date2.getTime();
        return this.convertFromMilliseconds(diffMs, unit);
    }
    // ============================================================================
    // Relative Time Methods
    // ============================================================================
    /**
     * Get start of day (midnight) for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at midnight
     *
     * @example
     * ```typescript
     * const midnight = this.clockService.startOfDay();
     * ```
     */
    startOfDay(date) {
        const d = date ? new Date(date) : this.nowDate();
        d.setHours(0, 0, 0, 0);
        return d;
    }
    /**
     * Get end of day (23:59:59.999) for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at end of day
     */
    endOfDay(date) {
        const d = date ? new Date(date) : this.nowDate();
        d.setHours(23, 59, 59, 999);
        return d;
    }
    /**
     * Get start of month for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at start of month
     */
    startOfMonth(date) {
        const d = date ? new Date(date) : this.nowDate();
        return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
    }
    /**
     * Get end of month for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at end of month
     */
    endOfMonth(date) {
        const d = date ? new Date(date) : this.nowDate();
        return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
    }
    /**
     * Get start of year for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at start of year
     */
    startOfYear(date) {
        const d = date ? new Date(date) : this.nowDate();
        return new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);
    }
    /**
     * Get end of year for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at end of year
     */
    endOfYear(date) {
        const d = date ? new Date(date) : this.nowDate();
        return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
    }
    /**
     * Get start of week (Sunday) for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at start of week
     */
    startOfWeek(date) {
        const d = date ? new Date(date) : this.nowDate();
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.getFullYear(), d.getMonth(), diff, 0, 0, 0, 0);
    }
    /**
     * Get end of week (Saturday) for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at end of week
     */
    endOfWeek(date) {
        const d = date ? new Date(date) : this.nowDate();
        const day = d.getDay();
        const diff = d.getDate() + (6 - day);
        return new Date(d.getFullYear(), d.getMonth(), diff, 23, 59, 59, 999);
    }
    // ============================================================================
    // Comparison Methods
    // ============================================================================
    /**
     * Check if the first date is before the second date
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if date1 is before date2
     */
    isBefore(date1, date2) {
        return date1.getTime() < date2.getTime();
    }
    /**
     * Check if the first date is after the second date
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if date1 is after date2
     */
    isAfter(date1, date2) {
        return date1.getTime() > date2.getTime();
    }
    /**
     * Check if two dates are on the same day
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if dates are on the same day
     *
     * @example
     * ```typescript
     * const isSame = this.clockService.isSameDay(
     *   new Date('2024-01-01 10:00'),
     *   new Date('2024-01-01 15:00')
     * ); // true
     * ```
     */
    isSameDay(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
    /**
     * Check if two dates are in the same month
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if dates are in the same month
     */
    isSameMonth(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth());
    }
    /**
     * Check if two dates are in the same year
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if dates are in the same year
     */
    isSameYear(date1, date2) {
        return date1.getFullYear() === date2.getFullYear();
    }
    /**
     * Check if date is between two other dates
     *
     * @param date - Date to check
     * @param start - Start date
     * @param end - End date
     * @param inclusive - Include boundaries (default: true)
     * @returns True if date is between start and end
     *
     * @example
     * ```typescript
     * const inRange = this.clockService.isBetween(
     *   new Date('2024-01-15'),
     *   new Date('2024-01-01'),
     *   new Date('2024-01-31')
     * ); // true
     * ```
     */
    isBetween(date, start, end, inclusive = true) {
        const time = date.getTime();
        const startTime = start.getTime();
        const endTime = end.getTime();
        if (inclusive) {
            return time >= startTime && time <= endTime;
        }
        return time > startTime && time < endTime;
    }
    /**
     * Check if date is in the past
     *
     * @param date - Date to check
     * @returns True if date is in the past
     */
    isPast(date) {
        return date.getTime() < this.now();
    }
    /**
     * Check if date is in the future
     *
     * @param date - Date to check
     * @returns True if date is in the future
     */
    isFuture(date) {
        return date.getTime() > this.now();
    }
    /**
     * Check if date is today
     *
     * @param date - Date to check
     * @returns True if date is today
     */
    isToday(date) {
        return this.isSameDay(date, this.nowDate());
    }
    /**
     * Check if date is yesterday
     *
     * @param date - Date to check
     * @returns True if date is yesterday
     */
    isYesterday(date) {
        const yesterday = this.subtract(1, 'day');
        return this.isSameDay(date, yesterday);
    }
    /**
     * Check if date is tomorrow
     *
     * @param date - Date to check
     * @returns True if date is tomorrow
     */
    isTomorrow(date) {
        const tomorrow = this.add(1, 'day');
        return this.isSameDay(date, tomorrow);
    }
    // ============================================================================
    // Formatting Methods
    // ============================================================================
    /**
     * Format date to ISO string
     *
     * @param date - Optional date (defaults to now)
     * @returns ISO 8601 formatted string
     *
     * @example
     * ```typescript
     * const iso = this.clockService.toISOString();
     * // "2024-01-01T00:00:00.000Z"
     * ```
     */
    toISOString(date) {
        return (date || this.nowDate()).toISOString();
    }
    /**
     * Format date to locale string
     *
     * @param date - Optional date (defaults to now)
     * @param locale - Locale identifier (default: 'en-US')
     * @param options - Formatting options
     * @returns Localized date string
     */
    toLocaleString(date, locale = 'en-US', options) {
        return (date || this.nowDate()).toLocaleString(locale, options);
    }
    /**
     * Format date using custom format string
     *
     * @param date - Date to format
     * @param format - Format string (YYYY, MM, DD, HH, mm, ss, SSS)
     * @returns Formatted date string
     *
     * @example
     * ```typescript
     * const formatted = this.clockService.format(
     *   new Date('2024-01-15'),
     *   'YYYY-MM-DD HH:mm:ss'
     * ); // "2024-01-15 00:00:00"
     * ```
     */
    format(date, format) {
        const tokens = {
            YYYY: () => date.getFullYear(),
            MM: () => String(date.getMonth() + 1).padStart(2, '0'),
            DD: () => String(date.getDate()).padStart(2, '0'),
            HH: () => String(date.getHours()).padStart(2, '0'),
            mm: () => String(date.getMinutes()).padStart(2, '0'),
            ss: () => String(date.getSeconds()).padStart(2, '0'),
            SSS: () => String(date.getMilliseconds()).padStart(3, '0'),
        };
        return format.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, (match) => String(tokens[match]?.()));
    }
    // ============================================================================
    // Timezone Methods
    // ============================================================================
    /**
     * Get current timezone offset in minutes
     *
     * @returns Timezone offset in minutes
     */
    getTimezoneOffset() {
        return this.nowDate().getTimezoneOffset();
    }
    /**
     * Convert date to UTC
     *
     * @param date - Date to convert
     * @returns UTC date
     */
    toUTC(date) {
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    }
    /**
     * Convert UTC date to local time
     *
     * @param date - UTC date
     * @returns Local date
     */
    fromUTC(date) {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    }
    // ============================================================================
    // Parsing Methods
    // ============================================================================
    /**
     * Parse ISO string to date
     *
     * @param isoString - ISO 8601 formatted string
     * @returns Parsed date
     */
    parseISO(isoString) {
        return new Date(isoString);
    }
    /**
     * Parse timestamp to date
     *
     * @param timestamp - Unix timestamp in milliseconds
     * @returns Parsed date
     */
    fromTimestamp(timestamp) {
        return new Date(timestamp);
    }
    /**
     * Try to parse various date formats
     *
     * @param dateString - Date string to parse
     * @returns Parsed date or null if invalid
     */
    parse(dateString) {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
    }
    // ============================================================================
    // Helper Methods
    // ============================================================================
    /**
     * Convert amount and unit to milliseconds
     *
     * @private
     * @param amount - Amount of time
     * @param unit - Time unit
     * @returns Milliseconds
     */
    convertToMilliseconds(amount, unit) {
        const conversions = {
            millisecond: 1,
            second: time_constants_1.TIME_CONSTANTS.MILLISECONDS_PER_SECOND,
            minute: time_constants_1.TIME_CONSTANTS.MILLISECONDS_PER_MINUTE,
            hour: time_constants_1.TIME_CONSTANTS.MILLISECONDS_PER_HOUR,
            day: time_constants_1.TIME_CONSTANTS.MILLISECONDS_PER_DAY,
            week: time_constants_1.TIME_CONSTANTS.MILLISECONDS_PER_WEEK,
            month: time_constants_1.TIME_CONSTANTS.APPROXIMATE_MILLISECONDS_PER_MONTH,
            year: time_constants_1.TIME_CONSTANTS.APPROXIMATE_MILLISECONDS_PER_YEAR,
        };
        return amount * conversions[unit];
    }
    /**
     * Convert milliseconds to specified unit
     *
     * @private
     * @param ms - Milliseconds
     * @param unit - Time unit
     * @returns Amount in specified unit
     */
    convertFromMilliseconds(ms, unit) {
        return ms / this.convertToMilliseconds(1, unit);
    }
};
exports.ClockService = ClockService;
exports.ClockService = ClockService = ClockService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], ClockService);
