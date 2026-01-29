import { OnApplicationBootstrap } from '@nestjs/common';
import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { PasswordResetTokenService } from '../password-reset-token.service';
export declare class PasswordResetTokenSchedulerService implements OnApplicationBootstrap {
    private readonly passwordResetTokenService;
    private readonly clock;
    private readonly logger;
    constructor(passwordResetTokenService: PasswordResetTokenService, clock: ClockService);
    onApplicationBootstrap(): Promise<void>;
    handleTokenCleanup(): Promise<void>;
}
//# sourceMappingURL=password-reset-token.scheduler.service.d.ts.map