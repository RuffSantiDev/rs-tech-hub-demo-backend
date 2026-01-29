import { OnModuleInit } from '@nestjs/common';
import { LicenseValidatorService } from '@rs-tech-hub/nestjs-license-validator';
export declare class TestStarterModule implements OnModuleInit {
    private licenseValidatorService;
    constructor(licenseValidatorService: LicenseValidatorService);
    onModuleInit(): void;
}
//# sourceMappingURL=test-starter.module.d.ts.map