import { type PasswordResetToken, type RepositoryClass, Prisma, PrismaService } from '@rs-tech-hub/nestjs-prisma';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
declare const PasswordResetTokenBaseRepository: RepositoryClass<PasswordResetToken, Prisma.PasswordResetTokenDelegate>;
export declare class PasswordResetTokenRepository extends PasswordResetTokenBaseRepository {
    constructor(prisma: PrismaService, serviceFacilitator: ServiceFacilitatorService);
}
export {};
//# sourceMappingURL=password-reset-token.repository.d.ts.map