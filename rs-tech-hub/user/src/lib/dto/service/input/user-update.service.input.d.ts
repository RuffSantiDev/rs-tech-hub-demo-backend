import { UserRole, UserStatus } from '@rs-tech-hub/nestjs-prisma';
import { UserModel } from '../../../models/user.model';
declare const UserUpdateServiceInput_base: import("@nestjs/common").Type<Partial<UserModel>>;
export declare class UserUpdateServiceInput extends UserUpdateServiceInput_base {
    email?: string;
    status?: UserStatus;
    role?: UserRole;
}
export {};
//# sourceMappingURL=user-update.service.input.d.ts.map