"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const authenticated_user_service_output_1 = require("./authenticated-user.service.output");
let AuthenticationOutput = class AuthenticationOutput {
    refreshToken;
};
exports.AuthenticationOutput = AuthenticationOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => authenticated_user_service_output_1.AuthenticatedUserOutput),
    tslib_1.__metadata("design:type", authenticated_user_service_output_1.AuthenticatedUserOutput)
], AuthenticationOutput.prototype, "user", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: false }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthenticationOutput.prototype, "token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthenticationOutput.prototype, "refreshToken", void 0);
exports.AuthenticationOutput = AuthenticationOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthenticationOutput);
