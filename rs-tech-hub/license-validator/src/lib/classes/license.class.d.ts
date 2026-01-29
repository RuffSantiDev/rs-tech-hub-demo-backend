import { LicenseValidatorEnvironment } from '../license-validator.service';
import { ProductConfig } from '../services/license-product.service';
export interface LicenseKey {
    name: string;
    value: string;
}
interface Product {
    id: string;
    providerId: string;
    name: string;
    marketplace: string;
    licensedModules?: readonly string[];
}
interface Heartbeat {
    maxFailedAttempts: number;
    currentFailedAttempts: number;
    lastHeartbeatAt: Date | null;
    intervalInMinutes: number;
}
interface GracePeriod {
    isAllowed: boolean;
    isInGracePeriod: boolean;
    gracePeriodStartedAt: Date | null;
    gracePeriodEndsAt: Date | null;
    gracePeriodInDays: number;
}
export declare class License {
    private readonly _id;
    private readonly _key;
    private _isDemoMode;
    private _environment;
    private _isProductionInstance;
    private _productionInstanceIsRunning;
    private _identifier;
    private _provider;
    private _instanceId;
    private _product;
    private _status;
    private _licenseCandidate;
    private _usage;
    private _gracePeriod;
    private _heartbeat;
    private _metadata;
    constructor(licenseKey: LicenseKey, isDemoMode?: boolean);
    get id(): string;
    get key(): LicenseKey;
    set isDemoMode(isDemo: boolean);
    get isDemoMode(): boolean;
    setProductionInstanceInformation(): void;
    clearProductionInstanceInformation(): void;
    get productionInstanceIsRunning(): boolean;
    get isProductionInstance(): boolean;
    set environment(env: LicenseValidatorEnvironment);
    get environment(): LicenseValidatorEnvironment;
    get identifier(): string;
    set provider(provider: string);
    get provider(): string;
    set instanceId(instanceId: string);
    get instanceId(): string | null;
    clearInstance(): void;
    initLicensedProduct(data: {
        marketplace: string;
        providerId: string;
    }): void;
    get product(): Product;
    get productId(): string;
    clearProduct(): void;
    get status(): {
        isActivated: boolean;
        activatedAt: Date | null;
        isValidated: boolean;
        validatedAt: Date | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        isExpired: boolean;
        expiredAt?: Date | null;
    };
    get verificationStatus(): {
        isVerified: boolean;
        verifiedAt: Date | null;
    };
    get validationStatus(): {
        isValidated: boolean;
        validatedAt: Date | null;
    };
    get activationStatus(): {
        isActivated: boolean;
        activatedAt: Date | null;
    };
    private clearStatus;
    verify(now: Date): void;
    unverify(now: Date): void;
    validate(now: Date): void;
    invalidate(): void;
    activate(date: Date): void;
    expire(date: Date): void;
    clearExpiry(): void;
    verificationSucceeded(now: Date): void;
    verificationFailed(now: Date): void;
    validationSucceeded(now: Date): void;
    validationFailed(now: Date): void;
    deactivate(): void;
    clearLicense(): void;
    get licenseCandidate(): ProductConfig | null;
    set licenseCandidate(pck: ProductConfig);
    clearLicenseCandidate(): void;
    setUsageLimit(limit: number): void;
    setActivationUsage(usage: number): void;
    get usage(): {
        activationUsage: number;
        activationLimit: number;
        hasReachedUsageLimit: boolean;
    };
    initGracePeriod(config: {
        isAllowed: boolean;
        gracePeriodInDays: number;
    }): void;
    get gracePeriod(): GracePeriod;
    startGracePeriod(now: Date): void;
    resetGracePeriod(): void;
    initHeartbeat(heartbeat: {
        maxFailedAttempts: number;
        intervalInMinutes: number;
    }): void;
    triggerHeartbeat(now: Date): void;
    clearHeartbeat(): void;
    handleHeartbeatFailure(now: Date): void;
    get heartbeat(): Heartbeat;
    increaseHeartbeatFailedAttempts(): void;
    resetHeartbeatFailedAttempts(): void;
    set metadata(metadata: Record<string, unknown>);
    set metaData(data: {
        customerEmail?: string;
        purchaseDate?: Date;
        expiresAt?: Date | null;
        refunded?: boolean;
        customerId?: string;
    });
    get metaData(): {
        customerEmail?: string;
        purchaseDate?: Date;
        expiresAt?: Date | null;
        refunded?: boolean;
        customerId?: string;
        additionalMetadata?: Record<string, unknown>;
    };
}
export {};
//# sourceMappingURL=license.class.d.ts.map