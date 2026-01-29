# @rs-tech-hub/nestjs-test-starter

Test utilities for NestJS applications with GraphQL support. Create and remove test users and accounts for development and testing environments.

## ✨ Features

- 👥 **Test User Generation** - Create multiple test users with accounts
- 🧹 **Cleanup Utilities** - Remove all test accounts
- 🔒 **Service Protected** - GraphQL operations require service authentication
- 📊 **GraphQL API** - Mutations for test data management
- 🎲 **Random Data** - Generates unique test emails with random identifiers
- 🔄 **Batch Operations** - Create up to 5 test users at once
- 🗑️ **Token Cleanup** - Clean expired activation, refresh, and password reset tokens

## 📋 Prerequisites

- Node.js >= 18
- TypeScript >= 5.1.0
- NestJS >= 11.1.6
- Prisma ORM v7.0+
- PostgreSQL database
- GraphQL support configured in your NestJS application

## ⚠️ Important Notice

**This package is intended for development and testing environments only.** Do not use in production environments. Test users are identified by:

- Email addresses containing `@testing.com`
- Account type set to `TEST`

## 📦 Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## � Quick Start

### Module Registration

Import the module in your NestJS application:

```typescript
import { Module } from '@nestjs/common';
import { TestStarterModule } from '@rs-tech-hub/nestjs-test-starter';

@Module({
  imports: [TestStarterModule],
})
export class AppModule {}
```

## 📖 GraphQL API

### Mutations

#### Create Test Users

```graphql
mutation {
  test_signUpTestUsers(count: 5) {
    message
    count
    data
  }
}
```

**Response:**

```json
{
  "data": {
    "test_signUpTestUsers": {
      "message": "Test users created successfully",
      "count": 5,
      "data": "[{\"activationKey\":\"...\",\"account\":{...}}]"
    }
  }
}
```

#### Remove Test Accounts

```graphql
mutation {
  test_removeTestUsers {
    message
    count
    data
  }
}
```

**Response:**

```json
{
  "data": {
    "test_removeTestUsers": {
      "message": "Test user removed successfully",
      "count": 5,
      "data": "{\"deletedAccounts\":{\"success\":true,\"count\":5}}"
    }
  }
}
```

#### Clean Expired Auth Tokens

**Protected by**: `ServiceAuthGuard`

Cleans up expired activation tokens, refresh tokens, and password reset tokens.

```graphql
mutation {
  test_cleanExpiredAuthTokens {
    message
    count
    data
  }
}
```

**Response:**

```json
{
  "data": {
    "test_cleanExpiredAuthTokens": {
      "message": "Expired auth tokens cleaned successfully",
      "count": 42,
      "data": "{\"success\":true,\"cleanedActivationTokens\":15,\"cleanedRefreshTokens\":20,\"cleanedPasswordResetTokens\":7}"
    }
  }
}
```

## 💻 Service Usage

Inject the service in your own modules:

```typescript
import { Injectable } from '@nestjs/common';
import { TestStarterService } from '@rs-tech-hub/nestjs-test-starter';

@Injectable()
export class TestingService {
  constructor(private testService: TestStarterService) {}

  async setupTestEnvironment() {
    // Create 3 test users
    const result = await this.testService.signUpTestUsers(3);

    if (result.status === 'COMPLETED' && result.output) {
      console.log(`Created ${result.output.length} test users`);
      return result.output;
    }

    throw new Error('Failed to create test users');
  }

  async teardownTestEnvironment() {
    // Clean up all test accounts
    const result = await this.testService.removeTestAccounts();

    console.log(`Deleted ${result.deletedAccounts.count} accounts`);

    return result;
  }

  async cleanupExpiredTokens() {
    // Clean up expired tokens
    const result = await this.testService.cleanExpiredAuthTokens();

    console.log(`Cleaned ${result.cleanedActivationTokens} activation tokens`);
    console.log(`Cleaned ${result.cleanedRefreshTokens} refresh tokens`);
    console.log(
      `Cleaned ${result.cleanedPasswordResetTokens} password reset tokens`
    );

    return result;
  }
}
```

## 📖 API Reference

### TestStarterService Methods

#### `signUpTestUsers(count?: number): Promise<ServiceResult<number, object[]>>`

Create multiple test users with accounts.

**Parameters:**

- `count` - Number of test users to create (default: 1, max: 5)

**Returns:** ServiceResult containing array of created accounts with activation keys

**Generated User Format:**

```typescript
{
email: `testuser${rand}@testing.com`,
password: '5TrongPa$$word',
firstName: `Test  ${rand}`,
lastName: `User`,
birthDate: '1972-07-12',
}
```

#### `removeTestAccounts(): Promise<{ deletedAccounts }>`

Remove all test accounts from the database (users are cascade deleted).

**Returns:**

```typescript
{
  deletedAccounts: {
    success: boolean;
    count: number;
  }
}
```

**Deletion Criteria:**

- Accounts: Email contains `@testing.com` OR account type is `TEST`

#### `cleanExpiredAuthTokens(): Promise<object>`

Clean up all expired activation tokens, refresh tokens, and password reset tokens.

**Returns:**

```typescript
{
  success: boolean;
  cleanedActivationTokens?: number;
  cleanedRefreshTokens?: number;
  cleanedPasswordResetTokens?: number;
}
```

## 🔒 Authentication

All GraphQL mutations require service authentication via `ServiceAuthGuard`:

```typescript
@UseGuards(ServiceAuthGuard)
@Mutation(() => ResponseMessage)
async test_signUpTestUsers(@Args('count') count: number) {
  // Protected operation
}
```

Ensure your application has the proper service authentication configured from `@rs-tech-hub/nestjs-auth-core`.

## 📊 Response Types

### ResponseMessage

```typescript
{
  message: string;    // Operation result message
  count?: number;     // Number of affected records
  data?: string;      // JSON stringified operation details
}
```

## 💡 Best Practices

1. **Environment Restriction**: Only use in development/testing environments
2. **Cleanup After Tests**: Always remove test accounts after test completion
3. **Batch Creation**: Create multiple users at once (up to 5) for efficiency
4. **Unique Emails**: Random identifiers ensure unique test user emails
5. **Account Type**: Test accounts are marked with `AccountType.TEST`
6. **Password Standard**: All test users use password `5TrongPa$$word`
7. **Service Auth**: Protect mutations with service authentication
8. **Token Cleanup**: Use `cleanExpiredAuthTokens` to clean up old tokens periodically

## 🔄 Common Workflows

### Setup and Teardown in Tests

```typescript
describe('E2E Tests', () => {
  let testService: TestStarterService;
  let testUsers: any[];

  beforeAll(async () => {
    // Create test users before tests
    const result = await testService.signUpTestUsers(5);
    testUsers = result.output || [];
  });

  afterAll(async () => {
    // Clean up after all tests
    await testService.removeTestAccounts();
  });

  it('should run test with test users', () => {
    // Your test logic here
    expect(testUsers).toHaveLength(5);
  });
});
```

### Development Seeding

```typescript
@Injectable()
export class SeedService {
  constructor(private testService: TestStarterService) {}

  async seedDevelopmentData() {
    if (process.env.NODE_ENV !== 'production') {
      // Create test users for development
      await this.testService.signUpTestUsers(10);
      console.log('Development environment seeded with test users');
    }
  }
}
```

## ⚠️ Generated Test Data

Each test user is created with:

- **Email**: `testuserXX@testing.com` (XX is random number)
- **Password**: `5TrongPa$$word`
- **First Name**: `Test XX`
- **Last Name**: `User`
- **Birth Date**: `1972-07-12`
- **Account Type**: `TEST`
- **Activation Key**: Generated during signup

## � Release Notes

### 1.1.0

#### New Features

- Added `cleanExpiredAuthTokens` mutation and service method
- Cleans up expired activation tokens, refresh tokens, and password reset tokens
- Improved test account cleanup

### 1.0.2

- Fixes test_signUpTestUsers graphql endpoint
- Fixes test_removeTestUsers graphql endpoint
- Updates internal license handling

### 1.0.1

- Update TestServiceHandler

### 1.0.0

- Initial release

## 📄 License

This package requires a valid RS Tech Hub commercial license key. The software is protected by intellectual property laws and is provided under a commercial license agreement.

### License Terms

- Commercial use requires a valid license key
- Development testing allowed with free trial
- Production deployment requires a paid license from https://rstechhub.gumroad.com
- Contact insights@rs-tech-hub.com for questions and inquiries

## 🐛 Issues & Support

For issues, feature requests, or general questions contact insights@rs-tech-hub.com

Please review the docs first: https://rs-tech-hub.com/docs

## 🌐 Website

Visit the website for more information: https://rs-tech-hub.com

## Newsletter

Stay updated with the latest news and updates by subscribing to the newsletter at https://rs-tech-hub.kit.com/newsletter

---

**Built with ❤️ by RS Tech Hub**
