"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetTokenValidateServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let PasswordResetTokenValidateServiceInput = class PasswordResetTokenValidateServiceInput {
};
exports.PasswordResetTokenValidateServiceInput = PasswordResetTokenValidateServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenValidateServiceInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenValidateServiceInput.prototype, "token", void 0);
exports.PasswordResetTokenValidateServiceInput = PasswordResetTokenValidateServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], PasswordResetTokenValidateServiceInput);
