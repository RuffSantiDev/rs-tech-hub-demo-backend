"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCreateDto = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const profile_create_service_input_1 = require("./profile-create.service.input");
let ProfileCreateDto = class ProfileCreateDto extends profile_create_service_input_1.ProfileCreateServiceInput {
    userId;
};
exports.ProfileCreateDto = ProfileCreateDto;
exports.ProfileCreateDto = ProfileCreateDto = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ProfileCreateDto);
