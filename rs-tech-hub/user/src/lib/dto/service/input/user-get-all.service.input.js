"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetAllServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserGetAllServiceInput = class UserGetAllServiceInput {
    page = 1;
    limit = 10;
};
exports.UserGetAllServiceInput = UserGetAllServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UserGetAllServiceInput.prototype, "page", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 10 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UserGetAllServiceInput.prototype, "limit", void 0);
exports.UserGetAllServiceInput = UserGetAllServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserGetAllServiceInput);
