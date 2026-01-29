"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUserOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
let AuthenticatedUserOutput = class AuthenticatedUserOutput {
    id;
    Status;
    Role;
    email;
    issuerId;
    accountId;
    createdAt;
    updatedAt;
};
exports.AuthenticatedUserOutput = AuthenticatedUserOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], AuthenticatedUserOutput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthenticatedUserOutput.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserRole, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthenticatedUserOutput.prototype, "Role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthenticatedUserOutput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthenticatedUserOutput.prototype, "issuerId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthenticatedUserOutput.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], AuthenticatedUserOutput.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], AuthenticatedUserOutput.prototype, "updatedAt", void 0);
exports.AuthenticatedUserOutput = AuthenticatedUserOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthenticatedUserOutput);
