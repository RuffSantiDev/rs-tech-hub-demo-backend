"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserScheduleDeletionServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const user_service_output_1 = require("../output/user.service.output");
let UserScheduleDeletionServiceInput = class UserScheduleDeletionServiceInput {
};
exports.UserScheduleDeletionServiceInput = UserScheduleDeletionServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => user_service_output_1.UserServiceOutput),
    tslib_1.__metadata("design:type", user_service_output_1.UserServiceOutput)
], UserScheduleDeletionServiceInput.prototype, "user", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Number),
    tslib_1.__metadata("design:type", Number)
], UserScheduleDeletionServiceInput.prototype, "gracePeriodInDays", void 0);
exports.UserScheduleDeletionServiceInput = UserScheduleDeletionServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserScheduleDeletionServiceInput);
