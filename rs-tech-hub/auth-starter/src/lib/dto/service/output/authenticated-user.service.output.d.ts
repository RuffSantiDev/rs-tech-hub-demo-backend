import { UserRole, UserStatus } from '@rs-tech-hub/nestjs-prisma';
export declare class AuthenticatedUserOutput {
    id: string;
    Status?: UserStatus;
    Role?: UserRole;
    email?: string;
    issuerId?: string;
    accountId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=authenticated-user.service.output.d.ts.map