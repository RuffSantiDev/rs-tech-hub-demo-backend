import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { ActivationTokenRepository } from './activation-token.repository';
import { ActivationTokenValidateServiceInput } from './dto/service/input/activation-token-validate.service.input';
import { ActivationTokenVerifyServiceInput } from './dto/service/input/activation-token-verify.service.input';
import { ActivationTokenCreateServiceOutput } from './dto/service/output/activation-token-create.service.output';
export declare class ActivationTokenService {
    protected readonly activationTokenRepository: ActivationTokenRepository;
    protected readonly serviceFacilitator: ServiceFacilitatorService;
    protected readonly clock: ClockService;
    private readonly logger;
    constructor(activationTokenRepository: ActivationTokenRepository, serviceFacilitator: ServiceFacilitatorService, clock: ClockService);
    create(userId: string): Promise<ActivationTokenCreateServiceOutput>;
    validate(input: ActivationTokenValidateServiceInput): Promise<boolean>;
    verify(input: ActivationTokenVerifyServiceInput): Promise<boolean>;
    invalidatePreviousUserTokens(userId: string): Promise<boolean>;
    cleanupExpiredTokens(): Promise<{
        success: boolean;
        count: number;
    }>;
}
//# sourceMappingURL=activation-token.service.d.ts.map