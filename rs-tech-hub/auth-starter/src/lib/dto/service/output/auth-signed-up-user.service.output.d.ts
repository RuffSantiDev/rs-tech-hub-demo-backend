import { UserRole, UserStatus } from '@rs-tech-hub/nestjs-prisma';
export declare class AuthSignedUpUserServiceOutput {
    id: string;
    email: string;
    Status: UserStatus;
    Role?: UserRole;
    accountId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=auth-signed-up-user.service.output.d.ts.map