"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSignUpServiceInput = void 0;
const tslib_1 = require("tslib");
// src/auth/dto/signup.input.ts
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthSignUpServiceInput = class AuthSignUpServiceInput {
};
exports.AuthSignUpServiceInput = AuthSignUpServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLowercase)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], AuthSignUpServiceInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(12),
    tslib_1.__metadata("design:type", String)
], AuthSignUpServiceInput.prototype, "password", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthSignUpServiceInput.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthSignUpServiceInput.prototype, "lastName", void 0);
exports.AuthSignUpServiceInput = AuthSignUpServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthSignUpServiceInput);
