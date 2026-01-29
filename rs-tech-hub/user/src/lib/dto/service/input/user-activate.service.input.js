"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivateServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserActivateServiceInput = class UserActivateServiceInput {
    id;
};
exports.UserActivateServiceInput = UserActivateServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserActivateServiceInput.prototype, "id", void 0);
exports.UserActivateServiceInput = UserActivateServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserActivateServiceInput);
