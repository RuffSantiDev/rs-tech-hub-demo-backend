import { AccountType } from '@rs-tech-hub/nestjs-prisma';
import { AccountStarterModel } from '../models/account-starter.model';
declare const AccountStarterUpdateServiceInput_base: import("@nestjs/common").Type<Partial<AccountStarterModel>>;
export declare class AccountStarterUpdateServiceInput extends AccountStarterUpdateServiceInput_base {
    name?: string;
    Type?: AccountType;
    signupIpAddress?: string;
    isDemoContentReady?: boolean;
}
export {};
//# sourceMappingURL=account-starter-update.service.input.d.ts.map