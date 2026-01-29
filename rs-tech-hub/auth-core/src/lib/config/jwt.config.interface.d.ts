/**
 * Configuration interface for JWT authentication
 */
export interface JwtConfig {
    /**
     * Secret key used to sign access tokens
     */
    secret: string;
    /**
     * Expiration time for access tokens
     * Examples: '15m', '1h', '7d'
     */
    expiresIn: string;
    /**
     * Secret key used to sign refresh tokens
     */
    refreshSecret?: string;
    /**
     * Expiration time for refresh tokens
     * Examples: '7d', '30d', '90d'
     */
    refreshExpiresIn?: string;
}
/**
 * Configuration interface for basic authentication
 */
export interface BasicAuthConfig {
    /**
     * Username for basic authentication
     */
    username: string;
    /**
     * Password for basic authentication
     */
    password: string;
}
/**
 * Configuration interface for service-to-service authentication
 */
export interface ServiceAuthConfig {
    /**
     * Secret token used for service-to-service authentication
     */
    serviceToken: string;
}
//# sourceMappingURL=jwt.config.interface.d.ts.map