import { OnApplicationBootstrap } from '@nestjs/common';
import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { RefreshTokenService } from '../refresh-token.service';
export declare class RefreshTokenSchedulerService implements OnApplicationBootstrap {
    private readonly refreshTokenService;
    private readonly clock;
    private readonly logger;
    constructor(refreshTokenService: RefreshTokenService, clock: ClockService);
    onApplicationBootstrap(): Promise<void>;
    handleTokenCleanup(): Promise<void>;
}
//# sourceMappingURL=refresh-token.scheduler.service.d.ts.map