"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthActivateUserResolverInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthActivateUserResolverInput = class AuthActivateUserResolverInput {
    email;
    activationKey;
};
exports.AuthActivateUserResolverInput = AuthActivateUserResolverInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], AuthActivateUserResolverInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthActivateUserResolverInput.prototype, "activationKey", void 0);
exports.AuthActivateUserResolverInput = AuthActivateUserResolverInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthActivateUserResolverInput);
