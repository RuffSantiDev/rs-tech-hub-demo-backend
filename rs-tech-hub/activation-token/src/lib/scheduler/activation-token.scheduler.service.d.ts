import { OnApplicationBootstrap } from '@nestjs/common';
import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { ActivationTokenService } from '../activation-token.service';
export declare class ActivationTokenSchedulerService implements OnApplicationBootstrap {
    private readonly activationTokenService;
    private readonly clock;
    private readonly logger;
    constructor(activationTokenService: ActivationTokenService, clock: ClockService);
    onApplicationBootstrap(): Promise<void>;
    handleTokenCleanup(): Promise<void>;
}
//# sourceMappingURL=activation-token.scheduler.service.d.ts.map