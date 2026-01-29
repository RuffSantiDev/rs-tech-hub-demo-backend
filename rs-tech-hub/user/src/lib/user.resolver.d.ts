import { Logger } from '@nestjs/common';
import type { AuthenticatedUser } from '@rs-tech-hub/nestjs-auth-core';
import { UserStatus } from '@rs-tech-hub/nestjs-prisma';
import { PaginatedUserResolverOutput } from './dto/resolver/output/paginated-user.resolver.output';
import { UserResolverOutput } from './dto/resolver/output/user-resolver.output';
import { UserDeactivateActiveUserServiceInput } from './dto/service/input/user-deactivate-active-user.service.input';
import { UserDeactivatePendingUserServiceInput } from './dto/service/input/user-deactivate-pending-user.service.input';
import { UserUpdateRoleServiceInput } from './dto/service/input/user-update-role.service.input';
import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    logger: Logger;
    constructor(userService: UserService);
    user_getCurrent(user: AuthenticatedUser): Promise<UserResolverOutput>;
    user_getById(id: string): Promise<UserResolverOutput>;
    user_getByEmail(email: string): Promise<UserResolverOutput>;
    user_deactivateById(userId: string): Promise<UserResolverOutput>;
    user_disableById(userId: string): Promise<UserResolverOutput>;
    user_softDeleteById(userId: string): Promise<UserResolverOutput>;
    user_deleteById(userId: string): Promise<UserResolverOutput>;
    user_getAll(page: number, limit: number): Promise<PaginatedUserResolverOutput>;
    user_emailExists(email: string): Promise<boolean>;
    user_getAllByStatus(status: UserStatus): Promise<UserResolverOutput[]>;
    user_getAllByAccountId(accountId: string): Promise<UserResolverOutput[]>;
    user_getUsersCount(): Promise<number>;
    user_getActiveUsersCount(): Promise<number>;
    user_activateById(userId: string): Promise<UserResolverOutput>;
    user_reactivateById(userId: string): Promise<UserResolverOutput>;
    user_updateRole(input: UserUpdateRoleServiceInput): Promise<UserResolverOutput>;
    user_deactivatePendingUser(input: UserDeactivatePendingUserServiceInput): Promise<UserResolverOutput>;
    user_deactivateActiveUser(input: UserDeactivateActiveUserServiceInput): Promise<UserResolverOutput>;
    user_deactivateInactiveUsers(): Promise<UserResolverOutput[]>;
    user_disableDeactivatedUsers(gracePeriodInMonths: number): Promise<UserResolverOutput[]>;
    user_scheduleSoftDeletedUsersForDeletion(): Promise<UserResolverOutput[]>;
}
//# sourceMappingURL=user.resolver.d.ts.map