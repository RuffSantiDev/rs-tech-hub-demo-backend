import { Logger } from '@nestjs/common';
import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { UserService } from '../user.service';
export declare class UserSchedulerService {
    private readonly userService;
    private readonly clock;
    logger: Logger;
    constructor(userService: UserService, clock: ClockService);
    handleDeactivateInactiveUsers(): Promise<void>;
}
//# sourceMappingURL=user.scheduler.service.d.ts.map