# @rs-tech-hub/nestjs-common-interceptors

Common NestJS interceptors for standardizing HTTP responses, enhancing security, adding performance metrics, and filtering sensitive data.

## ✨ Features

- 🔒 **Security Headers** - Add security-related HTTP headers
- 📦 **Response Wrapper** - Standardize API response format
- ⏱️ **Timing** - Add response time headers
- ⏳ **Timeout** - Enforce request timeouts
- 🔄 **Transform** - Consistent response transformation
- 📝 **Serializer** - DTO-based data transformation
- 🚫 **Sensitive Data Filter** - Remove sensitive information from responses
- 🆔 **Request ID** - Add correlation IDs for request tracing
- 📄 **Pagination** - Automatic response pagination
- 🏷️ **ETag** - HTTP ETag generation for caching
- 💾 **Cache Headers** - Configure HTTP caching behavior

## 📋 Prerequisites

- Node.js ≥ 20.11.1
- NestJS ≥ 11.1.6
- TypeScript ≥ 5.1.0

## 📦 Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Usage

### Response Wrapper Interceptor

Wrap all responses in a consistent envelope format:

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ResponseWrapperInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(ResponseWrapperInterceptor)
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'John' }];
  }
}

// Response:
// {
//   "success": true,
//   "data": [{ "id": 1, "name": "John" }],
//   "meta": {
//     "timestamp": "2024-01-01T00:00:00.000Z",
//     "requestId": "abc-123",
//     "version": "1.0.0"
//   }
// }
```

### Transform Interceptor

Transform responses with custom metadata:

```typescript
import { TransformInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(
  new TransformInterceptor({
    dataKey: 'payload',
    metaKey: 'metadata',
    statusKey: 'status',
  })
)
@Controller('products')
export class ProductsController {
  @Get()
  findAll() {
    return [{ id: 1, title: 'Product A' }];
  }
}

// Response includes status, payload, metadata with request details
```

### Serializer Interceptor

Transform responses using class-transformer DTOs:

```typescript
import { SerializerInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';
import { Expose } from 'class-transformer';

class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  // password field will be excluded
}

@UseInterceptors(new SerializerInterceptor(UserDto))
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
```

### Security Headers Interceptor

Add security headers to protect against common vulnerabilities:

```typescript
import { SecurityHeadersInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(
  new SecurityHeadersInterceptor({
    contentSecurityPolicy: "default-src 'self'",
    xFrameOptions: 'DENY',
    strictTransportSecurity: 'max-age=31536000; includeSubDomains',
    referrerPolicy: 'strict-origin-when-cross-origin',
  })
)
@Controller('api')
export class ApiController {}
```

### Timing Interceptor

Add response time measurement:

```typescript
import { TimingInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(TimingInterceptor)
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

// Adds header: X-Response-Time: 45ms
```

### Timeout Interceptor

Enforce request timeouts:

```typescript
import { TimeoutInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(new TimeoutInterceptor(5000)) // 5 seconds
@Get('slow-operation')
async slowOperation() {
  return this.service.processLongTask();
}

// Throws RequestTimeoutException if exceeds 5 seconds
```

### Sensitive Data Filter Interceptor

Remove sensitive fields from responses:

```typescript
import { SensitiveDataFilterInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(new SensitiveDataFilterInterceptor({
  fields: ['password', 'ssn', 'creditCard'],
  replacement: '[REDACTED]',
  deep: true
}))
@Get()
async findAll() {
  return this.service.findAll();
}

// Automatically removes: password, token, apiKey, ssn, creditCard, etc.
```

### Request ID Interceptor

Add correlation IDs for request tracing:

```typescript
import { RequestIdInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(RequestIdInterceptor)
@Controller('users')
export class UsersController {}

// Adds headers: X-Request-Id, X-Correlation-Id
// Also available in request object: request.id
```

### Pagination Interceptor

Automatically paginate array responses:

```typescript
import { PaginationInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(PaginationInterceptor)
@Get()
async findAll(@Query() query: any) {
  return this.service.findAll();
}

// Query params: ?page=1&pageSize=10
// Response:
// {
//   "data": [...],
//   "meta": {
//     "total": 100,
//     "page": 1,
//     "pageSize": 10,
//     "totalPages": 10,
//     "hasNext": true,
//     "hasPrevious": false
//   }
// }
```

### ETag Interceptor

Generate ETags for conditional requests:

```typescript
import { ETagInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(new ETagInterceptor({
  algorithm: 'sha256',
  weak: false
}))
@Get(':id')
async findOne(@Param('id') id: string) {
  return this.service.findOne(id);
}

// Adds ETag header and handles 304 Not Modified responses
```

### Cache Headers Interceptor

Configure HTTP caching behavior:

```typescript
import { CacheHeadersInterceptor } from '@rs-tech-hub/nestjs-common-interceptors';

@UseInterceptors(new CacheHeadersInterceptor({
  maxAge: 3600,
  public: true,
  mustRevalidate: true
}))
@Get()
async findAll() {
  return this.service.findAll();
}

// Adds Cache-Control header with specified directives
```

### Global Application

Apply interceptors globally:

```typescript
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  TimingInterceptor,
  RequestIdInterceptor,
  SecurityHeadersInterceptor,
} from '@rs-tech-hub/nestjs-common-interceptors';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestIdInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new SecurityHeadersInterceptor({
        xFrameOptions: 'DENY',
      }),
    },
  ],
})
export class AppModule {}
```

## 📖 API Reference

### Available Interceptors

- **CacheHeadersInterceptor** - Add HTTP cache control headers
- **CompressionInterceptor** - Response compression (gzip/deflate)
- **ETagInterceptor** - Generate ETags for conditional requests
- **HateoasInterceptor** - Add HATEOAS links to responses
- **PaginationInterceptor** - Automatic pagination with metadata
- **RateLimitInterceptor** - Request rate limiting
- **RequestIdInterceptor** - Correlation ID generation
- **ResponseWrapperInterceptor** - Standardized response envelope
- **SecurityHeadersInterceptor** - Security HTTP headers
- **SensitiveDataFilterInterceptor** - Filter sensitive data
- **SerializerInterceptor** - DTO-based transformation
- **TimeoutInterceptor** - Request timeout enforcement
- **TimingInterceptor** - Response time measurement
- **TransformInterceptor** - Custom response transformation

### Configuration Options

#### TransformOptions

```typescript
interface TransformOptions {
  dataKey?: string; // Key for data (default: 'data')
  metaKey?: string; // Key for metadata (default: 'meta')
  statusKey?: string; // Key for status (default: 'status')
}
```

#### SecurityHeadersOptions

```typescript
interface SecurityHeadersOptions {
  contentSecurityPolicy?: string;
  xContentTypeOptions?: boolean;
  xFrameOptions?: string;
  xXssProtection?: boolean;
  referrerPolicy?: string;
  strictTransportSecurity?: string;
}
```

#### CacheHeadersOptions

```typescript
interface CacheHeadersOptions {
  maxAge?: number; // Max age in seconds
  sMaxAge?: number; // Shared cache max age
  mustRevalidate?: boolean;
  noCache?: boolean;
  noStore?: boolean;
  public?: boolean;
  private?: boolean;
  immutable?: boolean;
}
```

#### SensitiveDataFilterOptions

```typescript
interface SensitiveDataFilterOptions {
  fields?: string[]; // Additional fields to filter
  replacement?: string; // Replacement value (default: '[REDACTED]')
  deep?: boolean; // Deep object filtering
  patterns?: RegExp[]; // Regex patterns to match
}
```

#### ETagOptions

```typescript
interface ETagOptions {
  weak?: boolean; // Use weak ETags
  algorithm?: 'md5' | 'sha1' | 'sha256'; // Hash algorithm
}
```

### Response Types

#### ResponseWrapper

```typescript
interface ResponseWrapper<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}
```

#### PaginatedResponse

```typescript
interface PaginatedResponse<T> {
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
```

## 💡 Best Practices

1. **Layer Interceptors**: Apply interceptors at appropriate levels (global, controller, method)
2. **Order Matters**: Consider interceptor execution order when applying multiple
3. **Security First**: Always apply SecurityHeadersInterceptor globally
4. **Performance**: Use TimingInterceptor to identify slow endpoints
5. **Sensitive Data**: Configure SensitiveDataFilterInterceptor with your specific fields
6. **Caching**: Use ETagInterceptor and CacheHeadersInterceptor together for optimal caching
7. **Consistency**: Use ResponseWrapperInterceptor or TransformInterceptor for API consistency

## 📄 License

This package is free and open source under the MIT License.

## 📧 Support

For technical support and inquiries:

- Email: insights@rs-tech-hub.com
