"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseModel = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let LicenseUsage = class LicenseUsage {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], LicenseUsage.prototype, "activationUsage", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], LicenseUsage.prototype, "activationLimit", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseUsage.prototype, "hasReachedUsageLimit", void 0);
LicenseUsage = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LicenseUsage);
let LicenseStatus = class LicenseStatus {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseStatus.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], LicenseStatus.prototype, "verifiedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseStatus.prototype, "isValidated", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], LicenseStatus.prototype, "validatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseStatus.prototype, "isActivated", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], LicenseStatus.prototype, "activatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseStatus.prototype, "isExpired", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], LicenseStatus.prototype, "expiredAt", void 0);
LicenseStatus = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LicenseStatus);
let LicensedProduct = class LicensedProduct {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LicensedProduct.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LicensedProduct.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LicensedProduct.prototype, "marketplace", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LicensedProduct.prototype, "providerId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], LicensedProduct.prototype, "licensedModules", void 0);
LicensedProduct = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LicensedProduct);
let LicenseHeartbeat = class LicenseHeartbeat {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], LicenseHeartbeat.prototype, "maxFailedAttempts", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], LicenseHeartbeat.prototype, "currentFailedAttempts", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], LicenseHeartbeat.prototype, "lastHeartbeatAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], LicenseHeartbeat.prototype, "intervalInMinutes", void 0);
LicenseHeartbeat = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LicenseHeartbeat);
let LicenseGracePeriod = class LicenseGracePeriod {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseGracePeriod.prototype, "isAllowed", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseGracePeriod.prototype, "isInGracePeriod", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], LicenseGracePeriod.prototype, "gracePeriodStartedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], LicenseGracePeriod.prototype, "gracePeriodEndsAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], LicenseGracePeriod.prototype, "gracePeriodInDays", void 0);
LicenseGracePeriod = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LicenseGracePeriod);
let LicenseModel = class LicenseModel {
};
exports.LicenseModel = LicenseModel;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LicenseModel.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LicenseModel.prototype, "environment", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseModel.prototype, "isDemoMode", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseModel.prototype, "isProductionInstance", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], LicenseModel.prototype, "productionInstanceIsRunning", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LicenseModel.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => LicenseStatus),
    tslib_1.__metadata("design:type", LicenseStatus)
], LicenseModel.prototype, "status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", LicenseUsage)
], LicenseModel.prototype, "usage", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => LicensedProduct),
    tslib_1.__metadata("design:type", LicensedProduct)
], LicenseModel.prototype, "product", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => LicenseHeartbeat),
    tslib_1.__metadata("design:type", LicenseHeartbeat)
], LicenseModel.prototype, "heartbeat", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => LicenseGracePeriod),
    tslib_1.__metadata("design:type", LicenseGracePeriod)
], LicenseModel.prototype, "gracePeriod", void 0);
exports.LicenseModel = LicenseModel = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LicenseModel);
