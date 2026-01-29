"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthVerifyActivationTokenServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthVerifyActivationTokenServiceInput = class AuthVerifyActivationTokenServiceInput {
};
exports.AuthVerifyActivationTokenServiceInput = AuthVerifyActivationTokenServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthVerifyActivationTokenServiceInput.prototype, "activationToken", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthVerifyActivationTokenServiceInput.prototype, "hashedActivationToken", void 0);
exports.AuthVerifyActivationTokenServiceInput = AuthVerifyActivationTokenServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthVerifyActivationTokenServiceInput);
