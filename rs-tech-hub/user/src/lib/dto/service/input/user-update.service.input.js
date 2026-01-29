"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
const class_validator_1 = require("class-validator");
const user_model_1 = require("../../../models/user.model");
let UserUpdateServiceInput = class UserUpdateServiceInput extends (0, graphql_1.PartialType)(user_model_1.UserModel) {
    email;
    status;
    role;
};
exports.UserUpdateServiceInput = UserUpdateServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLowercase)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UserUpdateServiceInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserUpdateServiceInput.prototype, "status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserUpdateServiceInput.prototype, "role", void 0);
exports.UserUpdateServiceInput = UserUpdateServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserUpdateServiceInput);
