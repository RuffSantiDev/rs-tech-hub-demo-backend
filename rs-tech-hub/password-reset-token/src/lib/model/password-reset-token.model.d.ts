export declare class PasswordResetTokenModel {
    id: string;
    tokenHash: string;
    userId: string;
    expiresAt: Date;
    usedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string;
    userAgent?: string;
    isRevoked: boolean;
    revokedAt?: Date;
}
//# sourceMappingURL=password-reset-token.model.d.ts.map