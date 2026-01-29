"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeactivateActiveUserServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserDeactivateActiveUserServiceInput = class UserDeactivateActiveUserServiceInput {
    id;
    gracePeriodInMonths;
};
exports.UserDeactivateActiveUserServiceInput = UserDeactivateActiveUserServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserDeactivateActiveUserServiceInput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UserDeactivateActiveUserServiceInput.prototype, "gracePeriodInMonths", void 0);
exports.UserDeactivateActiveUserServiceInput = UserDeactivateActiveUserServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserDeactivateActiveUserServiceInput);
