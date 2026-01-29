import { Prisma, PrismaService, type RefreshToken, type RepositoryClass } from '@rs-tech-hub/nestjs-prisma';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
declare const RefreshTokenBaseRepository: RepositoryClass<RefreshToken, Prisma.RefreshTokenDelegate>;
export declare class RefreshTokenRepository extends RefreshTokenBaseRepository {
    constructor(prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService);
}
export {};
//# sourceMappingURL=refresh-token.repository.d.ts.map