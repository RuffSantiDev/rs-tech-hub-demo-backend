import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { License } from '../classes/license.class';
import { LicenseActivationResult } from '../interfaces';
export declare class GumroadLicenseService {
    private serviceFacilitator;
    private clock;
    constructor(serviceFacilitator: ServiceFacilitatorService, clock: ClockService);
    private readonly logger;
    private GUMROAD_ACCESS_TOKEN;
    verifyLicense(license: License): Promise<License>;
    activateLicenseInstance(license: License): Promise<License>;
    deactivateLicenseInstance(license: License): Promise<License | null>;
    activateLicenseKey(license: License): Promise<License>;
    deactivateLicenseKey(license: License): Promise<LicenseActivationResult>;
    decrementUsageCount(license: License): Promise<License>;
    resetUsageCount(license: License): Promise<License>;
}
//# sourceMappingURL=gumroad-license.service.d.ts.map