"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStarterUpdateServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
const class_validator_1 = require("class-validator");
const account_starter_model_1 = require("../models/account-starter.model");
let AccountStarterUpdateServiceInput = class AccountStarterUpdateServiceInput extends (0, graphql_1.PartialType)(account_starter_model_1.AccountStarterModel) {
    name;
    Type;
    signupIpAddress;
    isDemoContentReady;
};
exports.AccountStarterUpdateServiceInput = AccountStarterUpdateServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AccountStarterUpdateServiceInput.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.AccountType, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(nestjs_prisma_1.AccountType),
    tslib_1.__metadata("design:type", String)
], AccountStarterUpdateServiceInput.prototype, "Type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIP)(),
    tslib_1.__metadata("design:type", String)
], AccountStarterUpdateServiceInput.prototype, "signupIpAddress", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], AccountStarterUpdateServiceInput.prototype, "isDemoContentReady", void 0);
exports.AccountStarterUpdateServiceInput = AccountStarterUpdateServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AccountStarterUpdateServiceInput);
