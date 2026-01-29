import { AccountStarterRepository } from '@rs-tech-hub/nestjs-account-starter';
import { ActivationTokenService } from '@rs-tech-hub/nestjs-activation-token';
import { AuthStarterService } from '@rs-tech-hub/nestjs-auth-starter';
import { PasswordResetTokenService } from '@rs-tech-hub/nestjs-password-reset-token';
import { PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { RefreshTokenService } from '@rs-tech-hub/nestjs-refresh-token';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
export declare class TestStarterService {
    protected readonly prisma: PrismaService;
    protected authService: AuthStarterService;
    protected readonly accountRepository: AccountStarterRepository;
    protected readonly serviceFacilitator: ServiceFacilitatorService;
    protected readonly activationTokenService: ActivationTokenService;
    protected readonly refreshTokenService: RefreshTokenService;
    protected readonly passwordResetTokenService: PasswordResetTokenService;
    private readonly logger;
    constructor(prisma: PrismaService, authService: AuthStarterService, accountRepository: AccountStarterRepository, serviceFacilitator: ServiceFacilitatorService, activationTokenService: ActivationTokenService, refreshTokenService: RefreshTokenService, passwordResetTokenService: PasswordResetTokenService);
    signUpTestUsers(countInput?: number): Promise<import("@rs-tech-hub/nestjs-service-operation").ServiceResult<number, object[]>>;
    removeTestAccounts(): Promise<{
        deletedAccounts: {
            success: boolean;
            count: number;
        };
    }>;
    cleanExpiredAuthTokens(): Promise<{
        success: boolean;
        cleanedRefreshTokens?: number;
        cleanedActivationTokens?: number;
        cleanedPasswordResetTokens?: number;
    }>;
}
//# sourceMappingURL=test-starter.service.d.ts.map