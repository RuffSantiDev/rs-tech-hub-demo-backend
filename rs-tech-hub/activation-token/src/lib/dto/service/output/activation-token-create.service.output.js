"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationTokenCreateServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let ActivationTokenCreateServiceOutput = class ActivationTokenCreateServiceOutput {
};
exports.ActivationTokenCreateServiceOutput = ActivationTokenCreateServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActivationTokenCreateServiceOutput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActivationTokenCreateServiceOutput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActivationTokenCreateServiceOutput.prototype, "tokenHash", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActivationTokenCreateServiceOutput.prototype, "activationKey", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], ActivationTokenCreateServiceOutput.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], ActivationTokenCreateServiceOutput.prototype, "expiresAt", void 0);
exports.ActivationTokenCreateServiceOutput = ActivationTokenCreateServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ActivationTokenCreateServiceOutput);
