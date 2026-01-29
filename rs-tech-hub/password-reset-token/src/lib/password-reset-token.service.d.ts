import { ClockService } from '@rs-tech-hub/nestjs-clock';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { PasswordResetTokenValidateServiceInput } from './dto/service/input/password-reset-token-validate.service.input';
import { PasswordResetTokenVerifyServiceInput } from './dto/service/input/password-reset-token-verify.service.input';
import { PasswordResetTokenCreateServiceOutput } from './dto/service/output/password-reset-token-create.service.output';
import { PasswordResetTokenRepository } from './password-reset-token.repository';
export declare class PasswordResetTokenService {
    private clock;
    private readonly serviceFacilitator;
    private readonly passwordResetTokenRepository;
    private readonly logger;
    constructor(clock: ClockService, serviceFacilitator: ServiceFacilitatorService, passwordResetTokenRepository: PasswordResetTokenRepository);
    create(userId: string): Promise<PasswordResetTokenCreateServiceOutput>;
    validate(input: PasswordResetTokenValidateServiceInput): Promise<boolean>;
    verify(input: PasswordResetTokenVerifyServiceInput): Promise<boolean>;
    invalidatePreviousUserTokens(userId: string): Promise<boolean>;
    cleanupExpiredTokens(): Promise<{
        success: boolean;
        count: number;
    }>;
}
//# sourceMappingURL=password-reset-token.service.d.ts.map