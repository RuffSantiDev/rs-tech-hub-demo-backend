"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailResolverInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let VerifyEmailResolverInput = class VerifyEmailResolverInput {
};
exports.VerifyEmailResolverInput = VerifyEmailResolverInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLowercase)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], VerifyEmailResolverInput.prototype, "email", void 0);
exports.VerifyEmailResolverInput = VerifyEmailResolverInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], VerifyEmailResolverInput);
