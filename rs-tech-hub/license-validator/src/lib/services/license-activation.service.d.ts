import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { License } from '../classes/license.class';
import { GumroadLicenseService } from '../integrations/gumroad-license.service';
export declare class LicenseActivationService {
    private readonly gumroadLicenseService;
    private readonly serviceFacilitator;
    private readonly logger;
    private instanceId;
    constructor(gumroadLicenseService: GumroadLicenseService, serviceFacilitator: ServiceFacilitatorService);
    activateLicenseInstances(licenses: License[]): Promise<License[]>;
    deactivateLicenseInstances(licenses: License[]): Promise<License[]>;
    deactivateExpiredLicenses(licenses: License[]): Promise<License[]>;
    getInstanceId(): string;
    private getInactiveLicenses;
    private generateInstanceId;
}
//# sourceMappingURL=license-activation.service.d.ts.map