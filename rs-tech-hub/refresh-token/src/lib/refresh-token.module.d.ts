import { OnModuleInit } from '@nestjs/common';
import { LicenseValidatorService } from '@rs-tech-hub/nestjs-license-validator';
export declare class RefreshTokenModule implements OnModuleInit {
    private licenseValidatorService;
    constructor(licenseValidatorService: LicenseValidatorService);
    onModuleInit(): void;
}
//# sourceMappingURL=refresh-token.module.d.ts.map