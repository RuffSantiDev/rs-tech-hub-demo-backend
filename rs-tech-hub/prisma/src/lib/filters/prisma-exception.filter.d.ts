import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
/**
 * Filter for handling Prisma database exceptions
 * Converts Prisma error codes to user-friendly HTTP responses
 *
 * @example
 * @UseFilters(PrismaExceptionFilter)
 * @Controller('users')
 * export class UsersController {}
 */
export declare class PrismaExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: any, host: ArgumentsHost): void;
    private handleKnownRequestError;
    private formatUniqueConstraintMessage;
    private sanitizeMeta;
}
//# sourceMappingURL=prisma-exception.filter.d.ts.map