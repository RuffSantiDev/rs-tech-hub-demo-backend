import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { License } from '../classes/license.class';
export declare class LicenseCacheService {
    private readonly clock;
    private readonly logger;
    private cacheDurationInHours;
    private licenseCache;
    constructor(clock: ClockService);
    isCacheValid(): boolean;
    clearCache(): void;
    updateCache(licenses: License[]): void;
    getCachedLicenses(): License[];
}
//# sourceMappingURL=license-cache.service.d.ts.map