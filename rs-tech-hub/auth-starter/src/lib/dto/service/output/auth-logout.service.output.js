"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLogoutServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let AuthLogoutServiceOutput = class AuthLogoutServiceOutput {
};
exports.AuthLogoutServiceOutput = AuthLogoutServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], AuthLogoutServiceOutput.prototype, "success", void 0);
exports.AuthLogoutServiceOutput = AuthLogoutServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthLogoutServiceOutput);
