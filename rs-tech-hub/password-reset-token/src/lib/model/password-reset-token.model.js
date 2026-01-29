"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetTokenModel = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let PasswordResetTokenModel = class PasswordResetTokenModel {
    ipAddress;
    userAgent;
};
exports.PasswordResetTokenModel = PasswordResetTokenModel;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenModel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenModel.prototype, "tokenHash", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenModel.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], PasswordResetTokenModel.prototype, "expiresAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], PasswordResetTokenModel.prototype, "usedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], PasswordResetTokenModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], PasswordResetTokenModel.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenModel.prototype, "ipAddress", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PasswordResetTokenModel.prototype, "userAgent", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], PasswordResetTokenModel.prototype, "isRevoked", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], PasswordResetTokenModel.prototype, "revokedAt", void 0);
exports.PasswordResetTokenModel = PasswordResetTokenModel = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], PasswordResetTokenModel);
