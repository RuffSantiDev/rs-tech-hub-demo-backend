import { OnModuleInit } from '@nestjs/common';
import { LicenseValidatorService } from '@rs-tech-hub/nestjs-license-validator';
export declare const UserServiceModuleName = "UserService";
export declare class UserModule implements OnModuleInit {
    private licenseValidatorService;
    constructor(licenseValidatorService: LicenseValidatorService);
    onModuleInit(): void;
}
//# sourceMappingURL=user.module.d.ts.map