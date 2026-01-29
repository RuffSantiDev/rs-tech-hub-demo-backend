"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileServiceOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const profile_model_1 = require("../model/profile.model");
let ProfileServiceOutput = class ProfileServiceOutput extends (0, graphql_1.PartialType)(profile_model_1.ProfileModel) {
};
exports.ProfileServiceOutput = ProfileServiceOutput;
exports.ProfileServiceOutput = ProfileServiceOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ProfileServiceOutput);
