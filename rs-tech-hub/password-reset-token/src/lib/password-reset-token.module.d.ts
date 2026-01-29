import { OnModuleInit } from '@nestjs/common';
import { LicenseValidatorService } from '@rs-tech-hub/nestjs-license-validator';
export declare class PasswordResetTokenModule implements OnModuleInit {
    private licenseValidatorService;
    constructor(licenseValidatorService: LicenseValidatorService);
    onModuleInit(): void;
}
//# sourceMappingURL=password-reset-token.module.d.ts.map