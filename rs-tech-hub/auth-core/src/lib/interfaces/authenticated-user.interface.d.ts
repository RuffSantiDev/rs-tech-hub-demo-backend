/**
 * Represents an authenticated user in the application
 *
 * This interface is used throughout the application to represent
 * a user who has been authenticated via JWT or other means.
 * It's attached to the request object by authentication guards.
 */
export interface AuthenticatedUser {
    /**
     * Subject - the user's unique identifier (typically user ID)
     */
    sub: string;
    /**
     * The user's email address
     */
    email: string;
    /**
     * The user's role(s) in the system
     * Can be a single role or comma-separated roles
     */
    role: string;
    /**
     * Issued at timestamp (Unix time in seconds)
     * Indicates when the JWT was created
     */
    iat?: number;
    /**
     * Expiration timestamp (Unix time in seconds)
     * Indicates when the JWT expires
     */
    exp?: number;
}
//# sourceMappingURL=authenticated-user.interface.d.ts.map