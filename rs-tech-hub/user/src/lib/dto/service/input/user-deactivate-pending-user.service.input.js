"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeactivatePendingUserServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserDeactivatePendingUserServiceInput = class UserDeactivatePendingUserServiceInput {
    id;
    gracePeriodInDays;
};
exports.UserDeactivatePendingUserServiceInput = UserDeactivatePendingUserServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserDeactivatePendingUserServiceInput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UserDeactivatePendingUserServiceInput.prototype, "gracePeriodInDays", void 0);
exports.UserDeactivatePendingUserServiceInput = UserDeactivatePendingUserServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserDeactivatePendingUserServiceInput);
