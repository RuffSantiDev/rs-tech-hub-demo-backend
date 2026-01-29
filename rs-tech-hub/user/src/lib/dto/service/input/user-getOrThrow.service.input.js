"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetOrThrowServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserGetOrThrowServiceInput = class UserGetOrThrowServiceInput {
    id;
    email;
};
exports.UserGetOrThrowServiceInput = UserGetOrThrowServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], UserGetOrThrowServiceInput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], UserGetOrThrowServiceInput.prototype, "email", void 0);
exports.UserGetOrThrowServiceInput = UserGetOrThrowServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserGetOrThrowServiceInput);
