import { OnModuleInit } from '@nestjs/common';
import { LicenseValidatorService } from '@rs-tech-hub/nestjs-license-validator';
export declare class AuthStarterModule implements OnModuleInit {
    private licenseValidatorService;
    constructor(licenseValidatorService: LicenseValidatorService);
    onModuleInit(): void;
}
//# sourceMappingURL=auth-starter.module.d.ts.map