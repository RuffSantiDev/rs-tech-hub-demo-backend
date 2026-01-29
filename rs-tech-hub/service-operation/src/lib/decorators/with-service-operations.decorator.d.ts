/**
 * Class decorator that ensures ErrorHandlingService is available
 * for all @ServiceOperation decorated methods.
 *
 * This decorator properly injects ErrorHandlingService as a class property
 * that can be accessed by method decorators.
 *
 * @example
 * @Injectable()
 * @WithServiceOperations()
 * export class UserService {
 *   @ServiceOperation()
 *   async createUser(input: CreateUserInput) {
 *     return this.prisma.user.create({ data: input });
 *   }
 * }
 */
export declare function WithServiceOperations(): <T extends new (...args: any[]) => any>(constructor: T) => any;
//# sourceMappingURL=with-service-operations.decorator.d.ts.map