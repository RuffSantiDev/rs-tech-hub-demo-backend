"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthActivateUserServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthActivateUserServiceInput = class AuthActivateUserServiceInput {
};
exports.AuthActivateUserServiceInput = AuthActivateUserServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLowercase)(),
    tslib_1.__metadata("design:type", String)
], AuthActivateUserServiceInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthActivateUserServiceInput.prototype, "activationKey", void 0);
exports.AuthActivateUserServiceInput = AuthActivateUserServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthActivateUserServiceInput);
