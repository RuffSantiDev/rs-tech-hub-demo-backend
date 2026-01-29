export declare enum ServiceStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    ERROR = "ERROR"
}
export declare const ServiceStatusLegacy: {
    readonly SUCCESS: ServiceStatus.COMPLETED;
    readonly FAILURE: ServiceStatus.FAILED;
    readonly ERROR: ServiceStatus.FAILED;
};
//# sourceMappingURL=serviceStatus.enum.d.ts.map