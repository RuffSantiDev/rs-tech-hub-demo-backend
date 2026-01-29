"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSignedUpUserServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
// File: auth-signed-up-user.service.output.ts
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
let AuthSignedUpUserServiceOutput = class AuthSignedUpUserServiceOutput {
    id;
    email;
    Status;
    Role;
    accountId;
    createdAt;
    updatedAt;
};
exports.AuthSignedUpUserServiceOutput = AuthSignedUpUserServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], AuthSignedUpUserServiceOutput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AuthSignedUpUserServiceOutput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserStatus),
    tslib_1.__metadata("design:type", String)
], AuthSignedUpUserServiceOutput.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserRole, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthSignedUpUserServiceOutput.prototype, "Role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthSignedUpUserServiceOutput.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], AuthSignedUpUserServiceOutput.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], AuthSignedUpUserServiceOutput.prototype, "updatedAt", void 0);
exports.AuthSignedUpUserServiceOutput = AuthSignedUpUserServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthSignedUpUserServiceOutput);
