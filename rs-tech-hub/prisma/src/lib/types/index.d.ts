export interface ErrorResponse {
    statusCode: number;
    message: string | string[];
    error: string;
    timestamp: string;
    path: string;
    requestId?: string;
    code?: string;
    details?: unknown;
    stack?: string;
}
export interface DatabaseErrorResponse extends ErrorResponse {
    code?: string;
    meta?: unknown;
}
//# sourceMappingURL=index.d.ts.map