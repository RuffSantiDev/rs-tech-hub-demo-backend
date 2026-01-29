import { ErrorHandlingService } from '../errors/error-handling.service';
import { ServiceError } from '../errors/serviceError';
import { ServiceResult } from './classes/service.result';
export declare class ServiceFacilitatorService {
    private readonly errorService;
    constructor(errorService?: ErrorHandlingService);
    private readonly logger;
    executeServiceOperation<I, O>(operationName: string, operation: (() => Promise<O>) | (() => O), input?: I, errorCallback?: (() => Promise<unknown>) | (() => unknown)): Promise<ServiceResult<I, O>>;
    executeHiddenOperation<I, O>(operationName: string, operation: (() => Promise<O>) | (() => O), input?: I, errorCallback?: (() => Promise<unknown>) | (() => unknown)): Promise<O>;
    handleError(method: string, error: unknown): ServiceError;
    private sanitizer;
    executeAndExtract<I, O>(operationName: string, operation: (() => Promise<O>) | (() => O), input?: I, errorMessage?: string, errorCallback?: (() => Promise<unknown>) | (() => unknown)): Promise<O>;
}
//# sourceMappingURL=service-facilitator.service.d.ts.map