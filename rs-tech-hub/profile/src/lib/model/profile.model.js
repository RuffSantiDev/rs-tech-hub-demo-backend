"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
const class_validator_1 = require("class-validator");
(0, graphql_1.registerEnumType)(nestjs_prisma_1.ProfileSalutations, {
    name: 'ProfileSalutations', // this one is mandatory
    description: 'The salutation of the profile', // this one is optional
});
let ProfileModel = class ProfileModel {
    id;
    avatarUrl;
    Salutation;
    firstName;
    lastName;
    dateOfBirth;
    country;
    userId;
};
exports.ProfileModel = ProfileModel;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], ProfileModel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProfileModel.prototype, "avatarUrl", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.ProfileSalutations),
    tslib_1.__metadata("design:type", String)
], ProfileModel.prototype, "Salutation", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], ProfileModel.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], ProfileModel.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], ProfileModel.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], ProfileModel.prototype, "country", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], ProfileModel.prototype, "userId", void 0);
exports.ProfileModel = ProfileModel = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ProfileModel);
