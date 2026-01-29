"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRequestPasswordResetServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthRequestPasswordResetServiceOutput = class AuthRequestPasswordResetServiceOutput {
};
exports.AuthRequestPasswordResetServiceOutput = AuthRequestPasswordResetServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthRequestPasswordResetServiceOutput.prototype, "token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Date)
], AuthRequestPasswordResetServiceOutput.prototype, "expiresAt", void 0);
exports.AuthRequestPasswordResetServiceOutput = AuthRequestPasswordResetServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthRequestPasswordResetServiceOutput);
