import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { ServiceFacilitatorService, ServiceResult } from '@rs-tech-hub/nestjs-service-operation';
import { RefreshTokenServiceOutput } from './dto/output/refresh-token.service.output';
import { RefreshTokenRepository } from './refresh-token.repository';
export declare class RefreshTokenService {
    private clock;
    private readonly serviceFacilitator;
    private readonly refreshTokenRepository;
    private readonly logger;
    constructor(clock: ClockService, serviceFacilitator: ServiceFacilitatorService, refreshTokenRepository: RefreshTokenRepository);
    createRefreshToken(userId: string, expiryDays?: number): Promise<string>;
    findUserIdByToken(token: string): Promise<{
        userId: string;
    } | null>;
    revokeAllUserTokens(userId: string): Promise<ServiceResult<string, boolean>>;
    cleanupExpiredTokens(): Promise<{
        success: boolean;
        count: number;
    }>;
    /**
     * Find a refresh token by its token value
     * @param token The token string to search for
     * @returns The refresh token if found, null otherwise
     */
    findByToken(token: string): Promise<RefreshTokenServiceOutput>;
    /**
     * Find active tokens for a user (not revoked and not expired)
     * @param userId The user ID to search for
     * @returns Array of active refresh tokens
     */
    findActiveTokensForUser(userId: string): Promise<RefreshTokenServiceOutput[]>;
    /**
     * Revoke a refresh token
     * @param tokenId The ID of the token to revoke
     * @param replacedByToken Optional new token that replaces this one
     * @returns The updated token
     */
    revokeToken(tokenId: string, replacedByToken?: string): Promise<RefreshTokenServiceOutput>;
    /**
     * Revoke a refresh token by its token value
     * @param token The token string to revoke
     * @param replacedByToken Optional new token that replaces this one
     * @returns The updated token or null if not found
     */
    revokeTokenByValue(token: string, replacedByToken?: string): Promise<RefreshTokenServiceOutput>;
    /**
     * Delete all expired and revoked tokens
     * Useful for cleaning up the database
     * @returns The number of deleted tokens
     */
    deleteExpiredAndRevokedTokens(): Promise<number>;
}
//# sourceMappingURL=refresh-token.service.d.ts.map