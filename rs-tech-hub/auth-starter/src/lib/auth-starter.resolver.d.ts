import 'reflect-metadata';
import { AuthStarterService } from './auth-starter.service';
import { AuthActivateUserResolverInput } from './dto/resolver/input/auth-activate-user.resolver.input';
import { UpdatePasswordResolverInput } from './dto/resolver/input/updatePassword.resolver.input';
import { VerifyEmailResolverInput } from './dto/resolver/input/verifyEmail.resolver.input';
import { UpdatePasswordResolverOutput } from './dto/resolver/output/updatePassword.resolver.output';
import { VerifyEmailResolverOutput } from './dto/resolver/output/verifyEmail.resolver.output';
import { AuthLoginServiceInput } from './dto/service/input/auth-login.service.input';
import { AuthRenewActivationTokenServiceInput } from './dto/service/input/auth-renew-activation-token.service.input';
import { AuthRequestPasswordResetServiceInput } from './dto/service/input/auth-request-password-reset.service.input';
import { AuthResetPasswordServiceInput } from './dto/service/input/auth-reset-password.service.input';
import { AuthSignUpServiceInput } from './dto/service/input/auth-signup.service.input';
import { AuthCurrentUserServiceOutput } from './dto/service/output';
import { AuthLoginServiceOutput } from './dto/service/output/auth-login.service.output';
import { AuthLogoutServiceOutput } from './dto/service/output/auth-logout.service.output';
import { AuthRenewActivationTokenServiceOutput } from './dto/service/output/auth-renew-activation-token.service.output';
import { AuthRequestPasswordResetServiceOutput } from './dto/service/output/auth-request-password-reset.service.output';
import { AuthSignupServiceOutput } from './dto/service/output/auth-signup.service.output';
export declare class AuthStarterResolver {
    private authService;
    constructor(authService: AuthStarterService);
    auth_verifyEmail(input: VerifyEmailResolverInput): Promise<VerifyEmailResolverOutput>;
    auth_signUp(input: AuthSignUpServiceInput): Promise<AuthSignupServiceOutput>;
    auth_login(input: AuthLoginServiceInput): Promise<AuthLoginServiceOutput>;
    auth_refreshToken(token: string, userId: string): Promise<AuthLoginServiceOutput>;
    auth_logout(userId: string): Promise<AuthLogoutServiceOutput>;
    auth_renewActivationToken(input: AuthRenewActivationTokenServiceInput): Promise<AuthRenewActivationTokenServiceOutput>;
    auth_activateUser(input: AuthActivateUserResolverInput): Promise<boolean>;
    auth_currentUser(userId: string): Promise<AuthCurrentUserServiceOutput>;
    auth_requestPasswordReset(input: AuthRequestPasswordResetServiceInput): Promise<AuthRequestPasswordResetServiceOutput>;
    auth_resetPassword(input: AuthResetPasswordServiceInput): Promise<boolean>;
    auth_updatePassword(updatePasswordInput: UpdatePasswordResolverInput, userId: string): Promise<UpdatePasswordResolverOutput>;
}
//# sourceMappingURL=auth-starter.resolver.d.ts.map