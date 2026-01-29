import { type ActivationToken, type RepositoryClass, Prisma, PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
declare const ActivationTokenBaseRepository: RepositoryClass<ActivationToken, Prisma.ActivationTokenDelegate>;
export declare class ActivationTokenRepository extends ActivationTokenBaseRepository {
    constructor(prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService);
}
export {};
//# sourceMappingURL=activation-token.repository.d.ts.map