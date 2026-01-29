"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const refresh_token_model_1 = require("../../model/refresh-token.model");
let RefreshTokenServiceOutput = class RefreshTokenServiceOutput extends (0, graphql_1.PartialType)(refresh_token_model_1.RefreshTokenModel) {
};
exports.RefreshTokenServiceOutput = RefreshTokenServiceOutput;
exports.RefreshTokenServiceOutput = RefreshTokenServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], RefreshTokenServiceOutput);
