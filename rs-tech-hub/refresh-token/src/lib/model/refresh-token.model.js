"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_user_1 = require("@rs-tech-hub/nestjs-user");
let RefreshTokenModel = class RefreshTokenModel {
    id;
    token;
    userId;
    user;
    revoked;
    replacedByToken;
    expiresAt;
    createdAt;
    updatedAt;
};
exports.RefreshTokenModel = RefreshTokenModel;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], RefreshTokenModel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], RefreshTokenModel.prototype, "token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], RefreshTokenModel.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_user_1.UserModel),
    tslib_1.__metadata("design:type", nestjs_user_1.UserModel)
], RefreshTokenModel.prototype, "user", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], RefreshTokenModel.prototype, "revoked", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], RefreshTokenModel.prototype, "replacedByToken", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", Date)
], RefreshTokenModel.prototype, "expiresAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", Date)
], RefreshTokenModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", Date)
], RefreshTokenModel.prototype, "updatedAt", void 0);
exports.RefreshTokenModel = RefreshTokenModel = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], RefreshTokenModel);
