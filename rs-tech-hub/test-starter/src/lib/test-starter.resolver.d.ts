import { TestStarterService } from './test-starter.service';
export declare class ResponseMessage {
    message: string;
    count?: number;
    data?: string;
}
export declare class TestStarterResolver {
    private readonly testService;
    constructor(testService: TestStarterService);
    test_signUpTestUsers(count: number): Promise<{
        message: string;
        count: number;
        data: string;
    } | {
        message: string;
        count?: undefined;
        data?: undefined;
    }>;
    test_removeTestUsers(): Promise<{
        message: string;
        count: number;
        data: string;
    } | {
        message: string;
        count: number;
        data?: undefined;
    } | {
        message: string;
        count?: undefined;
        data?: undefined;
    }>;
    test_cleanExpiredAuthTokens(): Promise<{
        message: string;
        count: number;
        data: string;
    } | {
        message: string;
        count?: undefined;
        data?: undefined;
    }>;
}
//# sourceMappingURL=test-starter.resolver.d.ts.map