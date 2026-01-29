import { Prisma, PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
declare const ProfileRepositoryBase: new (prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService) => {
    delegate: Prisma.ProfileDelegate<any, {}>;
    serviceFacilitator: ServiceFacilitatorService;
    prisma: PrismaService;
    getOperationName(operation: string): string;
    findWithSelect<T extends Record<string, true>>(where: unknown, select: T): Promise<{ [K in keyof T]: K extends "avatarUrl" | "firstName" | "lastName" | "dateOfBirth" | "country" | "userId" | "id" | "Salutation" | "createdAt" | "updatedAt" ? {
        avatarUrl: string | null;
        firstName: string | null;
        lastName: string | null;
        dateOfBirth: Date | null;
        country: string | null;
        userId: string;
        id: string;
        Salutation: import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
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
    } | undefined): Promise<{ [K in keyof T]: K extends "avatarUrl" | "firstName" | "lastName" | "dateOfBirth" | "country" | "userId" | "id" | "Salutation" | "createdAt" | "updatedAt" ? {
        avatarUrl: string | null;
        firstName: string | null;
        lastName: string | null;
        dateOfBirth: Date | null;
        country: string | null;
        userId: string;
        id: string;
        Salutation: import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        createdAt: Date;
        updatedAt: Date;
    }[K] : never; }[]>;
    findOneWithSelect<T extends Record<string, true>>(where?: unknown, select?: T | undefined): Promise<{ [K in keyof T]: K extends "avatarUrl" | "firstName" | "lastName" | "dateOfBirth" | "country" | "userId" | "id" | "Salutation" | "createdAt" | "updatedAt" ? {
        avatarUrl: string | null;
        firstName: string | null;
        lastName: string | null;
        dateOfBirth: Date | null;
        country: string | null;
        userId: string;
        id: string;
        Salutation: import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        createdAt: Date;
        updatedAt: Date;
    }[K] : never; } | null>;
    findUnique(where: ({
        userId: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
        userId: string;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }), options?: {
        select?: unknown;
        include?: unknown;
    } | undefined): Promise<any>;
    findUniqueWithSelect<T extends Record<string, true>>(where: ({
        userId: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
        userId: string;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }), select: T): Promise<{ [K in keyof T]: K extends "avatarUrl" | "firstName" | "lastName" | "dateOfBirth" | "country" | "userId" | "id" | "Salutation" | "createdAt" | "updatedAt" ? {
        avatarUrl: string | null;
        firstName: string | null;
        lastName: string | null;
        dateOfBirth: Date | null;
        country: string | null;
        userId: string;
        id: string;
        Salutation: import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        createdAt: Date;
        updatedAt: Date;
    }[K] : never; } | null>;
    findWithInclude(where?: unknown, include?: unknown): Promise<any>;
    findManyWithInclude(where?: unknown, include?: unknown, options?: {
        orderBy?: unknown;
        take?: number;
        skip?: number;
    } | undefined): Promise<any>;
    findWithFields<K extends "avatarUrl" | "firstName" | "lastName" | "dateOfBirth" | "country" | "userId" | "id" | "Salutation" | "createdAt" | "updatedAt">(where?: unknown, fields?: K[] | undefined): Promise<Pick<{
        avatarUrl: string | null;
        firstName: string | null;
        lastName: string | null;
        dateOfBirth: Date | null;
        country: string | null;
        userId: string;
        id: string;
        Salutation: import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        createdAt: Date;
        updatedAt: Date;
    }, K> | null>;
    findManyWithFields<K extends "avatarUrl" | "firstName" | "lastName" | "dateOfBirth" | "country" | "userId" | "id" | "Salutation" | "createdAt" | "updatedAt">(where?: unknown, fields?: K[] | undefined): Promise<Pick<{
        avatarUrl: string | null;
        firstName: string | null;
        lastName: string | null;
        dateOfBirth: Date | null;
        country: string | null;
        userId: string;
        id: string;
        Salutation: import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        createdAt: Date;
        updatedAt: Date;
    }, K>[]>;
    create<T extends Record<string, boolean> | undefined = undefined>(data: ({
        User?: undefined;
    } & Prisma.ProfileUncheckedCreateInput) | ({
        userId?: undefined;
    } & Prisma.ProfileCreateInput), select?: T | undefined): Promise<any>;
    update<T extends Record<string, boolean> | undefined = undefined>(where: ({
        userId: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
        userId: string;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }), data: ({
        User?: undefined;
    } & Prisma.ProfileUncheckedUpdateInput) | ({
        userId?: undefined;
    } & Prisma.ProfileUpdateInput), select?: T | undefined): Promise<any>;
    upsert<T extends Record<string, boolean> | undefined = undefined>(where: ({
        userId: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
        userId: string;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }), create: ({
        User?: undefined;
    } & Prisma.ProfileUncheckedCreateInput) | ({
        userId?: undefined;
    } & Prisma.ProfileCreateInput), update: ({
        User?: undefined;
    } & Prisma.ProfileUncheckedUpdateInput) | ({
        userId?: undefined;
    } & Prisma.ProfileUpdateInput), select?: T | undefined): Promise<any>;
    delete(where: ({
        userId: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string | undefined;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
        userId: string;
    } & {
        id?: string;
        userId?: string;
        AND?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        OR?: Prisma.ProfileWhereInput[];
        NOT?: Prisma.ProfileWhereInput | Prisma.ProfileWhereInput[];
        avatarUrl?: Prisma.StringNullableFilter<"Profile"> | string | null;
        Salutation?: Prisma.EnumProfileSalutationsNullableFilter<"Profile"> | import("@rs-tech-hub/nestjs-prisma").ProfileSalutations | null;
        firstName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        lastName?: Prisma.StringNullableFilter<"Profile"> | string | null;
        dateOfBirth?: Prisma.DateTimeNullableFilter<"Profile"> | Date | string | null;
        country?: Prisma.StringNullableFilter<"Profile"> | string | null;
        createdAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        updatedAt?: Prisma.DateTimeFilter<"Profile"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    })): Promise<any>;
    deleteMany(where?: unknown): Promise<any>;
    count(where?: unknown): Promise<number>;
    exists(where?: unknown): Promise<boolean>;
};
export declare class ProfileRepository extends ProfileRepositoryBase {
    constructor(prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService);
}
export {};
//# sourceMappingURL=profile.repository.d.ts.map