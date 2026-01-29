export interface TransformOptions {
    dataKey?: string;
    metaKey?: string;
    statusKey?: string;
}
export interface ResponseWrapper<T> {
    success: boolean;
    data: T;
    message?: string;
    meta?: {
        timestamp: string;
        requestId: string;
        version: string;
    };
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}
export interface CacheHeadersOptions {
    maxAge?: number;
    sMaxAge?: number;
    mustRevalidate?: boolean;
    noCache?: boolean;
    noStore?: boolean;
    public?: boolean;
    private?: boolean;
    immutable?: boolean;
}
export interface SecurityHeadersOptions {
    contentSecurityPolicy?: string;
    xContentTypeOptions?: boolean;
    xFrameOptions?: string;
    xXssProtection?: boolean;
    referrerPolicy?: string;
    strictTransportSecurity?: string;
}
export interface RateLimitOptions {
    windowMs: number;
    max: number;
    headers?: boolean;
    skipSuccessfulRequests?: boolean;
    skipFailedRequests?: boolean;
}
export interface CompressionOptions {
    threshold?: number;
    level?: number;
    chunkSize?: number;
    filter?: (req: any, res: any) => boolean;
}
export interface HateoasLink {
    rel: string;
    href: string;
    method?: string;
    type?: string;
}
export interface HateoasOptions {
    baseUrl?: string;
    relations?: Record<string, (data: any) => HateoasLink[]>;
}
export interface SensitiveDataFilterOptions {
    fields?: string[];
    replacement?: string;
    deep?: boolean;
    patterns?: RegExp[];
}
export interface ETagOptions {
    weak?: boolean;
    algorithm?: 'md5' | 'sha1' | 'sha256';
}
//# sourceMappingURL=index.d.ts.map