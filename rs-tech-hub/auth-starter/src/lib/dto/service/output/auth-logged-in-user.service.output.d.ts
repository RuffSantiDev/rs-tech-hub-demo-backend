import { UserServiceOutput } from '@rs-tech-hub/nestjs-user';
import { UserRole, UserStatus } from '@rs-tech-hub/nestjs-prisma';
declare const AuthLoggedInUserServiceOutput_base: import("@nestjs/common").Type<Pick<UserServiceOutput, "email" | "id" | "Status" | "Role" | "accountId">>;
export declare class AuthLoggedInUserServiceOutput extends AuthLoggedInUserServiceOutput_base {
    id: string;
    email?: string;
    Status?: UserStatus;
    Role?: UserRole;
}
export {};
//# sourceMappingURL=auth-logged-in-user.service.output.d.ts.map