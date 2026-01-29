/**
 * Clock configuration options
 */
export interface ClockConfig {
    /** Enable test mode */
    enableTestMode?: boolean;
    /** Initial test time (timestamp) */
    initialTime?: number;
    /** Test clock identifier */
    testClockId?: string;
}
/**
 * Date unit for time calculations
 */
export type DateUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
/**
 * Date range with start and end dates
 */
export interface DateRange {
    start: Date;
    end: Date;
}
/**
 * Time components breakdown
 */
export interface TimeComponents {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
/**
 * Duration breakdown in different units
 */
export interface Duration {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
}
//# sourceMappingURL=clock.types.d.ts.map