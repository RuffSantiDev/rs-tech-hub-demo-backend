/**
 * Licensed Products Mapping
 *
 * This class contains mappings of all packages organized by bundle tier:
 * - STARTER: Basic features for startups and MVPs (1-10 users)
 * - PROFESSIONAL: Advanced features for growing businesses (10-1000 users)
 * - ENTERPRISE: Enterprise-grade features for large organizations (1000+ users)
 */
export type BundleTier = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
export interface BundleMetadata {
    id: string;
    name: string;
    target: string;
    pricing: string;
    useCase: string;
}
export interface LicenseProvider {
    name: string;
    id: string;
}
export interface ProductConfig {
    licenseProviders: LicenseProvider[];
    id: string;
    licenseKeyName: string;
    productName: string;
    licensedModules: string[];
}
export interface BundleConfig {
    packages: readonly ProductConfig[];
    bundle: ProductConfig;
}
export declare class LicenseProductService {
    /**
     * STARTER BUNDLE
     * Target: Startups, MVPs, indie hackers (1-10 users)
     * Pricing: Free tier or $29-99/month
     */
    private static readonly STARTER_CONFIG;
    /**
     * PROFESSIONAL BUNDLE
     * Target: Growing businesses (10-1000 users)
     * Pricing: $299-999/month
     */
    private static readonly PROFESSIONAL_CONFIG;
    /**
     * ENTERPRISE BUNDLE
     * Target: Large enterprises (1000+ users)
     * Pricing: Custom (typically $2k-10k+/month)
     */
    private static readonly ENTERPRISE_CONFIG;
    /**
     * Bundle metadata
     */
    private static readonly BUNDLE_METADATA_CONFIG;
    /**
     * Cached package to bundle mapping
     */
    private static packageToBundleCache;
    /**
     * Cached list of all packages
     */
    private static allPackagesCache;
    /**
     * Get all licensed products organized by bundle tier
     */
    static get products(): {
        readonly STARTER: BundleConfig;
        readonly PROFESSIONAL: BundleConfig;
        readonly ENTERPRISE: BundleConfig;
    };
    /**
     * Get flattened list of all licensed packages across all tiers
     */
    static getAllPackages(): readonly ProductConfig[];
    /**
     * Get the package to bundle tier mapping
     */
    private static getPackageToBundleMap;
    /**
     * Check if a package is licensed
     * @param id - The name of the package to check
     * @returns True if the package is licensed, false otherwise
     */
    static isLicensedPackage(id: string): boolean;
    /**
     * Get a package configuration by id from licenseProviders
     * @param id - The id to search for in the licenseProviders array
     * @param name - Optional name to filter by (e.g., 'gumroad')
     * @returns The ProductConfig if found, null otherwise
     */
    static getPackageByProductId(id: string, name?: string): ProductConfig | null;
    static getProductById(id: string): ProductConfig | null;
    static getPackageByLicenseKeyName(licenseKeyName: string): ProductConfig | null;
    /**
     * Get the bundle tier for a specific package
     * @param id - The name of the package
     * @returns The bundle tier (STARTER, PROFESSIONAL, ENTERPRISE) or null if not found
     */
    static getPackageBundle(id: string): BundleTier | null;
    /**
     * Get all packages for a specific bundle tier
     * @param bundle - The bundle tier (STARTER, PROFESSIONAL, ENTERPRISE)
     * @returns Array of package configs for the specified bundle
     */
    static getPackagesForBundle(bundle: BundleTier): readonly ProductConfig[];
    /**
     * Get metadata for a specific bundle tier
     * @param bundle - The bundle tier (STARTER, PROFESSIONAL, ENTERPRISE)
     * @returns Bundle metadata including name, target, pricing, and use case
     */
    static getBundleMetadata(bundle: BundleTier): BundleMetadata;
    /**
     * Get all bundle metadata
     * @returns Record of all bundle metadata by tier
     */
    static getAllBundleMetadata(): Record<BundleTier, BundleMetadata>;
    /**
     * Check if a bundle tier is valid
     * @param bundle - The bundle tier to check
     * @returns True if the bundle tier is valid
     */
    static isValidBundle(bundle: string): bundle is BundleTier;
    /**
     * Get all apps for a specific bundle tier
     * @param bundle - The bundle tier
     * @returns Array of app configs or undefined if not configured
     */
    /**
     * Get statistics about the licensed products
     * @returns Object with counts of packages per bundle and total
     */
    static getStatistics(): {
        starter: number;
        professional: number;
        enterprise: number;
        total: number;
    };
}
//# sourceMappingURL=license-product.service.d.ts.map