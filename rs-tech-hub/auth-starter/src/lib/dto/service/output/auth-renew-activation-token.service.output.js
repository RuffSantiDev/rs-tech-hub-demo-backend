"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRenewActivationTokenServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthRenewActivationTokenServiceOutput = class AuthRenewActivationTokenServiceOutput {
    activationKey;
};
exports.AuthRenewActivationTokenServiceOutput = AuthRenewActivationTokenServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthRenewActivationTokenServiceOutput.prototype, "activationKey", void 0);
exports.AuthRenewActivationTokenServiceOutput = AuthRenewActivationTokenServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthRenewActivationTokenServiceOutput);
