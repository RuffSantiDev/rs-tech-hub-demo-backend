"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLogoutServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthLogoutServiceInput = class AuthLogoutServiceInput {
};
exports.AuthLogoutServiceInput = AuthLogoutServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthLogoutServiceInput.prototype, "userId", void 0);
exports.AuthLogoutServiceInput = AuthLogoutServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthLogoutServiceInput);
