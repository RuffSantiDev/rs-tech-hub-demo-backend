"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationTokenRenewServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let ActivationTokenRenewServiceOutput = class ActivationTokenRenewServiceOutput {
};
exports.ActivationTokenRenewServiceOutput = ActivationTokenRenewServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActivationTokenRenewServiceOutput.prototype, "activationToken", void 0);
exports.ActivationTokenRenewServiceOutput = ActivationTokenRenewServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ActivationTokenRenewServiceOutput);
