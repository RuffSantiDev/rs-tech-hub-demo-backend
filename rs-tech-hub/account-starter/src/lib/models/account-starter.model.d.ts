import { AccountType } from '@rs-tech-hub/nestjs-prisma';
export declare class AccountStarterModel {
    id: string;
    name: string;
    primaryEmail: string;
    Type: AccountType;
    signupIpAddress?: string;
    isDemoContentReady: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=account-starter.model.d.ts.map