import { ActivationTokenService } from './activation-token.service';
export declare class ActivationTokenResolver {
    private readonly activationTokenService;
    constructor(activationTokenService: ActivationTokenService);
    activationToken_create(userId: string): Promise<boolean>;
}
//# sourceMappingURL=activation-token.resolver.d.ts.map