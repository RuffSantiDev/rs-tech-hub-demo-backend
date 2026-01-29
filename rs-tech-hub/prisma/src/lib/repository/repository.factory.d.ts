import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { PrismaService } from '../prisma.service';
type PrismaDelegate = {
    findFirst: (...args: any[]) => any;
    findMany: (...args: any[]) => any;
    findUnique: (...args: any[]) => any;
    create: (...args: any[]) => any;
    update: (...args: any[]) => any;
    upsert: (...args: any[]) => any;
    delete: (...args: any[]) => any;
    deleteMany: (...args: any[]) => any;
    count: (...args: any[]) => any;
};
export type RepositoryClass<TModel extends Record<string, unknown>, TDelegate extends PrismaDelegate> = ReturnType<typeof createRepository<TModel, TDelegate>>;
export declare function createRepository<TModel extends Record<string, unknown>, TDelegate extends PrismaDelegate>(getDelegateFromPrisma: (prisma: PrismaService) => TDelegate, repositoryName: string): {
    new (prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService): {
        delegate: TDelegate;
        serviceFacilitator: ServiceFacilitatorService;
        prisma: PrismaService;
        getOperationName(operation: string): string;
        findWithSelect<T extends Record<string, true>>(where: (TDelegate["findMany"] extends infer T_1 ? T_1 extends TDelegate["findMany"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, select: T): Promise<{ [K in keyof T]: K extends keyof TModel ? TModel[K] : never; } | null>;
        findMany(where?: (TDelegate["findMany"] extends infer T ? T extends TDelegate["findMany"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, options?: {
            orderBy?: (TDelegate["findMany"] extends infer T_1 ? T_1 extends TDelegate["findMany"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
                orderBy?: infer O;
            } ? O : unknown;
            take?: number;
            skip?: number;
            select?: (TDelegate["findFirst"] extends infer T_2 ? T_2 extends TDelegate["findFirst"] ? T_2 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
                select?: infer S;
            } ? S : unknown;
            include?: (TDelegate["findFirst"] extends infer T_3 ? T_3 extends TDelegate["findFirst"] ? T_3 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
                include?: infer I;
            } ? I : unknown;
        }): Promise<any>;
        findManyWithSelect<T extends Record<string, true>>(where?: (TDelegate["findMany"] extends infer T_1 ? T_1 extends TDelegate["findMany"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, select?: T, options?: {
            orderBy?: (TDelegate["findMany"] extends infer T_2 ? T_2 extends TDelegate["findMany"] ? T_2 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
                orderBy?: infer O;
            } ? O : unknown;
            take?: number;
            skip?: number;
        }): Promise<Array<{ [K in keyof T]: K extends keyof TModel ? TModel[K] : never; }>>;
        findOneWithSelect<T extends Record<string, true>>(where?: (TDelegate["findMany"] extends infer T_1 ? T_1 extends TDelegate["findMany"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, select?: T): Promise<{ [K in keyof T]: K extends keyof TModel ? TModel[K] : never; } | null>;
        findUnique(where: (TDelegate["findUnique"] extends infer T ? T extends TDelegate["findUnique"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, options?: {
            select?: (TDelegate["findFirst"] extends infer T_1 ? T_1 extends TDelegate["findFirst"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
                select?: infer S;
            } ? S : unknown;
            include?: (TDelegate["findFirst"] extends infer T_2 ? T_2 extends TDelegate["findFirst"] ? T_2 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
                include?: infer I;
            } ? I : unknown;
        }): Promise<any>;
        findUniqueWithSelect<T extends Record<string, true>>(where: (TDelegate["findUnique"] extends infer T_1 ? T_1 extends TDelegate["findUnique"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, select: T): Promise<{ [K in keyof T]: K extends keyof TModel ? TModel[K] : never; } | null>;
        findWithInclude(where?: (TDelegate["findMany"] extends infer T ? T extends TDelegate["findMany"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, include?: (TDelegate["findFirst"] extends infer T_1 ? T_1 extends TDelegate["findFirst"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            include?: infer I;
        } ? I : unknown): Promise<any>;
        findManyWithInclude(where?: (TDelegate["findMany"] extends infer T ? T extends TDelegate["findMany"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, include?: (TDelegate["findFirst"] extends infer T_1 ? T_1 extends TDelegate["findFirst"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            include?: infer I;
        } ? I : unknown, options?: {
            orderBy?: (TDelegate["findMany"] extends infer T_2 ? T_2 extends TDelegate["findMany"] ? T_2 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
                orderBy?: infer O;
            } ? O : unknown;
            take?: number;
            skip?: number;
        }): Promise<any>;
        findWithFields<K extends keyof TModel>(where?: (TDelegate["findMany"] extends infer T ? T extends TDelegate["findMany"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, fields?: K[]): Promise<Pick<TModel, K> | null>;
        findManyWithFields<K extends keyof TModel>(where?: (TDelegate["findMany"] extends infer T ? T extends TDelegate["findMany"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, fields?: K[]): Promise<Pick<TModel, K>[]>;
        create<T extends Record<string, boolean> | undefined = undefined>(data: (TDelegate["create"] extends infer T_1 ? T_1 extends TDelegate["create"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            data?: infer D;
        } ? D : unknown, select?: T): Promise<any>;
        update<T extends Record<string, boolean> | undefined = undefined>(where: (TDelegate["findUnique"] extends infer T_1 ? T_1 extends TDelegate["findUnique"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, data: (TDelegate["update"] extends infer T_2 ? T_2 extends TDelegate["update"] ? T_2 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            data?: infer D;
        } ? D : unknown, select?: T): Promise<any>;
        upsert<T extends Record<string, boolean> | undefined = undefined>(where: (TDelegate["findUnique"] extends infer T_1 ? T_1 extends TDelegate["findUnique"] ? T_1 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown, create: (TDelegate["create"] extends infer T_2 ? T_2 extends TDelegate["create"] ? T_2 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            data?: infer D;
        } ? D : unknown, update: (TDelegate["update"] extends infer T_3 ? T_3 extends TDelegate["update"] ? T_3 extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            data?: infer D_1;
        } ? D_1 : unknown, select?: T): Promise<any>;
        delete(where: (TDelegate["findUnique"] extends infer T ? T extends TDelegate["findUnique"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown): Promise<any>;
        deleteMany(where?: (TDelegate["findMany"] extends infer T ? T extends TDelegate["findMany"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown): Promise<any>;
        count(where?: (TDelegate["findMany"] extends infer T ? T extends TDelegate["findMany"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown): Promise<number>;
        exists(where?: (TDelegate["findMany"] extends infer T ? T extends TDelegate["findMany"] ? T extends (...args: infer A) => any ? A extends [infer First, ...any[]] ? First : never : never : never : never) extends {
            where?: infer W;
        } ? W : unknown): Promise<boolean>;
    };
};
export {};
//# sourceMappingURL=repository.factory.d.ts.map