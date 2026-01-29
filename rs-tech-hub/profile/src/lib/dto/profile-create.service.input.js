"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCreateServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let ProfileCreateServiceInput = class ProfileCreateServiceInput {
    avatarUrl;
    salutation;
    firstName;
    lastName;
    dateOfBirth;
    country;
};
exports.ProfileCreateServiceInput = ProfileCreateServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], ProfileCreateServiceInput.prototype, "avatarUrl", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProfileCreateServiceInput.prototype, "salutation", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProfileCreateServiceInput.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProfileCreateServiceInput.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", Date)
], ProfileCreateServiceInput.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProfileCreateServiceInput.prototype, "country", void 0);
exports.ProfileCreateServiceInput = ProfileCreateServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ProfileCreateServiceInput);
