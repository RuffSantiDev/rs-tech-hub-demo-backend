export interface ServiceOperationResultOptions {
    operationName?: string;
    sanitizeInput?: boolean;
    errorCallback?: () => Promise<unknown> | unknown;
}
/**
 * Decorator that wraps method execution in ServiceResult.
 * Returns ServiceResult instead of throwing errors.
 *
 * Use this when you want to handle errors programmatically
 * instead of catching exceptions.
 *
 * @example
 * @Injectable()
 * @WithServiceOperations()
 * export class UserService {
 *   @ServiceOperationResult()
 *   async createUser(input: CreateUserInput): Promise<ServiceResult<CreateUserInput, User>> {
 *     return this.prisma.user.create({ data: input });
 *   }
 * }
 *
 * // Usage:
 * const result = await userService.createUser(input);
 * if (result.status === ServiceStatus.COMPLETED) {
 *   return result.output;
 * } else {
 *   handleError(result.error);
 * }
 */
export declare function ServiceOperationResult(options?: ServiceOperationResultOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
//# sourceMappingURL=service-operation-result.decorator.d.ts.map