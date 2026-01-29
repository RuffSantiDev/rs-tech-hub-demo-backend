import { License } from './license.class';
export declare class LicenseCache {
    private _licenses;
    private _cachedAt;
    private _cacheDurationInHours?;
    private _cacheExpiryDate;
    constructor(cacheDurationInHours?: number);
    clearCache(): void;
    cacheLicenses(licenses: License[], date: Date): void;
    private setCacheExpiryDate;
    isCacheValid(nowDate: Date): boolean;
    getCachedLicenses(): License[];
    getCacheTimestamp(): Date | null;
}
//# sourceMappingURL=license-cache.class.d.ts.map