import { Prisma, PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
declare const AccountRepositoryBase: new (prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService) => {
    delegate: Prisma.AccountDelegate<any, {}>;
    serviceFacilitator: ServiceFacilitatorService;
    prisma: PrismaService;
    getOperationName(operation: string): string;
    findWithSelect<T extends Record<string, true>>(where: unknown, select: T): Promise<{ [K in keyof T]: K extends "name" | "id" | "primaryEmail" | "Type" | "signupIpAdress" | "isDemoContentReady" | "createdAt" | "updatedAt" ? {
        name: string;
        id: string;
        primaryEmail: string;
        Type: import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress: string | null;
        isDemoContentReady: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[K] : never; } | null>;
    findMany(where?: unknown, options?: {
        orderBy?: unknown;
        take?: number;
        skip?: number;
        select?: unknown;
        include?: unknown;
    } | undefined): Promise<any>;
    findManyWithSelect<T extends Record<string, true>>(where?: unknown, select?: T | undefined, options?: {
        orderBy?: unknown;
        take?: number;
        skip?: number;
    } | undefined): Promise<{ [K in keyof T]: K extends "name" | "id" | "primaryEmail" | "Type" | "signupIpAdress" | "isDemoContentReady" | "createdAt" | "updatedAt" ? {
        name: string;
        id: string;
        primaryEmail: string;
        Type: import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress: string | null;
        isDemoContentReady: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[K] : never; }[]>;
    findOneWithSelect<T extends Record<string, true>>(where?: unknown, select?: T | undefined): Promise<{ [K in keyof T]: K extends "name" | "id" | "primaryEmail" | "Type" | "signupIpAdress" | "isDemoContentReady" | "createdAt" | "updatedAt" ? {
        name: string;
        id: string;
        primaryEmail: string;
        Type: import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress: string | null;
        isDemoContentReady: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[K] : never; } | null>;
    findUnique(where: ({
        id: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        primaryEmail: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        id: string;
        primaryEmail: string;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }), options?: {
        select?: unknown;
        include?: unknown;
    } | undefined): Promise<any>;
    findUniqueWithSelect<T extends Record<string, true>>(where: ({
        id: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        primaryEmail: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        id: string;
        primaryEmail: string;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }), select: T): Promise<{ [K in keyof T]: K extends "name" | "id" | "primaryEmail" | "Type" | "signupIpAdress" | "isDemoContentReady" | "createdAt" | "updatedAt" ? {
        name: string;
        id: string;
        primaryEmail: string;
        Type: import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress: string | null;
        isDemoContentReady: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[K] : never; } | null>;
    findWithInclude(where?: unknown, include?: unknown): Promise<any>;
    findManyWithInclude(where?: unknown, include?: unknown, options?: {
        orderBy?: unknown;
        take?: number;
        skip?: number;
    } | undefined): Promise<any>;
    findWithFields<K extends "name" | "id" | "primaryEmail" | "Type" | "signupIpAdress" | "isDemoContentReady" | "createdAt" | "updatedAt">(where?: unknown, fields?: K[] | undefined): Promise<Pick<{
        name: string;
        id: string;
        primaryEmail: string;
        Type: import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress: string | null;
        isDemoContentReady: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, K> | null>;
    findManyWithFields<K extends "name" | "id" | "primaryEmail" | "Type" | "signupIpAdress" | "isDemoContentReady" | "createdAt" | "updatedAt">(where?: unknown, fields?: K[] | undefined): Promise<Pick<{
        name: string;
        id: string;
        primaryEmail: string;
        Type: import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress: string | null;
        isDemoContentReady: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, K>[]>;
    create<T extends Record<string, boolean> | undefined = undefined>(data: ({} & Prisma.AccountUncheckedCreateInput) | ({} & Prisma.AccountCreateInput), select?: T | undefined): Promise<any>;
    update<T extends Record<string, boolean> | undefined = undefined>(where: ({
        id: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        primaryEmail: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        id: string;
        primaryEmail: string;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }), data: ({} & Prisma.AccountUncheckedUpdateInput) | ({} & Prisma.AccountUpdateInput), select?: T | undefined): Promise<any>;
    upsert<T extends Record<string, boolean> | undefined = undefined>(where: ({
        id: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        primaryEmail: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        id: string;
        primaryEmail: string;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }), create: ({} & Prisma.AccountUncheckedCreateInput) | ({} & Prisma.AccountCreateInput), update: ({} & Prisma.AccountUncheckedUpdateInput) | ({} & Prisma.AccountUpdateInput), select?: T | undefined): Promise<any>;
    delete(where: ({
        id: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        primaryEmail: string | undefined;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    }) | ({
        id: string;
        primaryEmail: string;
    } & {
        id?: string;
        primaryEmail?: string;
        AND?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        OR?: Prisma.AccountWhereInput[];
        NOT?: Prisma.AccountWhereInput | Prisma.AccountWhereInput[];
        name?: Prisma.StringFilter<"Account"> | string;
        Type?: Prisma.EnumAccountTypeFilter<"Account"> | import("@rs-tech-hub/nestjs-prisma").AccountType;
        signupIpAdress?: Prisma.StringNullableFilter<"Account"> | string | null;
        isDemoContentReady?: Prisma.BoolFilter<"Account"> | boolean;
        createdAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Account"> | Date | string;
        Users?: Prisma.UserListRelationFilter;
    })): Promise<any>;
    deleteMany(where?: unknown): Promise<any>;
    count(where?: unknown): Promise<number>;
    exists(where?: unknown): Promise<boolean>;
};
export declare class AccountStarterRepository extends AccountRepositoryBase {
    constructor(prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService);
}
export {};
//# sourceMappingURL=account-starter.repository.d.ts.map