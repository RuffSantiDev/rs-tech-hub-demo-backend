"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileUpdateServiceInput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const profile_model_1 = require("../model/profile.model");
let ProfileUpdateServiceInput = class ProfileUpdateServiceInput extends (0, graphql_1.PickType)(profile_model_1.ProfileModel, ['avatarUrl', 'country'], graphql_1.InputType) {
};
exports.ProfileUpdateServiceInput = ProfileUpdateServiceInput;
exports.ProfileUpdateServiceInput = ProfileUpdateServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ProfileUpdateServiceInput);
