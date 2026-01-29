import { BeforeApplicationShutdown, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { License } from './classes/license.class';
import { LicenseModel } from './dto/license.model';
import { LicenseLimitsService } from './services/license-limits.service';
import { LicenseManagementService } from './services/license-management.service';
export declare enum LicenseValidatorEnvironment {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    STAGING = "staging",
    TEST = "test"
}
export declare class LicenseValidatorService implements OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown {
    private readonly licenseManagementService;
    private readonly licenseLimitsService;
    private readonly serviceFacilitator;
    private readonly logger;
    private environment;
    constructor(licenseManagementService: LicenseManagementService, licenseLimitsService: LicenseLimitsService, serviceFacilitator: ServiceFacilitatorService);
    get config(): import("./services/license-management.service").LicenseManagementConfig;
    get licenses(): License[];
    get instanceId(): string;
    onApplicationBootstrap(): Promise<{
        success: boolean;
    } | void>;
    areAllLicensesValid(): Promise<boolean>;
    areAllLicensesActive(): Promise<boolean>;
    isModuleLicensed(moduleId: string): Promise<boolean>;
    registerModule(moduleId: string): Promise<void>;
    private handleStartupLicenseValidation;
    handleHeartbeatValidation(): Promise<{
        success: boolean;
    }>;
    resetLicenseUsage(): Promise<void>;
    decrementLicenseUsage(): Promise<void>;
    getLicenseData(): Promise<LicenseModel[]>;
    onModuleDestroy(): Promise<void>;
    beforeApplicationShutdown(): Promise<void>;
}
//# sourceMappingURL=license-validator.service.d.ts.map