"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStarterModel = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
(0, graphql_1.registerEnumType)(nestjs_prisma_1.AccountType, {
    name: 'AccountType',
    description: 'Account Type enum',
});
let AccountStarterModel = class AccountStarterModel {
    id;
    name;
    primaryEmail;
    Type;
    signupIpAddress;
    isDemoContentReady;
    createdAt;
    updatedAt;
};
exports.AccountStarterModel = AccountStarterModel;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], AccountStarterModel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AccountStarterModel.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AccountStarterModel.prototype, "primaryEmail", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.AccountType),
    tslib_1.__metadata("design:type", String)
], AccountStarterModel.prototype, "Type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AccountStarterModel.prototype, "signupIpAddress", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], AccountStarterModel.prototype, "isDemoContentReady", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Date)
], AccountStarterModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Date)
], AccountStarterModel.prototype, "updatedAt", void 0);
exports.AccountStarterModel = AccountStarterModel = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AccountStarterModel);
