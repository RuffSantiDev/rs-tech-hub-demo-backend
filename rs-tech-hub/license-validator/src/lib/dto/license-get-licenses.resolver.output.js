"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseGetLicensesResolverOutput = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const license_model_1 = require("./license.model");
let LicenseGetLicensesResolverOutput = class LicenseGetLicensesResolverOutput {
};
exports.LicenseGetLicensesResolverOutput = LicenseGetLicensesResolverOutput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseGetLicensesResolverOutput.prototype, "success", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [license_model_1.LicenseModel]),
    tslib_1.__metadata("design:type", Array)
], LicenseGetLicensesResolverOutput.prototype, "licenses", void 0);
exports.LicenseGetLicensesResolverOutput = LicenseGetLicensesResolverOutput = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LicenseGetLicensesResolverOutput);
