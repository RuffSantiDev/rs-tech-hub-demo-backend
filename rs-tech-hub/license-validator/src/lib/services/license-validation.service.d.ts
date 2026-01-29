import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { License } from '../classes/license.class';
import { GumroadLicenseService } from '../integrations/gumroad-license.service';
export declare class LicenseValidationService {
    private readonly gumroadLicenseService;
    private readonly serviceFacilitator;
    private readonly clock;
    private readonly logger;
    constructor(gumroadLicenseService: GumroadLicenseService, serviceFacilitator: ServiceFacilitatorService, clock: ClockService);
    validateLicenses(licenses: License[]): Promise<License[]>;
    private validateLicense;
    private handleStagingEnvironment;
    private handleProductionEnvironment;
}
//# sourceMappingURL=license-validation.service.d.ts.map