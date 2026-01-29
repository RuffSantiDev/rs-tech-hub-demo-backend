import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { Strategy } from 'passport-jwt';
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService, configService: ConfigService);
    validate(payload: {
        sub: string;
    }): Promise<{
        email: string;
        id: string;
        Status: import("@rs-tech-hub/nestjs-prisma").UserStatus;
    }>;
}
export {};
//# sourceMappingURL=jwt-refresh.strategy.d.ts.map