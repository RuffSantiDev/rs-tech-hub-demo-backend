"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRefreshTokenServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthRefreshTokenServiceInput = class AuthRefreshTokenServiceInput {
};
exports.AuthRefreshTokenServiceInput = AuthRefreshTokenServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthRefreshTokenServiceInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthRefreshTokenServiceInput.prototype, "token", void 0);
exports.AuthRefreshTokenServiceInput = AuthRefreshTokenServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthRefreshTokenServiceInput);
