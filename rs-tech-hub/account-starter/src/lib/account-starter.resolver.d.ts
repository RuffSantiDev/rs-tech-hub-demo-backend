import { AccountStarterService } from './account-starter.service';
import { AccountStarterCreateServiceInput } from './dto/account-starter-create.service.input';
import { AccountStarterUpdateServiceInput } from './dto/account-starter-update.service.input';
import { AccountStarterServiceOutput } from './dto/account-starter.service.output';
import { AccountStarterModel } from './models/account-starter.model';
import { ValidationResult } from './types/validation-result.type';
export declare class AccountStarterResolver {
    private readonly accountService;
    constructor(accountService: AccountStarterService);
    account_getById(accountId: string): Promise<AccountStarterServiceOutput>;
    account_validateData(data: AccountStarterCreateServiceInput): Promise<ValidationResult>;
    account_update(id: string, data: AccountStarterUpdateServiceInput): Promise<AccountStarterModel>;
    account_remove(accountId: string): Promise<boolean>;
}
//# sourceMappingURL=account-starter.resolver.d.ts.map