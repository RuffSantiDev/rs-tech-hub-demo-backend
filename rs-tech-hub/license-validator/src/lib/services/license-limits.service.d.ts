import { LicenseManagementService } from './license-management.service';
export interface LicenseLimit {
    maxRecords?: {
        model: string;
        limit: number;
    }[];
    rateLimit?: string;
    features: string[] | 'all';
    isUnlimited?: boolean;
}
export interface LicenseLimits {
    development: LicenseLimit;
    test: LicenseLimit;
    staging: LicenseLimit;
    production: LicenseLimit;
}
export declare class LicenseLimitsService {
    private readonly licenseManagementService;
    constructor(licenseManagementService: LicenseManagementService);
    private readonly limits;
    getCurrentLimits(): LicenseLimit;
    hasFeature(feature: string): boolean;
}
//# sourceMappingURL=license-limits.service.d.ts.map