"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginServiceInput = void 0;
const tslib_1 = require("tslib");
// src/auth/dto/login.input.ts
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthLoginServiceInput = class AuthLoginServiceInput {
};
exports.AuthLoginServiceInput = AuthLoginServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLowercase)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], AuthLoginServiceInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthLoginServiceInput.prototype, "password", void 0);
exports.AuthLoginServiceInput = AuthLoginServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthLoginServiceInput);
