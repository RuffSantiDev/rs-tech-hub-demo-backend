import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { LicenseLimitsService } from '../services/license-limits.service';
export declare class LicenseLimitInterceptor implements NestInterceptor {
    private limitsService;
    private prisma;
    constructor(limitsService: LicenseLimitsService, prisma: PrismaService);
    private readonly store;
    private readonly rateLimitOptions;
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
    private checkRecordLimits;
    private rateLimit;
    private getClientKey;
}
//# sourceMappingURL=license-limit.interceptor.d.ts.map