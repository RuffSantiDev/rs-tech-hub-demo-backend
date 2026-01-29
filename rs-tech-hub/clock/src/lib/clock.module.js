"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const clock_service_1 = require("./clock.service");
/**
 * Clock Module
 *
 * Provides ClockService globally for time abstraction and date utilities.
 * ConfigService is expected to be available globally from the app module.
 *
 * @example
 * ```typescript
 * @Module({
 *   imports: [ClockModule],
 * })
 * export class AppModule {}
 * ```
 */
let ClockModule = class ClockModule {
};
exports.ClockModule = ClockModule;
exports.ClockModule = ClockModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [clock_service_1.ClockService],
        exports: [clock_service_1.ClockService],
    })
], ClockModule);
