"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
let UpdatePasswordServiceOutput = class UpdatePasswordServiceOutput {
    id;
    Status;
    Role;
    email;
};
exports.UpdatePasswordServiceOutput = UpdatePasswordServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], UpdatePasswordServiceOutput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdatePasswordServiceOutput.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserRole, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdatePasswordServiceOutput.prototype, "Role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdatePasswordServiceOutput.prototype, "email", void 0);
exports.UpdatePasswordServiceOutput = UpdatePasswordServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UpdatePasswordServiceOutput);
