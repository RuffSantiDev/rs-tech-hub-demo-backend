"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateEmailServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserUpdateEmailServiceInput = class UserUpdateEmailServiceInput {
    id;
    email;
};
exports.UserUpdateEmailServiceInput = UserUpdateEmailServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserUpdateEmailServiceInput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLowercase)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UserUpdateEmailServiceInput.prototype, "email", void 0);
exports.UserUpdateEmailServiceInput = UserUpdateEmailServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserUpdateEmailServiceInput);
