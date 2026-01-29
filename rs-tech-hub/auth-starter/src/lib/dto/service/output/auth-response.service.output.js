"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let AuthResponseOutput = class AuthResponseOutput {
    refreshToken;
};
exports.AuthResponseOutput = AuthResponseOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], AuthResponseOutput.prototype, "token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], AuthResponseOutput.prototype, "refreshToken", void 0);
exports.AuthResponseOutput = AuthResponseOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthResponseOutput);
