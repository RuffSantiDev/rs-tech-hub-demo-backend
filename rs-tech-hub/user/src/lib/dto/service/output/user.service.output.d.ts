import { UserRole, UserStatus } from '@rs-tech-hub/nestjs-prisma';
export declare class UserServiceOutput {
    id: string;
    Status?: UserStatus;
    Role?: UserRole;
    email?: string;
    issuerId?: string;
    accountId?: string;
    isVerified?: boolean;
    activatedAt?: Date;
    deactivatedAt?: Date;
    disabledAt?: Date;
    softDeletedAt?: Date;
    isScheduledForDeletion?: boolean;
    scheduledDeletionAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=user.service.output.d.ts.map