export declare const UserStatus: {
    readonly PENDING: "PENDING";
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly DISABLED: "DISABLED";
    readonly SOFT_DELETED: "SOFT_DELETED";
    readonly SCHEDULED_DELETION: "SCHEDULED_DELETION";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const UserRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const ProfileSalutations: {
    readonly MR: "MR";
    readonly MRS: "MRS";
    readonly MS: "MS";
    readonly DR: "DR";
    readonly NONE: "NONE";
};
export type ProfileSalutations = (typeof ProfileSalutations)[keyof typeof ProfileSalutations];
export declare const UserActivityType: {
    readonly LOGIN: "LOGIN";
    readonly LOGOUT: "LOGOUT";
    readonly REGISTER: "REGISTER";
    readonly ACTIVATE: "ACTIVATE";
    readonly DEACTIVATE: "DEACTIVATE";
    readonly DISABLE: "DISABLE";
    readonly SOFT_DELETE: "SOFT_DELETE";
    readonly SCHEDULE_DELETION: "SCHEDULE_DELETION";
    readonly REQUEST_PASSWORD_RESET: "REQUEST_PASSWORD_RESET";
    readonly RESET_PASSWORD: "RESET_PASSWORD";
    readonly REFRESH_TOKEN_REVOKED: "REFRESH_TOKEN_REVOKED";
    readonly REFRESH_TOKEN_EXPIRED: "REFRESH_TOKEN_EXPIRED";
    readonly REFRESH_TOKEN_INVALID: "REFRESH_TOKEN_INVALID";
    readonly ALL_TOKENS_REVOKED: "ALL_TOKENS_REVOKED";
    readonly UPDATE_PROFILE: "UPDATE_PROFILE";
    readonly UPDATE_PASSWORD: "UPDATE_PASSWORD";
    readonly UPDATE_EMAIL: "UPDATE_EMAIL";
    readonly UPDATE_ROLE: "UPDATE_ROLE";
    readonly REQUEST_SUPPORT: "REQUEST_SUPPORT";
    readonly DELETE: "DELETE";
};
export type UserActivityType = (typeof UserActivityType)[keyof typeof UserActivityType];
export declare const AccountType: {
    readonly FREE: "FREE";
    readonly TEST: "TEST";
};
export type AccountType = (typeof AccountType)[keyof typeof AccountType];
//# sourceMappingURL=enums.d.ts.map