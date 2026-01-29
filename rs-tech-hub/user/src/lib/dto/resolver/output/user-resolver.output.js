"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolverOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
let UserResolverOutput = class UserResolverOutput {
    id;
    Status;
    Role;
    email;
    issuerId;
    isVerified;
    activatedAt;
    deactivatedAt;
    disabledAt;
    softDeletedAt;
    isScheduledForDeletion;
    scheduledDeletionAt;
    accountId;
    createdAt;
    updatedAt;
};
exports.UserResolverOutput = UserResolverOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], UserResolverOutput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserResolverOutput.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserRole, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserResolverOutput.prototype, "Role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserResolverOutput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserResolverOutput.prototype, "issuerId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], UserResolverOutput.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserResolverOutput.prototype, "activatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserResolverOutput.prototype, "deactivatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserResolverOutput.prototype, "disabledAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserResolverOutput.prototype, "softDeletedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], UserResolverOutput.prototype, "isScheduledForDeletion", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserResolverOutput.prototype, "scheduledDeletionAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserResolverOutput.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserResolverOutput.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserResolverOutput.prototype, "updatedAt", void 0);
exports.UserResolverOutput = UserResolverOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UserResolverOutput);
