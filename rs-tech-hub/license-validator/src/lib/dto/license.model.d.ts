declare class LicenseUsage {
    activationUsage: number;
    activationLimit: number;
    hasReachedUsageLimit: boolean;
}
declare class LicenseStatus {
    isVerified: boolean;
    verifiedAt?: Date | null;
    isValidated: boolean;
    validatedAt?: Date | null;
    isActivated: boolean;
    activatedAt?: Date | null;
    isExpired: boolean;
    expiredAt?: Date | null;
}
declare class LicensedProduct {
    id: string;
    name: string;
    marketplace: string;
    providerId: string;
    licensedModules: readonly string[] | null;
}
declare class LicenseHeartbeat {
    maxFailedAttempts: number;
    currentFailedAttempts: number;
    lastHeartbeatAt: Date | null;
    intervalInMinutes: number;
}
declare class LicenseGracePeriod {
    isAllowed: boolean;
    isInGracePeriod: boolean;
    gracePeriodStartedAt: Date | null;
    gracePeriodEndsAt: Date | null;
    gracePeriodInDays: number;
}
export declare class LicenseModel {
    identifier: string;
    environment: string;
    isDemoMode: boolean;
    isProductionInstance: boolean;
    productionInstanceIsRunning: boolean;
    provider: string;
    status: LicenseStatus;
    usage: LicenseUsage;
    product?: LicensedProduct;
    heartbeat: LicenseHeartbeat;
    gracePeriod: LicenseGracePeriod;
}
export {};
//# sourceMappingURL=license.model.d.ts.map