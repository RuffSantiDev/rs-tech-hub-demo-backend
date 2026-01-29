"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUpdatePasswordServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let AuthUpdatePasswordServiceInput = class AuthUpdatePasswordServiceInput {
};
exports.AuthUpdatePasswordServiceInput = AuthUpdatePasswordServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthUpdatePasswordServiceInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthUpdatePasswordServiceInput.prototype, "oldPassword", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AuthUpdatePasswordServiceInput.prototype, "newPassword", void 0);
exports.AuthUpdatePasswordServiceInput = AuthUpdatePasswordServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthUpdatePasswordServiceInput);
