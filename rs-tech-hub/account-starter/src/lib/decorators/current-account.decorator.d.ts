import { AccountStarterModel as Account } from '../models/account-starter.model.js';
/**
 * Extract current account from request
 * Supports both HTTP and GraphQL contexts
 *
 * @example
 * async getAccountData(@CurrentAccount() account: Account) {}
 * async getAccountData(@CurrentAccount('id') accountId: string) {}
 */
export declare const CurrentAccount: (...dataOrPipes: (keyof Account | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
//# sourceMappingURL=current-account.decorator.d.ts.map