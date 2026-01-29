import { BasicAuthConfig, JwtConfig, ServiceAuthConfig } from './jwt.config.interface';
/**
 * Main authentication configuration interface
 * Aggregates all authentication-related configurations
 */
export interface AuthConfig {
    /**
     * JWT authentication configuration
     */
    jwt: JwtConfig;
    /**
     * Basic authentication configuration
     * Optional - only required if using BasicAuthGuard
     */
    basicAuth?: BasicAuthConfig;
    /**
     * Service authentication configuration
     * Optional - only required if using ServiceAuthGuard
     */
    serviceAuth?: ServiceAuthConfig;
}
//# sourceMappingURL=auth.config.interface.d.ts.map