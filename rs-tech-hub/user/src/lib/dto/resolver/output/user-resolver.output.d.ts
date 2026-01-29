import { UserRole, UserStatus } from '@rs-tech-hub/nestjs-prisma';
export declare class UserResolverOutput {
    id: string;
    Status?: UserStatus;
    Role?: UserRole;
    email?: string;
    issuerId?: string;
    isVerified?: boolean;
    activatedAt?: Date;
    deactivatedAt?: Date;
    disabledAt?: Date;
    softDeletedAt?: Date;
    isScheduledForDeletion?: boolean;
    scheduledDeletionAt?: Date;
    accountId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=user-resolver.output.d.ts.map