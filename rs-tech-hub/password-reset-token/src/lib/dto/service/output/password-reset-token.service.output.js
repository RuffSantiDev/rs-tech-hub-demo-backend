"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordTokenServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const password_reset_token_model_1 = require("src/lib/model/password-reset-token.model");
let ResetPasswordTokenServiceOutput = class ResetPasswordTokenServiceOutput extends (0, graphql_1.PartialType)(password_reset_token_model_1.PasswordResetTokenModel) {
};
exports.ResetPasswordTokenServiceOutput = ResetPasswordTokenServiceOutput;
exports.ResetPasswordTokenServiceOutput = ResetPasswordTokenServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ResetPasswordTokenServiceOutput);
