"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStarterCreateServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
let AccountStarterCreateServiceInput = class AccountStarterCreateServiceInput {
    name;
    primaryEmail;
    Type;
    signupIpAddress;
    isDemoContentReady;
};
exports.AccountStarterCreateServiceInput = AccountStarterCreateServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AccountStarterCreateServiceInput.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AccountStarterCreateServiceInput.prototype, "primaryEmail", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.AccountType),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AccountStarterCreateServiceInput.prototype, "Type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIP)(),
    tslib_1.__metadata("design:type", String)
], AccountStarterCreateServiceInput.prototype, "signupIpAddress", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], AccountStarterCreateServiceInput.prototype, "isDemoContentReady", void 0);
exports.AccountStarterCreateServiceInput = AccountStarterCreateServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AccountStarterCreateServiceInput);
