import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly RefreshToken: "RefreshToken";
    readonly ActivationToken: "ActivationToken";
    readonly PasswordResetToken: "PasswordResetToken";
    readonly User: "User";
    readonly Profile: "Profile";
    readonly UserActivity: "UserActivity";
    readonly Account: "Account";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly token: "token";
    readonly userId: "userId";
    readonly isRevoked: "isRevoked";
    readonly revokedAt: "revokedAt";
    readonly replacedByToken: "replacedByToken";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const ActivationTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly createdAt: "createdAt";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly isRevoked: "isRevoked";
    readonly revokedAt: "revokedAt";
};
export type ActivationTokenScalarFieldEnum = (typeof ActivationTokenScalarFieldEnum)[keyof typeof ActivationTokenScalarFieldEnum];
export declare const PasswordResetTokenScalarFieldEnum: {
    readonly id: "id";
    readonly tokenHash: "tokenHash";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly isRevoked: "isRevoked";
    readonly revokedAt: "revokedAt";
};
export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly Status: "Status";
    readonly Role: "Role";
    readonly email: "email";
    readonly issuerId: "issuerId";
    readonly salt: "salt";
    readonly hash: "hash";
    readonly isVerified: "isVerified";
    readonly activatedAt: "activatedAt";
    readonly deactivatedAt: "deactivatedAt";
    readonly disabledAt: "disabledAt";
    readonly softDeletedAt: "softDeletedAt";
    readonly isScheduledForDeletion: "isScheduledForDeletion";
    readonly scheduledDeletionAt: "scheduledDeletionAt";
    readonly accountId: "accountId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ProfileScalarFieldEnum: {
    readonly id: "id";
    readonly avatarUrl: "avatarUrl";
    readonly Salutation: "Salutation";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly dateOfBirth: "dateOfBirth";
    readonly country: "country";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum];
export declare const UserActivityScalarFieldEnum: {
    readonly id: "id";
    readonly Type: "Type";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type UserActivityScalarFieldEnum = (typeof UserActivityScalarFieldEnum)[keyof typeof UserActivityScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly primaryEmail: "primaryEmail";
    readonly Type: "Type";
    readonly signupIpAdress: "signupIpAdress";
    readonly isDemoContentReady: "isDemoContentReady";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map