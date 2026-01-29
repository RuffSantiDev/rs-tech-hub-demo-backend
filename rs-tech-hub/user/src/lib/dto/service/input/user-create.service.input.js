"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserCreateServiceInput = class UserCreateServiceInput {
    email;
    salt;
    hash;
    accountId;
};
exports.UserCreateServiceInput = UserCreateServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsLowercase)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UserCreateServiceInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserCreateServiceInput.prototype, "salt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserCreateServiceInput.prototype, "hash", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserCreateServiceInput.prototype, "accountId", void 0);
exports.UserCreateServiceInput = UserCreateServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserCreateServiceInput);
