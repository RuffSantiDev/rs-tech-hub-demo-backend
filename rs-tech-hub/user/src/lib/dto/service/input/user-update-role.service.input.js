"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateRoleServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
const class_validator_1 = require("class-validator");
let UserUpdateRoleServiceInput = class UserUpdateRoleServiceInput {
    id;
    role;
};
exports.UserUpdateRoleServiceInput = UserUpdateRoleServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserUpdateRoleServiceInput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserRole, { nullable: false }),
    (0, class_validator_1.IsEnum)(nestjs_prisma_1.UserRole),
    tslib_1.__metadata("design:type", String)
], UserUpdateRoleServiceInput.prototype, "role", void 0);
exports.UserUpdateRoleServiceInput = UserUpdateRoleServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserUpdateRoleServiceInput);
