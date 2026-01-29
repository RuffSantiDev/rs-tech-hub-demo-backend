import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LicenseLimitsService } from '../services/license-limits.service';
export declare const RequiresFeature: (feature: string) => import("@nestjs/common").CustomDecorator<string>;
export declare class FeatureGuard implements CanActivate {
    private reflector;
    private limitsService;
    constructor(reflector: Reflector, limitsService: LicenseLimitsService);
    canActivate(context: ExecutionContext): boolean;
}
//# sourceMappingURL=requires-feature.decorator.d.ts.map