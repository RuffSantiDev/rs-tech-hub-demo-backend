"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
let UserServiceOutput = class UserServiceOutput {
    id;
    Status;
    Role;
    email;
    issuerId;
    accountId;
    isVerified;
    activatedAt;
    deactivatedAt;
    disabledAt;
    softDeletedAt;
    isScheduledForDeletion;
    scheduledDeletionAt;
    createdAt;
    updatedAt;
};
exports.UserServiceOutput = UserServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], UserServiceOutput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserServiceOutput.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserRole, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserServiceOutput.prototype, "Role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserServiceOutput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserServiceOutput.prototype, "issuerId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserServiceOutput.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], UserServiceOutput.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserServiceOutput.prototype, "activatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserServiceOutput.prototype, "deactivatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserServiceOutput.prototype, "disabledAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserServiceOutput.prototype, "softDeletedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], UserServiceOutput.prototype, "isScheduledForDeletion", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserServiceOutput.prototype, "scheduledDeletionAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserServiceOutput.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], UserServiceOutput.prototype, "updatedAt", void 0);
exports.UserServiceOutput = UserServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UserServiceOutput);
