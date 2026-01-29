import { ConfigService } from '@nestjs/config';
import { DateUnit } from '../types/clock.types';
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
export declare class ClockService {
    private readonly configService;
    private readonly logger;
    currentTime: number;
    isTestMode: boolean;
    private testClockId;
    private environment;
    private timeSnapshots;
    private isFrozen;
    private frozenTime;
    constructor(configService: ConfigService);
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
    now(): number;
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
    nowDate(): Date;
    /**
     * Get current timestamp (alias for now())
     *
     * @returns Current timestamp in milliseconds
     */
    getTimestamp(): number;
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
    getToday(): Date;
    /**
     * Check if test mode is enabled
     *
     * @returns True if test mode is active
     */
    testMode(): boolean;
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
    enableTestMode(): void;
    /**
     * Disable test mode and return to real time
     */
    disableTestMode(): void;
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
    setTime(time: number): void;
    /**
     * Set test clock identifier
     *
     * @param testClockId - Identifier for the test clock
     */
    setTestClockId(testClockId: string): void;
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
    advanceDays(days: number): void;
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
    advanceMs(milliseconds: number): void;
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
    advance(amount: number, unit: DateUnit): void;
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
    snapshot(label: string): void;
    /**
     * Restore test time from a snapshot
     *
     * @param label - Label of the snapshot to restore
     * @returns True if snapshot was found and restored
     */
    restore(label: string): boolean;
    /**
     * Clear all snapshots
     */
    clearSnapshots(): void;
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
    freeze(atTime?: number): void;
    /**
     * Unfreeze time
     */
    unfreeze(): void;
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
    add(amount: number, unit: DateUnit): Date;
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
    subtract(amount: number, unit: DateUnit): Date;
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
    addToDate(date: Date, amount: number, unit: DateUnit): Date;
    /**
     * Subtract time from a specific date
     *
     * @param date - Starting date
     * @param amount - Amount to subtract
     * @param unit - Time unit
     * @returns New date with time subtracted
     */
    subtractFromDate(date: Date, amount: number, unit: DateUnit): Date;
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
    diff(date1: Date, date2: Date, unit?: DateUnit): number;
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
    startOfDay(date?: Date): Date;
    /**
     * Get end of day (23:59:59.999) for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at end of day
     */
    endOfDay(date?: Date): Date;
    /**
     * Get start of month for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at start of month
     */
    startOfMonth(date?: Date): Date;
    /**
     * Get end of month for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at end of month
     */
    endOfMonth(date?: Date): Date;
    /**
     * Get start of year for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at start of year
     */
    startOfYear(date?: Date): Date;
    /**
     * Get end of year for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at end of year
     */
    endOfYear(date?: Date): Date;
    /**
     * Get start of week (Sunday) for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at start of week
     */
    startOfWeek(date?: Date): Date;
    /**
     * Get end of week (Saturday) for a date
     *
     * @param date - Optional date (defaults to now)
     * @returns Date at end of week
     */
    endOfWeek(date?: Date): Date;
    /**
     * Check if the first date is before the second date
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if date1 is before date2
     */
    isBefore(date1: Date, date2: Date): boolean;
    /**
     * Check if the first date is after the second date
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if date1 is after date2
     */
    isAfter(date1: Date, date2: Date): boolean;
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
    isSameDay(date1: Date, date2: Date): boolean;
    /**
     * Check if two dates are in the same month
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if dates are in the same month
     */
    isSameMonth(date1: Date, date2: Date): boolean;
    /**
     * Check if two dates are in the same year
     *
     * @param date1 - First date
     * @param date2 - Second date
     * @returns True if dates are in the same year
     */
    isSameYear(date1: Date, date2: Date): boolean;
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
    isBetween(date: Date, start: Date, end: Date, inclusive?: boolean): boolean;
    /**
     * Check if date is in the past
     *
     * @param date - Date to check
     * @returns True if date is in the past
     */
    isPast(date: Date): boolean;
    /**
     * Check if date is in the future
     *
     * @param date - Date to check
     * @returns True if date is in the future
     */
    isFuture(date: Date): boolean;
    /**
     * Check if date is today
     *
     * @param date - Date to check
     * @returns True if date is today
     */
    isToday(date: Date): boolean;
    /**
     * Check if date is yesterday
     *
     * @param date - Date to check
     * @returns True if date is yesterday
     */
    isYesterday(date: Date): boolean;
    /**
     * Check if date is tomorrow
     *
     * @param date - Date to check
     * @returns True if date is tomorrow
     */
    isTomorrow(date: Date): boolean;
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
    toISOString(date?: Date): string;
    /**
     * Format date to locale string
     *
     * @param date - Optional date (defaults to now)
     * @param locale - Locale identifier (default: 'en-US')
     * @param options - Formatting options
     * @returns Localized date string
     */
    toLocaleString(date?: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string;
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
    format(date: Date, format: string): string;
    /**
     * Get current timezone offset in minutes
     *
     * @returns Timezone offset in minutes
     */
    getTimezoneOffset(): number;
    /**
     * Convert date to UTC
     *
     * @param date - Date to convert
     * @returns UTC date
     */
    toUTC(date: Date): Date;
    /**
     * Convert UTC date to local time
     *
     * @param date - UTC date
     * @returns Local date
     */
    fromUTC(date: Date): Date;
    /**
     * Parse ISO string to date
     *
     * @param isoString - ISO 8601 formatted string
     * @returns Parsed date
     */
    parseISO(isoString: string): Date;
    /**
     * Parse timestamp to date
     *
     * @param timestamp - Unix timestamp in milliseconds
     * @returns Parsed date
     */
    fromTimestamp(timestamp: number): Date;
    /**
     * Try to parse various date formats
     *
     * @param dateString - Date string to parse
     * @returns Parsed date or null if invalid
     */
    parse(dateString: string): Date | null;
    /**
     * Convert amount and unit to milliseconds
     *
     * @private
     * @param amount - Amount of time
     * @param unit - Time unit
     * @returns Milliseconds
     */
    private convertToMilliseconds;
    /**
     * Convert milliseconds to specified unit
     *
     * @private
     * @param ms - Milliseconds
     * @param unit - Time unit
     * @returns Amount in specified unit
     */
    private convertFromMilliseconds;
}
//# sourceMappingURL=clock.service.d.ts.map