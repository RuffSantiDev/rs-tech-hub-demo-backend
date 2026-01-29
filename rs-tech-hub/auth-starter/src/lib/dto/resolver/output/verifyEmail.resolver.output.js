"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailResolverOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let VerifyEmailResolverOutput = class VerifyEmailResolverOutput {
};
exports.VerifyEmailResolverOutput = VerifyEmailResolverOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], VerifyEmailResolverOutput.prototype, "success", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], VerifyEmailResolverOutput.prototype, "email", void 0);
exports.VerifyEmailResolverOutput = VerifyEmailResolverOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], VerifyEmailResolverOutput);
