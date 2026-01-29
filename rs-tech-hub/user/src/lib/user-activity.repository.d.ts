import { Prisma, PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
declare const UserActivityRepositoryBase: new (prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService) => {
    delegate: Prisma.UserActivityDelegate<any, {}>;
    serviceFacilitator: ServiceFacilitatorService;
    prisma: PrismaService;
    getOperationName(operation: string): string;
    findWithSelect<T extends Record<string, true>>(where: unknown, select: T): Promise<{ [K in keyof T]: K extends "id" | "Type" | "userId" | "createdAt" ? {
        id: string;
        Type: import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId: string;
        createdAt: Date;
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
    } | undefined): Promise<{ [K in keyof T]: K extends "id" | "Type" | "userId" | "createdAt" ? {
        id: string;
        Type: import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId: string;
        createdAt: Date;
    }[K] : never; }[]>;
    findOneWithSelect<T extends Record<string, true>>(where?: unknown, select?: T | undefined): Promise<{ [K in keyof T]: K extends "id" | "Type" | "userId" | "createdAt" ? {
        id: string;
        Type: import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId: string;
        createdAt: Date;
    }[K] : never; } | null>;
    findUnique(where: ({
        id: string | undefined;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }), options?: {
        select?: unknown;
        include?: unknown;
    } | undefined): Promise<any>;
    findUniqueWithSelect<T extends Record<string, true>>(where: ({
        id: string | undefined;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }), select: T): Promise<{ [K in keyof T]: K extends "id" | "Type" | "userId" | "createdAt" ? {
        id: string;
        Type: import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId: string;
        createdAt: Date;
    }[K] : never; } | null>;
    findWithInclude(where?: unknown, include?: unknown): Promise<any>;
    findManyWithInclude(where?: unknown, include?: unknown, options?: {
        orderBy?: unknown;
        take?: number;
        skip?: number;
    } | undefined): Promise<any>;
    findWithFields<K extends "id" | "Type" | "userId" | "createdAt">(where?: unknown, fields?: K[] | undefined): Promise<Pick<{
        id: string;
        Type: import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId: string;
        createdAt: Date;
    }, K> | null>;
    findManyWithFields<K extends "id" | "Type" | "userId" | "createdAt">(where?: unknown, fields?: K[] | undefined): Promise<Pick<{
        id: string;
        Type: import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId: string;
        createdAt: Date;
    }, K>[]>;
    create<T extends Record<string, boolean> | undefined = undefined>(data: ({
        User?: undefined;
    } & Prisma.UserActivityUncheckedCreateInput) | ({
        userId?: undefined;
    } & Prisma.UserActivityCreateInput), select?: T | undefined): Promise<any>;
    update<T extends Record<string, boolean> | undefined = undefined>(where: ({
        id: string | undefined;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }), data: ({
        User?: undefined;
    } & Prisma.UserActivityUncheckedUpdateInput) | ({
        userId?: undefined;
    } & Prisma.UserActivityUpdateInput), select?: T | undefined): Promise<any>;
    upsert<T extends Record<string, boolean> | undefined = undefined>(where: ({
        id: string | undefined;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }), create: ({
        User?: undefined;
    } & Prisma.UserActivityUncheckedCreateInput) | ({
        userId?: undefined;
    } & Prisma.UserActivityCreateInput), update: ({
        User?: undefined;
    } & Prisma.UserActivityUncheckedUpdateInput) | ({
        userId?: undefined;
    } & Prisma.UserActivityUpdateInput), select?: T | undefined): Promise<any>;
    delete(where: ({
        id: string | undefined;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    }) | ({
        id: string;
    } & {
        id?: string;
        AND?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        OR?: Prisma.UserActivityWhereInput[];
        NOT?: Prisma.UserActivityWhereInput | Prisma.UserActivityWhereInput[];
        Type?: Prisma.EnumUserActivityTypeFilter<"UserActivity"> | import("@rs-tech-hub/nestjs-prisma").UserActivityType;
        userId?: Prisma.StringFilter<"UserActivity"> | string;
        createdAt?: Prisma.DateTimeFilter<"UserActivity"> | Date | string;
        User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    })): Promise<any>;
    deleteMany(where?: unknown): Promise<any>;
    count(where?: unknown): Promise<number>;
    exists(where?: unknown): Promise<boolean>;
};
export declare class UserActivityRepository extends UserActivityRepositoryBase {
    constructor(prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService);
}
export {};
//# sourceMappingURL=user-activity.repository.d.ts.map