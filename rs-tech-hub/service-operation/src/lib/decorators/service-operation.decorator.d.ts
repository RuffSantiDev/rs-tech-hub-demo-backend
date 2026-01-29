export interface ServiceOperationOptions {
    operationName?: string;
    sanitizeInput?: boolean;
    errorCallback?: () => Promise<unknown> | unknown;
    logInput?: boolean;
    logOutput?: boolean;
}
export declare function ServiceOperation(options?: ServiceOperationOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
//# sourceMappingURL=service-operation.decorator.d.ts.map