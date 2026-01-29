"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedUserServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const user_service_output_1 = require("./user.service.output");
let PaginatedUserServiceOutput = class PaginatedUserServiceOutput {
    users;
    total;
    page;
    limit;
    totalPages;
};
exports.PaginatedUserServiceOutput = PaginatedUserServiceOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [user_service_output_1.UserServiceOutput]),
    tslib_1.__metadata("design:type", Array)
], PaginatedUserServiceOutput.prototype, "users", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginatedUserServiceOutput.prototype, "total", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginatedUserServiceOutput.prototype, "page", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginatedUserServiceOutput.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginatedUserServiceOutput.prototype, "totalPages", void 0);
exports.PaginatedUserServiceOutput = PaginatedUserServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], PaginatedUserServiceOutput);
