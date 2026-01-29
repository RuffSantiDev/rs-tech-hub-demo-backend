# @rs-tech-hub/nestjs-clock

Time abstraction and date utilities for NestJS applications with built-in testing support.

## ✨ Features

- **Test Mode**: Deterministic time control for testing
- **Time Manipulation**: Freeze, advance, and snapshot time states
- **Date Arithmetic**: Add, subtract, and calculate differences between dates
- **Comparison Methods**: Check date relationships (before, after, between, etc.)
- **Formatting**: Convert dates to ISO, locale, and custom formats
- **Relative Time**: Get start/end of day, week, month, year
- **Timezone Support**: UTC conversion and timezone offset handling
- **Production Safe**: Test mode automatically disabled in production

## 📋 Prerequisites

- Node.js ≥ 20.11.1
- NestJS ≥ 11.1.6
- TypeScript ≥ 5.1.0

## 📦 Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Module Registration

### Basic Registration

```typescript
import { Module } from '@nestjs/common';
import { ClockModule } from '@rs-tech-hub/nestjs-clock';

@Module({
  imports: [ClockModule],
})
export class AppModule {}
```

## 💻 Service Usage

### Basic Time Operations

```typescript
import { Injectable } from '@nestjs/common';
import { ClockService } from '@rs-tech-hub/nestjs-clock';

@Injectable()
export class YourService {
  constructor(private readonly clockService: ClockService) {}

  getCurrentTime(): number {
    return this.clockService.now(); // Get current timestamp
  }

  getCurrentDate(): Date {
    return this.clockService.nowDate(); // Get current Date object
  }

  getToday(): Date {
    return this.clockService.getToday(); // Get today at midnight
  }
}
```

### Test Mode for Testing

```typescript
describe('YourService', () => {
  let clockService: ClockService;

  beforeEach(() => {
    clockService = new ClockService(configService);
    clockService.enableTestMode();
    clockService.setTime(Date.parse('2024-01-01T00:00:00Z'));
  });

  it('should use deterministic time', () => {
    expect(clockService.now()).toBe(Date.parse('2024-01-01T00:00:00Z'));

    clockService.advanceDays(7);
    expect(clockService.now()).toBe(Date.parse('2024-01-08T00:00:00Z'));
  });
});
```

### Date Arithmetic

```typescript
// Add time to current date
const nextWeek = this.clockService.add(7, 'day');
const nextMonth = this.clockService.add(1, 'month');

// Subtract time from current date
const lastWeek = this.clockService.subtract(7, 'day');
const lastYear = this.clockService.subtract(1, 'year');

// Add/subtract from specific date
const date = new Date('2024-01-01');
const future = this.clockService.addToDate(date, 3, 'month');
const past = this.clockService.subtractFromDate(date, 2, 'week');

// Calculate difference between dates
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-08');
const daysDiff = this.clockService.diff(date2, date1, 'day'); // 7
```

### Date Comparison

```typescript
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-15');

this.clockService.isBefore(date1, date2); // true
this.clockService.isAfter(date2, date1); // true
this.clockService.isSameDay(date1, date1); // true
this.clockService.isSameMonth(date1, date2); // true

const date = new Date('2024-01-15');
this.clockService.isBetween(
  date,
  new Date('2024-01-01'),
  new Date('2024-01-31')
); // true

this.clockService.isPast(new Date('2020-01-01')); // true
this.clockService.isFuture(new Date('2030-01-01')); // true
this.clockService.isToday(new Date()); // true
```

### Relative Time Methods

```typescript
// Get start/end of periods
const startOfDay = this.clockService.startOfDay();
const endOfDay = this.clockService.endOfDay();
const startOfMonth = this.clockService.startOfMonth();
const endOfMonth = this.clockService.endOfMonth();
const startOfYear = this.clockService.startOfYear();
const endOfYear = this.clockService.endOfYear();
const startOfWeek = this.clockService.startOfWeek();
const endOfWeek = this.clockService.endOfWeek();
```

### Date Formatting

```typescript
// ISO format
const iso = this.clockService.toISOString(); // "2024-01-01T00:00:00.000Z"

// Locale format
const localized = this.clockService.toLocaleString(new Date(), 'en-US', {
  dateStyle: 'long',
});

// Custom format
const formatted = this.clockService.format(
  new Date('2024-01-15'),
  'YYYY-MM-DD HH:mm:ss'
); // "2024-01-15 00:00:00"
```

### Advanced Test Features

```typescript
describe('Advanced Testing', () => {
  it('should support time snapshots', () => {
    clockService.enableTestMode();
    clockService.setTime(Date.parse('2024-01-01'));

    // Save current time
    clockService.snapshot('start');

    // Advance time
    clockService.advanceDays(30);

    // Restore to snapshot
    clockService.restore('start');
    expect(clockService.now()).toBe(Date.parse('2024-01-01'));
  });

  it('should support freezing time', () => {
    clockService.enableTestMode();
    clockService.freeze(Date.parse('2024-01-01'));

    // Time stays frozen
    clockService.advanceDays(1);
    expect(clockService.now()).toBe(Date.parse('2024-01-01'));

    clockService.unfreeze();
  });

  it('should advance by specific units', () => {
    clockService.enableTestMode();
    clockService.setTime(Date.parse('2024-01-01T00:00:00Z'));

    clockService.advance(2, 'hour');
    expect(clockService.now()).toBe(Date.parse('2024-01-01T02:00:00Z'));

    clockService.advance(30, 'minute');
    expect(clockService.now()).toBe(Date.parse('2024-01-01T02:30:00Z'));
  });
});
```

### Timezone Handling

```typescript
// Get timezone offset
const offset = this.clockService.getTimezoneOffset(); // Minutes

// Convert to/from UTC
const utcDate = this.clockService.toUTC(new Date());
const localDate = this.clockService.fromUTC(utcDate);
```

### Date Parsing

```typescript
// Parse ISO string
const date1 = this.clockService.parseISO('2024-01-01T00:00:00.000Z');

// Parse timestamp
const date2 = this.clockService.fromTimestamp(1704067200000);

// Parse various formats
const date3 = this.clockService.parse('2024-01-01'); // Date or null if invalid
```

## 📘 API Reference

### Core Time Methods

- `now(): number` - Get current timestamp in milliseconds
- `nowDate(): Date` - Get current Date object
- `getTimestamp(): number` - Get current timestamp (alias for now)
- `getToday(): Date` - Get current date at midnight

### Test Mode Methods

- `testMode(): boolean` - Check if test mode is enabled
- `enableTestMode(): void` - Enable test mode (non-production only)
- `disableTestMode(): void` - Disable test mode
- `setTime(time: number): void` - Set test clock time
- `setTestClockId(id: string): void` - Set test clock identifier
- `advanceDays(days: number): void` - Advance test time by days
- `advanceMs(ms: number): void` - Advance test time by milliseconds
- `advance(amount: number, unit: DateUnit): void` - Advance by specific unit

### Snapshot & Freeze Methods

- `snapshot(label: string): void` - Save current test time with label
- `restore(label: string): boolean` - Restore test time from snapshot
- `clearSnapshots(): void` - Clear all snapshots
- `freeze(atTime?: number): void` - Freeze time at current or specific moment
- `unfreeze(): void` - Unfreeze time

### Date Arithmetic Methods

- `add(amount: number, unit: DateUnit): Date` - Add time to current date
- `subtract(amount: number, unit: DateUnit): Date` - Subtract time from current date
- `addToDate(date: Date, amount: number, unit: DateUnit): Date` - Add time to specific date
- `subtractFromDate(date: Date, amount: number, unit: DateUnit): Date` - Subtract time from specific date
- `diff(date1: Date, date2: Date, unit?: DateUnit): number` - Get difference between dates

### Relative Time Methods

- `startOfDay(date?: Date): Date` - Get start of day (midnight)
- `endOfDay(date?: Date): Date` - Get end of day (23:59:59.999)
- `startOfMonth(date?: Date): Date` - Get start of month
- `endOfMonth(date?: Date): Date` - Get end of month
- `startOfYear(date?: Date): Date` - Get start of year
- `endOfYear(date?: Date): Date` - Get end of year
- `startOfWeek(date?: Date): Date` - Get start of week (Sunday)
- `endOfWeek(date?: Date): Date` - Get end of week (Saturday)

### Comparison Methods

- `isBefore(date1: Date, date2: Date): boolean` - Check if date1 is before date2
- `isAfter(date1: Date, date2: Date): boolean` - Check if date1 is after date2
- `isSameDay(date1: Date, date2: Date): boolean` - Check if same day
- `isSameMonth(date1: Date, date2: Date): boolean` - Check if same month
- `isSameYear(date1: Date, date2: Date): boolean` - Check if same year
- `isBetween(date: Date, start: Date, end: Date, inclusive?: boolean): boolean` - Check if date is between two dates
- `isPast(date: Date): boolean` - Check if date is in the past
- `isFuture(date: Date): boolean` - Check if date is in the future
- `isToday(date: Date): boolean` - Check if date is today
- `isYesterday(date: Date): boolean` - Check if date is yesterday
- `isTomorrow(date: Date): boolean` - Check if date is tomorrow

### Formatting Methods

- `toISOString(date?: Date): string` - Format date to ISO 8601 string
- `toLocaleString(date?: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string` - Format to locale string
- `format(date: Date, format: string): string` - Format using custom format string (YYYY, MM, DD, HH, mm, ss, SSS)

### Timezone Methods

- `getTimezoneOffset(): number` - Get timezone offset in minutes
- `toUTC(date: Date): Date` - Convert date to UTC
- `fromUTC(date: Date): Date` - Convert UTC date to local time

### Parsing Methods

- `parseISO(isoString: string): Date` - Parse ISO 8601 string to date
- `fromTimestamp(timestamp: number): Date` - Parse Unix timestamp to date
- `parse(dateString: string): Date | null` - Try to parse various date formats

## 📊 Data Types

### DateUnit

```typescript
type DateUnit =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';
```

### ClockConfig

```typescript
interface ClockConfig {
  enableTestMode?: boolean;
  initialTime?: number;
  testClockId?: string;
}
```

### DateRange

```typescript
interface DateRange {
  start: Date;
  end: Date;
}
```

### TimeComponents

```typescript
interface TimeComponents {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
```

### Duration

```typescript
interface Duration {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}
```

## 🔢 Constants

### TIME_CONSTANTS

```typescript
const TIME_CONSTANTS = {
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_WEEK: 7,
  MONTHS_PER_YEAR: 12,
  MILLISECONDS_PER_MINUTE: 60000,
  MILLISECONDS_PER_HOUR: 3600000,
  MILLISECONDS_PER_DAY: 86400000,
  MILLISECONDS_PER_WEEK: 604800000,
  APPROXIMATE_MILLISECONDS_PER_MONTH: 2592000000,
  APPROXIMATE_MILLISECONDS_PER_YEAR: 31536000000,
};
```

## 💡 Best Practices

1. **Use Test Mode in Tests**: Always enable test mode in your tests for deterministic time
2. **Production Safety**: Test mode is automatically disabled in production environments
3. **Snapshot Management**: Use snapshots to save and restore specific time states during testing
4. **Time Units**: Use appropriate time units for better code readability
5. **Timezone Awareness**: Be aware of timezone differences when working with dates
6. **Date Immutability**: All date manipulation methods return new Date objects

## 📄 License

This package is free and open source under the MIT License.

## 🆘 Support

For issues, questions, or contributions, please visit the [RS-Tech-Hub repository](https://github.com/rs-tech-hub/nestjs-backend).
