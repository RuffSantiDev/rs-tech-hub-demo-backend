import { License } from '../classes/license.class';
/**
 * Configuration interface for the LicenseValidatorService
 */
export interface LicenseValidatorConfig {
    /**
     * The LemonSqueezy license key to validate
     */
    licenseKey: string;
    /**
     * The application environment
     */
    environment: 'development' | 'production' | 'staging' | 'test';
    /**
     * Optional package name to check in license metadata
     * If specified, validates that the license includes access to this package
     */
    moduleId: string;
    instanceId?: string;
    activationLimit?: number;
    /**
     * Whether to validate the license on application startup
     * @default true
     */
    validateOnStartup?: boolean;
    /**
     * Whether to cache validation results
     * @default true
     */
    cacheValidation?: boolean;
    /**
     * Duration in hours to cache validation results
     * @default 24
     */
    cacheDuration?: number;
    /**
     * Interval in minutes between validation checks (heartbeat)
     * Set to 0 to disable heartbeat
     * @default 60
     */
    heartbeatInterval?: number;
    /**
     * Callback function executed when license becomes invalid
     * This happens when:
     * - License is deactivated
     * - Instance is replaced by another server
     * - License expires
     * - Validation fails
     */
    onLicenseInvalidated?: () => void | Promise<void>;
}
export interface Instance {
    id: string;
    name: string;
    createdAt: Date;
}
/**
 * License validation result
 */
export interface LicenseValidationResult {
    /**
     * Error message if validation failed
     */
    error?: string;
    /**
     * License details
     */
    license: License | null;
}
export interface LicenseActivationResult {
    /**
     * Error message if validation failed
     */
    error?: string;
    /**
     * License details
     */
    license: License | null;
    /**
     * Instance details
     */
    instance: Instance | null;
}
//# sourceMappingURL=license-validator.interfaces.d.ts.map