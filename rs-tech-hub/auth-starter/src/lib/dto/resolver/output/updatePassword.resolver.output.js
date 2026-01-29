"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordResolverOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let UpdatePasswordResolverOutput = class UpdatePasswordResolverOutput {
};
exports.UpdatePasswordResolverOutput = UpdatePasswordResolverOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], UpdatePasswordResolverOutput.prototype, "success", void 0);
exports.UpdatePasswordResolverOutput = UpdatePasswordResolverOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UpdatePasswordResolverOutput);
