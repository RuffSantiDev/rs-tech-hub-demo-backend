import { ServiceError } from '../../errors/serviceError';
import { ServiceStatus } from './serviceStatus.enum';
export declare class ServiceResult<ServiceInput = void, ServiceOutput = void> {
    name: string;
    input?: ServiceInput;
    status: ServiceStatus;
    output?: ServiceOutput;
    error?: ServiceError;
    constructor(name: string, input?: ServiceInput);
    success(output: ServiceOutput): void;
    failure(error: ServiceError): void;
    extractOrThrow(errorMessage?: string): NonNullable<ServiceOutput>;
}
//# sourceMappingURL=service.result.d.ts.map