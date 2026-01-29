import { UserRole, UserStatus } from '@rs-tech-hub/nestjs-prisma';
export declare class UserModel {
    id: string;
    Status?: UserStatus;
    Role?: UserRole;
    email?: string;
    hash?: string;
    salt?: string;
    issuerId?: string;
    isVerified?: boolean;
    activatedAt?: Date;
    deactivatedAt?: Date;
    disabledAt?: Date;
    accountId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=user.model.d.ts.map