import { LicenseGetLicensesResolverOutput } from './dto/license-get-licenses.resolver.output';
import { LicenseValidatorService } from './license-validator.service';
export declare class LicenseValidatorResolver {
    private readonly licenseValidatorService;
    constructor(licenseValidatorService: LicenseValidatorService);
    private readonly logger;
    license_getLicenses(): Promise<LicenseGetLicensesResolverOutput>;
    license_resetProductionUsageCount(): Promise<LicenseGetLicensesResolverOutput>;
}
//# sourceMappingURL=license-validator.resolver.d.ts.map