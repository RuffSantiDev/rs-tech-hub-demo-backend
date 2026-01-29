import { OnApplicationBootstrap } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { LicenseValidatorService } from '../license-validator.service';
export declare class LicenseHeartbeatSchedulerService implements OnApplicationBootstrap {
    private readonly licenseValidatorService;
    private readonly clock;
    private readonly schedulerRegistry;
    private readonly logger;
    constructor(licenseValidatorService: LicenseValidatorService, clock: ClockService, schedulerRegistry: SchedulerRegistry);
    onApplicationBootstrap(): void;
    handleLicenseHeartbeat(): Promise<void>;
}
//# sourceMappingURL=license-heartbeat.scheduler.service.d.ts.map