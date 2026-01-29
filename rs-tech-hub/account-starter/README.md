# @rs-tech-hub/nestjs-account-starter

Basic account management for NestJS applications with GraphQL support. Create, read, update, and delete user accounts with built-in validation and email uniqueness checks.

## 🔑 License

**This package requires a valid commercial license.** A valid license key must be configured to use this package.

Visit https://rstechhub.gumroad.com to purchase a license.

## ✨ Features

- ✅ CRUD operations for account management
- 🔍 Account retrieval by ID
- ✉️ Email uniqueness validation
- 🛡️ Built-in data validation
- 📊 GraphQL API with resolvers
- 🔄 Account update with conflict detection

## 📋 Prerequisites

- Node.js >= 18
- TypeScript >= 5.1.0
- NestJS >= 11.1.6
- Prisma ORM v7.0+
- GraphQL support configured in your NestJS application

## � Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Quick Start

### Module Registration

Import the module in your NestJS application:

```typescript
import { Module } from '@nestjs/common';
import { AccountStarterModule } from '@rs-tech-hub/nestjs-account-starter';

@Module({
  imports: [AccountStarterModule],
})
export class AppModule {}
```

## 📖 GraphQL API

### Queries

#### Get Account by ID

```graphql
query {
  account_getById(accountId: "account-id-here") {
    account {
      id
      name
      primaryEmail
      Type
      createdAt
      updatedAt
    }
  }
}
```

#### Validate Account Data

```graphql
query {
  account_validateData(
    data: {
      name: "Example Company"
      primaryEmail: "contact@example.com"
      Type: BUSINESS
      signupIpAddress: "192.168.1.1"
    }
  ) {
    isValid
    errors
    message
  }
}
```

### Mutations

#### Create Account

```graphql
mutation {
  account_create(
    data: {
      name: "Example Company"
      primaryEmail: "contact@example.com"
      Type: BUSINESS
      signupIpAddress: "192.168.1.1"
      isDemoContentReady: false
    }
  ) {
    account {
      id
      name
      primaryEmail
      Type
      createdAt
    }
  }
}
```

#### Update Account

```graphql
mutation {
  account_update(
    id: "account-id-here"
    data: { name: "Updated Company Name", primaryEmail: "newemail@example.com" }
  ) {
    account {
      id
      name
      primaryEmail
      updatedAt
    }
  }
}
```

#### Remove Account

```graphql
mutation {
  account_remove(accountId: "account-id-here") {
    account
  }
}
```

## 🔧 Service Usage

Inject the service in your own modules:

```typescript
import { Injectable } from '@nestjs/common';
import { AccountStarterService } from '@rs-tech-hub/nestjs-account-starter';

@Injectable()
export class YourService {
  constructor(private accountService: AccountStarterService) {}

  async getAccount(id: string) {
    return await this.accountService.getOneById(id);
  }

  async updateAccount(id: string, data) {
    return await this.accountService.handleAccountUpdate(id, data);
  }

  async deleteAccount(id: string) {
    return await this.accountService.removeOneById(id);
  }

  async validateAccount(data) {
    return await this.accountService.validateAccountData(data);
  }
}
```

## 📝 Data Types

### AccountType Enum

- `PERSONAL` - Personal account
- `BUSINESS` - Business account

### Input Fields

#### Create Account Input

| Field              | Type        | Required | Description                        |
| ------------------ | ----------- | -------- | ---------------------------------- |
| name               | string      | ✅        | Account name                       |
| primaryEmail       | string      | ✅        | Valid email address                |
| Type               | AccountType | ✅        | Account type                       |
| signupIpAddress    | string      | ❌        | IP address at signup               |
| isDemoContentReady | boolean     | ❌        | Demo content flag (default: false) |

#### Update Account Input

All fields are optional. Only provided fields will be updated.

## ⚠️ Error Codes

| Error Code                           | Description             |
| ------------------------------------ | ----------------------- |
| `account-error:validation-failed`    | Input validation failed |
| `account-error:email-already-exists` | Email is already in use |
| `account-error:not-found`            | Account not found       |
| `account-error:creation-failed`      | Account creation failed |
| `account-error:update-failed`        | Account update failed   |
| `account-error:deletion-failed`      | Account deletion failed |
| `account-error:id-undefined`         | Account ID is undefined |

## 📄 License

This package requires a valid commercial license. See LICENSE.txt for details.


## Release Notes

### 1.0.0

- Initial release

### 1.0.1

- Fixes account_getById graphql endpoint
- Removes account_create, accounts should be created through auth_signup
- Adds ServiceAuthGuards to account_getById, account_validateData,account_update,account_remove
- Updates internal license handling
  
### 1.0.2

- Fixes issue in AccountStarterService.validateAccountData()

## 📧 Support

For technical support and inquiries:

- Email: insights@rs-tech-hub.com
- Website: https://rs-tech-hub.com
