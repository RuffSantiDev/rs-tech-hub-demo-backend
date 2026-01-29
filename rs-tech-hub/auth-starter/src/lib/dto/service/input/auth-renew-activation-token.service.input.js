"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRenewActivationTokenServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthRenewActivationTokenServiceInput = class AuthRenewActivationTokenServiceInput {
    email;
};
exports.AuthRenewActivationTokenServiceInput = AuthRenewActivationTokenServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], AuthRenewActivationTokenServiceInput.prototype, "email", void 0);
exports.AuthRenewActivationTokenServiceInput = AuthRenewActivationTokenServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthRenewActivationTokenServiceInput);
