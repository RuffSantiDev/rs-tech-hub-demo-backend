"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSignupServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const auth_signed_up_user_service_output_1 = require("./auth-signed-up-user.service.output");
let AuthSignupServiceOutput = class AuthSignupServiceOutput {
    refreshToken;
};
exports.AuthSignupServiceOutput = AuthSignupServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => auth_signed_up_user_service_output_1.AuthSignedUpUserServiceOutput),
    tslib_1.__metadata("design:type", auth_signed_up_user_service_output_1.AuthSignedUpUserServiceOutput)
], AuthSignupServiceOutput.prototype, "user", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], AuthSignupServiceOutput.prototype, "token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], AuthSignupServiceOutput.prototype, "activationKey", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthSignupServiceOutput.prototype, "refreshToken", void 0);
exports.AuthSignupServiceOutput = AuthSignupServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthSignupServiceOutput);
