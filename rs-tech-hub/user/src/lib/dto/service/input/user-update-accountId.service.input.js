"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateAccountIdServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserUpdateAccountIdServiceInput = class UserUpdateAccountIdServiceInput {
    id;
    accountId;
};
exports.UserUpdateAccountIdServiceInput = UserUpdateAccountIdServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserUpdateAccountIdServiceInput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserUpdateAccountIdServiceInput.prototype, "accountId", void 0);
exports.UserUpdateAccountIdServiceInput = UserUpdateAccountIdServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserUpdateAccountIdServiceInput);
