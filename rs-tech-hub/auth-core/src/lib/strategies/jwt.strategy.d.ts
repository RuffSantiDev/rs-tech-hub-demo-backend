import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService, configService: ConfigService);
    validate(payload: {
        sub: string;
    }): Promise<{
        userId: string;
        email: string;
    }>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map