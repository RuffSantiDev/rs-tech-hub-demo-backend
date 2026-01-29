"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationTokenModel = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let ActivationTokenModel = class ActivationTokenModel {
};
exports.ActivationTokenModel = ActivationTokenModel;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActivationTokenModel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActivationTokenModel.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActivationTokenModel.prototype, "tokenHash", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], ActivationTokenModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], ActivationTokenModel.prototype, "expiresAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], ActivationTokenModel.prototype, "usedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], ActivationTokenModel.prototype, "isRevoked", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], ActivationTokenModel.prototype, "revokedAt", void 0);
exports.ActivationTokenModel = ActivationTokenModel = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ActivationTokenModel);
