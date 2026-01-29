"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_CONSTANTS = exports.ClockService = exports.ClockModule = void 0;
// Export module and service
var clock_module_1 = require("./lib/clock.module");
Object.defineProperty(exports, "ClockModule", { enumerable: true, get: function () { return clock_module_1.ClockModule; } });
var clock_service_1 = require("./lib/clock.service");
Object.defineProperty(exports, "ClockService", { enumerable: true, get: function () { return clock_service_1.ClockService; } });
// Export constants
var time_constants_1 = require("./lib/constants/time.constants");
Object.defineProperty(exports, "TIME_CONSTANTS", { enumerable: true, get: function () { return time_constants_1.TIME_CONSTANTS; } });
