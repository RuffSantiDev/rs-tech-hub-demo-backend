"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogActivityServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
(0, graphql_1.registerEnumType)(nestjs_prisma_1.UserActivityType, {
    name: 'UserActivityType',
});
let UserLogActivityServiceInput = class UserLogActivityServiceInput {
    Type;
    userId;
};
exports.UserLogActivityServiceInput = UserLogActivityServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => nestjs_prisma_1.UserActivityType),
    tslib_1.__metadata("design:type", String)
], UserLogActivityServiceInput.prototype, "Type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], UserLogActivityServiceInput.prototype, "userId", void 0);
exports.UserLogActivityServiceInput = UserLogActivityServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserLogActivityServiceInput);
