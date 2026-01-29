"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResetPasswordServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthResetPasswordServiceInput = class AuthResetPasswordServiceInput {
    email;
    resetToken;
    newPassword;
};
exports.AuthResetPasswordServiceInput = AuthResetPasswordServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], AuthResetPasswordServiceInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthResetPasswordServiceInput.prototype, "resetToken", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthResetPasswordServiceInput.prototype, "newPassword", void 0);
exports.AuthResetPasswordServiceInput = AuthResetPasswordServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthResetPasswordServiceInput);
