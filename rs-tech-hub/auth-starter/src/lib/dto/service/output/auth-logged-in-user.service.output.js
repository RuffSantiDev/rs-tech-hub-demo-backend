"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoggedInUserServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_user_1 = require("@rs-tech-hub/nestjs-user");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
let AuthLoggedInUserServiceOutput = class AuthLoggedInUserServiceOutput extends (0, graphql_1.PickType)(nestjs_user_1.UserServiceOutput, [
    'id',
    'accountId',
    'email',
    'Status',
    'Role',
]) {
};
exports.AuthLoggedInUserServiceOutput = AuthLoggedInUserServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AuthLoggedInUserServiceOutput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthLoggedInUserServiceOutput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserStatus, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthLoggedInUserServiceOutput.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserRole, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuthLoggedInUserServiceOutput.prototype, "Role", void 0);
exports.AuthLoggedInUserServiceOutput = AuthLoggedInUserServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AuthLoggedInUserServiceOutput);
