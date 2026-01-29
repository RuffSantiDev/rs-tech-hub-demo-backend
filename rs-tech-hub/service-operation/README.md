# @rs-tech-hub/nestjs-service-operation

A core utility package for standardized service operation execution, error handling, and logging in NestJS applications. Wraps service methods with consistent error handling, input/output sanitization, and structured result objects.

## ✨ Features

- 🎯 Standardized service operation execution
- 🛡️ Automatic error handling and logging
- 🔒 Built-in data sanitization for sensitive fields
- 📊 Structured service result objects
- 🔄 Support for sync and async operations
- 🎨 Method decorators for clean code
- 📝 Comprehensive operation logging

## 📋 Prerequisites

- Node.js >= 18
- TypeScript >= 5.1.0
- NestJS >= 11.1.6

## � Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Quick Start

### Module Registration

Import the global module in your application:

```typescript
import { Module } from '@nestjs/common';
import { ServiceFacilitatorModule } from '@rs-tech-hub/nestjs-service-operation';

@Module({
  imports: [ServiceFacilitatorModule],
})
export class AppModule {}
```

## 🔧 Usage

### Basic Service Operation

Inject `ServiceFacilitatorService` to wrap your operations:

```typescript
import { Injectable } from '@nestjs/common';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';

@Injectable()
export class UserService {
  constructor(private serviceFacilitator: ServiceFacilitatorService) {}

  async createUser(userData: CreateUserDto) {
    return await this.serviceFacilitator.executeServiceOperation(
      'create-user',
      async () => {
        // Your business logic here
        return await this.userRepository.create(userData);
      },
      userData
    );
  }
}
```

### Execute and Extract Pattern

Automatically extract data or throw errors:

```typescript
async getUser(userId: string) {
  return await this.serviceFacilitator.executeAndExtract(
    'get-user',
    async () => {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    userId,
    'user-error:not-found' // Custom error message
  );
}
```

### Hidden Operation (No Logging)

Execute operations without detailed logging:

```typescript
async validateToken(token: string) {
  return await this.serviceFacilitator.executeHiddenOperation(
    'validate-token',
    async () => {
      return await this.tokenService.verify(token);
    },
    token
  );
}
```

### Using Decorators

Apply decorators for cleaner code:

```typescript
import { Injectable } from '@nestjs/common';
import { ServiceOperation } from '@rs-tech-hub/nestjs-service-operation';

@Injectable()
export class ProductService {
  @ServiceOperation({
    operationName: 'create-product',
    logInput: true,
    logOutput: true,
  })
  async createProduct(productData: CreateProductDto) {
    // Method automatically wrapped with logging and error handling
    return await this.productRepository.create(productData);
  }
}
```

## 📖 API Reference

### ServiceFacilitatorService

#### `executeServiceOperation<I, O>(operationName, operation, input?, errorCallback?)`

Executes an operation and returns a structured `ServiceResult`.

**Parameters:**

- `operationName` (string): Name for logging and tracking
- `operation` (function): The operation to execute (sync or async)
- `input?` (I): Optional input data
- `errorCallback?` (function): Optional callback on error

**Returns:** `Promise<ServiceResult<I, O>>`

#### `executeAndExtract<I, O>(operationName, operation, input?, errorMessage?, errorCallback?)`

Executes an operation and extracts the result or throws an error.

**Parameters:**

- `operationName` (string): Name for logging and tracking
- `operation` (function): The operation to execute
- `input?` (I): Optional input data
- `errorMessage?` (string): Custom error message
- `errorCallback?` (function): Optional callback on error

**Returns:** `Promise<O>`

#### `executeHiddenOperation<I, O>(operationName, operation, input?, errorCallback?)`

Executes an operation with minimal logging.

**Parameters:**

- Same as `executeServiceOperation`

**Returns:** `Promise<O>`

#### `handleError(method, error)`

Handles and standardizes errors.

**Parameters:**

- `method` (string): Method name
- `error` (unknown): Error object

**Returns:** `ServiceError`

### ServiceResult Class

```typescript
class ServiceResult<ServiceInput, ServiceOutput> {
  name: string;
  input?: ServiceInput;
  status: ServiceStatus;
  output?: ServiceOutput;
  error?: ServiceError;

  success(output: ServiceOutput): void;
  failure(error: ServiceError): void;
  extractOrThrow(errorMessage?: string): ServiceOutput;
}
```

### ServiceStatus Enum

```typescript
enum ServiceStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  ERROR = 'ERROR',
}
```

### Decorator Options

#### `@ServiceOperation(options)`

**Options:**

- `operationName?` (string): Custom operation name
- `sanitizeInput?` (boolean): Sanitize input data (default: true)
- `logInput?` (boolean): Log input data (default: true)
- `logOutput?` (boolean): Log output data (default: false)
- `errorCallback?` (function): Error callback function

## 🔒 Data Sanitization

Sensitive fields are automatically removed from logs:

- `password`, `oldPassword`, `newPassword`
- `token`, `refreshToken`
- `hash`, `salt`
- `activationKey`, `activationToken`
- `key`, `licenseKey`

Use the `sanitizeData` helper manually:

```typescript
import { sanitizeData } from '@rs-tech-hub/nestjs-service-operation';

const sanitized = sanitizeData({
  username: 'john',
  password: 'secret123',
  email: 'john@example.com',
});
// Result: { username: 'john', email: 'john@example.com' }
```

## 💡 Best Practices

1. **Consistent naming**: Use descriptive operation names like `user-create`, `order-update`
2. **Error messages**: Provide custom error messages for better debugging
3. **Use decorators**: Apply `@ServiceOperation` for repetitive patterns
4. **Extract pattern**: Use `executeAndExtract` when you need the data directly
5. **Hidden operations**: Use `executeHiddenOperation` for sensitive operations

## Release Notes

### 1.0.0

- Initial release

### 1.0.1

- Adds setCustomLogger method to overwrite default logger

## 📄 License

This package is free and open source under the MIT License.

## 📧 Support

For technical support and inquiries:

- Email: insights@rs-tech-hub.com
