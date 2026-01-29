"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStarterServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const account_starter_model_1 = require("../models/account-starter.model");
let AccountStarterServiceOutput = class AccountStarterServiceOutput extends (0, graphql_1.PartialType)(account_starter_model_1.AccountStarterModel) {
};
exports.AccountStarterServiceOutput = AccountStarterServiceOutput;
exports.AccountStarterServiceOutput = AccountStarterServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], AccountStarterServiceOutput);
