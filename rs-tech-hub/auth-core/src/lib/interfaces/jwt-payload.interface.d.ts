/**
 * Standard JWT payload structure
 * Used for both access and refresh tokens
 */
export interface JwtPayload {
    /**
     * Subject - typically the user ID
     */
    sub: string;
    /**
     * User's email address
     */
    email: string;
    /**
     * User's role(s)
     * Can be a single role or array of roles
     */
    role?: string | string[];
    /**
     * Issued at timestamp (Unix time in seconds)
     */
    iat?: number;
    /**
     * Expiration timestamp (Unix time in seconds)
     */
    exp?: number;
    /**
     * Token type - useful for distinguishing between access and refresh tokens
     */
    type?: 'access' | 'refresh' | 'service';
}
//# sourceMappingURL=jwt-payload.interface.d.ts.map