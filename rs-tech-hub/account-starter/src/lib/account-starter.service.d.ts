import { ValidationResult } from './types/validation-result.type';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { AccountStarterRepository } from './account-starter.repository';
import { AccountStarterCreateServiceInput } from './dto/account-starter-create.service.input';
import { AccountStarterUpdateServiceInput } from './dto/account-starter-update.service.input';
import { AccountStarterServiceOutput } from './dto/account-starter.service.output';
import { AccountStarterModel } from './models/account-starter.model';
export declare class AccountStarterService {
    private serviceFacilitator;
    private readonly accountRepository;
    private readonly logger;
    constructor(serviceFacilitator: ServiceFacilitatorService, accountRepository: AccountStarterRepository);
    getOneById(accountId: string): Promise<AccountStarterServiceOutput>;
    removeOneById(accountId: string): Promise<boolean>;
    validateAccountData(data: AccountStarterCreateServiceInput): Promise<ValidationResult>;
    handleAccountCreation(data: AccountStarterCreateServiceInput): Promise<AccountStarterModel>;
    handleAccountUpdate(id: string, data: AccountStarterUpdateServiceInput): Promise<AccountStarterModel>;
}
//# sourceMappingURL=account-starter.service.d.ts.map