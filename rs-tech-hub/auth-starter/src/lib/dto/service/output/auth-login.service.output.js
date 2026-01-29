"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const auth_logged_in_user_service_output_1 = require("./auth-logged-in-user.service.output");
let AuthLoginServiceOutput = class AuthLoginServiceOutput {
    refreshToken;
};
exports.AuthLoginServiceOutput = AuthLoginServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => auth_logged_in_user_service_output_1.AuthLoggedInUserServiceOutput),
    tslib_1.__metadata("design:type", auth_logged_in_user_service_output_1.AuthLoggedInUserServiceOutput)
], AuthLoginServiceOutput.prototype, "user", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], AuthLoginServiceOutput.prototype, "token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthLoginServiceOutput.prototype, "refreshToken", void 0);
exports.AuthLoginServiceOutput = AuthLoginServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthLoginServiceOutput);
