import { ConfigService } from '@nestjs/config';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { License } from '../classes/license.class';
import { GumroadLicenseService } from '../integrations/gumroad-license.service';
import { LicenseValidatorEnvironment } from '../license-validator.service';
import { LicenseActivationService } from './license-activation.service';
import { LicenseCacheService } from './license-cache.service';
import { LicenseValidationService } from './license-validation.service';
import { ProductValidationService } from './product-validation.service';
export interface LicenseManagementConfig {
    environment: LicenseValidatorEnvironment;
    isDemoMode: boolean;
    maxFailedAttempts: number;
    gracePeriodInDays: number;
    licenseActivationLimit: number;
    useGracePeriod: boolean;
    heartbeatIntervalInHours: number;
}
export declare class LicenseManagementService {
    private readonly serviceFacilitator;
    private readonly licenseCacheService;
    private readonly productValidationService;
    private readonly licenseValidationService;
    private readonly licenseActivationService;
    private readonly gumroadLicenseService;
    private readonly configService;
    private readonly logger;
    private _config;
    private _licenses;
    private _registeredModuleIds;
    private _licensedModuleIds;
    private _hasFailedHeartbeats;
    private _isInGracePeriod;
    private _hasClearedAllLicences;
    constructor(serviceFacilitator: ServiceFacilitatorService, licenseCacheService: LicenseCacheService, productValidationService: ProductValidationService, licenseValidationService: LicenseValidationService, licenseActivationService: LicenseActivationService, gumroadLicenseService: GumroadLicenseService, configService: ConfigService);
    private set config(value);
    get config(): LicenseManagementConfig;
    getEnvironment(): string;
    get licenses(): License[];
    clearLicenses(): void;
    get registeredModuleIds(): string[];
    private get licensedModuleIds();
    private set licensedModuleIds(value);
    private cleartLicensedModuleIds;
    get isDemoMode(): boolean;
    get validLicenses(): License[];
    get invalidLicenses(): License[];
    get activeLicenses(): License[];
    get expiredLicenses(): License[];
    get hasLicensesWithFailedHeartbeats(): boolean;
    set hasLicensesWithFailedHeartbeats(value: boolean);
    get isInGracePeriod(): boolean;
    set isInGracePeriod(value: boolean);
    set hasClearedAllLicences(value: boolean);
    get hasClearedAllLicences(): boolean;
    get licensesWithFailedHeartbeats(): License[];
    get licensesInGracePeriod(): License[];
    get instanceId(): string;
    private parseEnvironment;
    private setConfig;
    onModuleInit(): Promise<void>;
    registerModule(moduleId: string): void;
    initializeLicenseManager(): Promise<{
        success: boolean;
    }>;
    initializeLicenses(): Promise<{
        success: boolean;
    }>;
    initializeLicenseCandidates(): Promise<{
        success: boolean;
    }>;
    handleStartupValidation(): Promise<License[]>;
    handleHeartbeatValidation(): Promise<License[]>;
    activateLicenseInstances(): Promise<License[]>;
    deactivateLicensesInstances(): Promise<License[]>;
    isModuleLicensed(moduleId: string): Promise<boolean>;
    private handleIsModuleLicensedInStaging;
    private handleIsModuleLicensedInProduction;
    areAllLicensesValid(): Promise<boolean>;
    areAllLicensesActive(): Promise<boolean>;
    hasLicensesWithUsageLimits(): boolean;
    private getLicensesWithUsageLimits;
    resetLicenseUsage(): Promise<{
        success: boolean;
    }>;
    decrementLicenseUsage(): Promise<{
        success: boolean;
    }>;
    clearCache(): void;
    private loadLicenseKeys;
    private setLicensedModuleIdsFromValidLicenses;
}
//# sourceMappingURL=license-management.service.d.ts.map