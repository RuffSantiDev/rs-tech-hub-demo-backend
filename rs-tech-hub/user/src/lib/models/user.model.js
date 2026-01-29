"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const tslib_1 = require("tslib");
// src/auth/models/user.model.ts
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
(0, graphql_1.registerEnumType)(nestjs_prisma_1.UserStatus, {
    name: 'UserStatus',
    description: 'User Status enum',
});
(0, graphql_1.registerEnumType)(nestjs_prisma_1.UserRole, {
    name: 'UserRole',
    description: 'User role enum',
});
let UserModel = class UserModel {
    id;
    Status;
    Role;
    email;
    hash;
    salt;
    issuerId;
    isVerified;
    activatedAt;
    deactivatedAt;
    disabledAt;
    accountId;
    createdAt;
    updatedAt;
};
exports.UserModel = UserModel;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserRole, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "Role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "hash", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "salt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "issuerId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], UserModel.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserModel.prototype, "activatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserModel.prototype, "deactivatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserModel.prototype, "disabledAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserModel.prototype, "updatedAt", void 0);
exports.UserModel = UserModel = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UserModel);
