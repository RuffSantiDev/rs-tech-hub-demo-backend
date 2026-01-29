"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResult = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let ValidationResult = class ValidationResult {
    isValid;
    errors;
    message;
};
exports.ValidationResult = ValidationResult;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], ValidationResult.prototype, "isValid", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ValidationResult.prototype, "errors", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ValidationResult.prototype, "message", void 0);
exports.ValidationResult = ValidationResult = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ValidationResult);
