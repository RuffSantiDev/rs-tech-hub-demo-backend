"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordResolverInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UpdatePasswordResolverInput = class UpdatePasswordResolverInput {
};
exports.UpdatePasswordResolverInput = UpdatePasswordResolverInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdatePasswordResolverInput.prototype, "oldPassword", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdatePasswordResolverInput.prototype, "newPassword", void 0);
exports.UpdatePasswordResolverInput = UpdatePasswordResolverInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdatePasswordResolverInput);
