"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationTokenServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const activation_token_model_1 = require("../../../model/activation-token.model");
let ActivationTokenServiceOutput = class ActivationTokenServiceOutput extends (0, graphql_1.PartialType)(activation_token_model_1.ActivationTokenModel) {
};
exports.ActivationTokenServiceOutput = ActivationTokenServiceOutput;
exports.ActivationTokenServiceOutput = ActivationTokenServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ActivationTokenServiceOutput);
