"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidateUserServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthValidateUserServiceInput = class AuthValidateUserServiceInput {
};
exports.AuthValidateUserServiceInput = AuthValidateUserServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthValidateUserServiceInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthValidateUserServiceInput.prototype, "password", void 0);
exports.AuthValidateUserServiceInput = AuthValidateUserServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthValidateUserServiceInput);
