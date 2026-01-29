"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetTokenCreateServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let PasswordResetTokenCreateServiceOutput = class PasswordResetTokenCreateServiceOutput {
};
exports.PasswordResetTokenCreateServiceOutput = PasswordResetTokenCreateServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenCreateServiceOutput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenCreateServiceOutput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenCreateServiceOutput.prototype, "tokenHash", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenCreateServiceOutput.prototype, "token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], PasswordResetTokenCreateServiceOutput.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], PasswordResetTokenCreateServiceOutput.prototype, "expiresAt", void 0);
exports.PasswordResetTokenCreateServiceOutput = PasswordResetTokenCreateServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], PasswordResetTokenCreateServiceOutput);
