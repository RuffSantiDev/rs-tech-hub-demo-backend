"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedUserResolverOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const user_resolver_output_1 = require("./user-resolver.output");
let PaginatedUserResolverOutput = class PaginatedUserResolverOutput {
    users;
    total;
    page;
    limit;
    totalPages;
};
exports.PaginatedUserResolverOutput = PaginatedUserResolverOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [user_resolver_output_1.UserResolverOutput]),
    tslib_1.__metadata("design:type", Array)
], PaginatedUserResolverOutput.prototype, "users", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginatedUserResolverOutput.prototype, "total", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginatedUserResolverOutput.prototype, "page", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginatedUserResolverOutput.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginatedUserResolverOutput.prototype, "totalPages", void 0);
exports.PaginatedUserResolverOutput = PaginatedUserResolverOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], PaginatedUserResolverOutput);
