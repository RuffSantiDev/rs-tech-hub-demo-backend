# @rs-tech-hub/nestjs-auth-starter

Complete authentication system for NestJS applications with GraphQL support. Handles user registration, login, email verification, password management, password reset, and JWT token refresh with integrated account, profile, and user management.

## ✨ Features

- 🔐 Complete JWT authentication with access & refresh tokens
- 📧 Email verification with activation tokens
- 👤 User registration with automatic account & profile creation
- 🔄 Token refresh mechanism
- 🔒 Password update functionality for authenticated users
- 🔑 Password reset flow with secure reset tokens
- 🚪 Secure login and logout
- ✉️ Activation token renewal
- 📊 GraphQL API with resolvers
- 🛡️ Role-based access control with guards
- 🛡️ Protected by ServiceAuthGuard and GqlAuthGuard
- 🔄 Automatic user reactivation on login
- 🚫 Blocks disabled users from authentication

## 📋 Prerequisites

- Node.js >= 18
- TypeScript >= 5.1.0
- NestJS >= 11.1.6
- Prisma ORM v7.0+
- PostgreSQL database
- GraphQL support configured in your NestJS application

## 📦 Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Quick Start


### Environment Variables

```env
# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# Database
DATABASE_URL=your-database-url

# Optional: Service authentication
SERVICE_TOKEN=internal-service-token
```

### Module Registration

```typescript
import { Module } from '@nestjs/common';
import { AuthStarterModule } from '@rs-tech-hub/nestjs-auth-starter';

@Module({
  imports: [AuthStarterModule],
})
export class AppModule {}
```

## 📖 GraphQL API

### Queries

#### Verify Email Exists

**Protected by**: `ServiceAuthGuard` (requires service token)

```graphql
query {
  auth_verifyEmail(input: { email: "user@example.com" }) {
    success
    email
  }
}
```

#### Get Current User

**Protected by**: `GqlAuthGuard` (requires authenticated user)

```graphql
query {
  auth_currentUser {
    user {
      id
      email
      Status
      isVerified
    }
  }
}
```

### Mutations

#### Sign Up

**Protected by**: `ServiceAuthGuard` (requires service token)

```graphql
mutation {
  auth_signUp(
    input: {
      email: "user@example.com"
      password: "SecurePassword123!"
      firstName: "John"
      lastName: "Doe"
    }
  ) {
    token
    refreshToken
    activationKey
    user {
      id
      email
      isVerified
    }
  }
}
```

#### Login

**Protected by**: `ServiceAuthGuard` (requires service token)

```graphql
mutation {
  auth_login(
    input: { email: "user@example.com", password: "SecurePassword123!" }
  ) {
    token
    refreshToken
    user {
      id
      email
      Status
    }
  }
}
```

#### Activate User

**Protected by**: `ServiceAuthGuard` (requires service token)

**Returns**: `Boolean` - `true` if activation successful

```graphql
mutation {
  auth_activateUser(
    input: { email: "user@example.com", activationKey: "activation-key-here" }
  )
}
```

#### Renew Activation Token

**Protected by**: `ServiceAuthGuard` (requires service token)

```graphql
mutation {
  auth_renewActivationToken(input: { email: "user@example.com" }) {
    activationKey
  }
}
```

#### Request Password Reset

**Protected by**: `ServiceAuthGuard` (requires service token)

**Returns**: `AuthRequestPasswordResetServiceOutput` with reset token and expiration

```graphql
mutation {
  auth_requestPasswordReset(input: { email: "user@example.com" }) {
    token
    expiresAt
  }
}
```

#### Reset Password

**Protected by**: `ServiceAuthGuard` (requires service token)

**Returns**: `Boolean` - `true` if password reset successful

```graphql
mutation {
  auth_resetPassword(
    input: {
      email: "user@example.com"
      resetToken: "reset-token-from-email"
      newPassword: "NewSecurePassword123!"
    }
  )
}
```

#### Refresh Token

**Protected by**: `GqlAuthGuard` (requires authenticated user)

```graphql
mutation {
  auth_refreshToken(input: "refresh-token-here") {
    token
    refreshToken
    user {
      id
      email
    }
  }
}
```

#### Update Password

**Protected by**: `GqlAuthGuard` (requires authenticated user)

```graphql
mutation {
  auth_updatePassword(
    input: { oldPassword: "OldPassword123!", newPassword: "NewPassword123!" }
  ) {
    success
  }
}
```

#### Logout

**Protected by**: `GqlAuthGuard` (requires authenticated user)

```graphql
mutation {
  auth_logout {
    success
  }
}
```

## 🔧 Service Usage

Inject the service in your own modules:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthStarterService } from '@rs-tech-hub/nestjs-auth-starter';

@Injectable()
export class YourAuthService {
  constructor(private authService: AuthStarterService) {}

  async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return await this.authService.signUp({
      email,
      password,
      firstName,
      lastName,
    });
  }

  async verifyEmailExists(email: string) {
    return await this.authService.verifyEmail(email);
  }

  async loginUser(email: string, password: string) {
    return await this.authService.login({ email, password });
  }

  async activateAccount(email: string, activationKey: string) {
    return await this.authService.activateUser({ email, activationKey });
  }

  async renewActivation(email: string) {
    return await this.authService.renewActivationToken({ email });
  }

  async requestPasswordReset(email: string) {
    return await this.authService.requestPasswordReset({ email });
  }

  async resetPassword(email: string, resetToken: string, newPassword: string) {
    return await this.authService.resetPassword({
      email,
      resetToken,
      newPassword,
    });
  }

  async refreshUserToken(userId: string, token: string) {
    return await this.authService.refreshToken({ userId, token });
  }

  async logoutUser(userId: string) {
    return await this.authService.logout({ userId });
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    return await this.authService.updatePassword({
      userId,
      oldPassword,
      newPassword,
    });
  }

  async getUserInfo(userId: string) {
    return await this.authService.getCurrentUser(userId);
  }
}
```

## 🔐 Using Guards

### Protect GraphQL Resolvers

```typescript
import { Resolver, Query, UseGuards } from '@nestjs/graphql';
import {
  GqlAuthGuard,
  CurrentUser,
  AuthenticatedUser,
} from '@rs-tech-hub/nestjs-auth-starter';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProtectedResolver {
  @Query(() => String)
  async protectedQuery(@CurrentUser() user: AuthenticatedUser) {
    return `Hello ${user.email}`;
  }
}
```

### Role-Based Access Control

```typescript
import { Resolver, Query, UseGuards } from '@nestjs/graphql';
import {
  GqlAuthGuard,
  Roles,
  RolesGuard,
} from '@rs-tech-hub/nestjs-auth-starter';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class AdminResolver {
  @Query(() => String)
  @Roles('admin')
  async adminOnly() {
    return 'Admin content';
  }

  @Query(() => String)
  @Roles('admin', 'moderator')
  async staffOnly() {
    return 'Staff content';
  }
}
```

## 🔄 Complete Authentication Flow

### 1. User Registration

```typescript
// User signs up
const signupResult = await authService.signUp({
  email: 'user@example.com',
  password: 'SecurePass123!',
  firstName: 'John',
  lastName: 'Doe',
});

// Returns: token, refreshToken, user, activationKey
// Send activationKey to user's email
```

### 2. Email Verification

```typescript
// User clicks activation link with activationKey
const activated = await authService.activateUser({
  email: 'user@example.com',
  activationKey: 'key-from-email',
});

// User account is now verified and active
```

### 3. Login

```typescript
// User logs in
const loginResult = await authService.login({
  email: 'user@example.com',
  password: 'SecurePass123!',
});

// Returns: token, refreshToken, user
// Store tokens securely (httpOnly cookies recommended)
```

### 4. Token Refresh

```typescript
// When access token expires, refresh it
const refreshed = await authService.refreshToken({
  userId: 'user-id',
  token: 'refresh-token',
});

// Returns new access and refresh tokens
```

### 5. Password Reset Flow

```typescript
// Step 1: User requests password reset
const resetRequest = await authService.requestPasswordReset({
  email: 'user@example.com',
});

// Returns: { token, expiresAt }
// Send token to user's email

// Step 2: User submits new password with reset token
const resetSuccess = await authService.resetPassword({
  email: 'user@example.com',
  resetToken: 'token-from-email',
  newPassword: 'NewSecurePass123!',
});

// All refresh tokens are revoked after password reset
// User must login again
```

## 📝 Data Types

### Sign Up Input

| Field     | Type   | Required | Description                                                                 |
| --------- | ------ | -------- | --------------------------------------------------------------------------- |
| email     | string | ✅        | Valid email address                                                         |
| password  | string | ✅        | Strong password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol) |
| firstName | string | ✅        | User's first name                                                           |
| lastName  | string | ✅        | User's last name                                                            |

### Login Input

| Field    | Type   | Required | Description     |
| -------- | ------ | -------- | --------------- |
| email    | string | ✅        | User's email    |
| password | string | ✅        | User's password |

### Update Password Input

| Field       | Type   | Required | Description                                                              |
| ----------- | ------ | -------- | ------------------------------------------------------------------------ |
| userId      | string | ✅        | Current user ID                                                          |
| oldPassword | string | ✅        | Current password                                                         |
| newPassword | string | ✅        | New password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol) |

### Activate User Input

| Field         | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| email         | string | ✅        | User's email              |
| activationKey | string | ✅        | Activation key from email |

### Request Password Reset Input

| Field | Type   | Required | Description  |
| ----- | ------ | -------- | ------------ |
| email | string | ✅        | User's email |

### Reset Password Input

| Field       | Type   | Required | Description                                                              |
| ----------- | ------ | -------- | ------------------------------------------------------------------------ |
| email       | string | ✅        | User's email                                                             |
| resetToken  | string | ✅        | Password reset token from email                                          |
| newPassword | string | ✅        | New password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol) |

### Renew Activation Token Input

| Field | Type   | Required | Description  |
| ----- | ------ | -------- | ------------ |
| email | string | ✅        | User's email |

## ⚠️ Error Codes

### Authentication Errors

| Error Code                             | Description               |
| -------------------------------------- | ------------------------- |
| `auth-error:invalid-credentials`       | Invalid email or password |
| `auth-error:user-not-found`            | User does not exist       |
| `auth-error:user-inactive`             | User account is inactive  |
| `auth-error:user-not-verified`         | User email not verified   |
| `auth-error:user-disabled`             | User account is disabled  |
| `auth-error:user-not-authenticated`    | User not authenticated    |
| `auth-error:email-verification-failed` | Email verification failed |

### Activation & Verification Errors

| Error Code                            | Description                       |
| ------------------------------------- | --------------------------------- |
| `auth-error:user-already-verified`    | User already verified             |
| `auth-error:user-already-active`      | User account already active       |
| `auth-error:invalid-activation-token` | Invalid or expired activation key |
| `auth-error:activation-failed`        | User activation failed            |

### Password Reset Errors

| Error Code                                | Description                    |
| ----------------------------------------- | ------------------------------ |
| `auth-error:password-reset-token-invalid` | Invalid or expired reset token |
| `auth-error:update-password-failed`       | Password update failed         |

### Registration Errors

| Error Code                         | Description             |
| ---------------------------------- | ----------------------- |
| `auth-error:account-create-failed` | Account creation failed |
| `auth-error:user-create-failed`    | User creation failed    |
| `auth-error:profile-create-failed` | Profile creation failed |

### Token Errors

| Error Code                     | Description           |
| ------------------------------ | --------------------- |
| `auth-error:expired-token`     | JWT token has expired |
| `auth-error:invalid-token`     | JWT token is invalid  |
| `auth-error:token-id-required` | Token ID is missing   |

### Validation Errors

| Error Code                       | Description            |
| -------------------------------- | ---------------------- |
| `auth-error:user-email-required` | User email is required |
| `auth-error:user-id-required`    | User ID is required    |

### Internal Errors

| Error Code                            | Description                      |
| ------------------------------------- | -------------------------------- |
| `auth-error:generate-response-failed` | Failed to generate auth response |

## 💡 Best Practices

1. **Strong passwords**: Enforce password requirements on the client side (min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol)
2. **Secure token storage**: Store JWT tokens in httpOnly cookies, not localStorage
3. **Token expiration**: Access tokens are set to expire in 1 hour
4. **Email verification**: Always verify email before granting full access
5. **Rate limiting**: Package includes built-in rate limiting on auth endpoints
6. **HTTPS only**: Always use HTTPS in production
7. **Password hashing**: Package uses bcrypt with salt for secure password storage
8. **Activation tokens**: Send activation keys via secure email delivery (2-day expiration)
9. **Password reset security**: Reset tokens expire after a set period, send via secure email
10. **Token revocation**: All refresh tokens are revoked after password changes or resets
11. **User status checks**: Disabled users are blocked from login and password reset
12. **Automatic cleanup**: Expired tokens are automatically cleaned up by the scheduled task

## � Security Features

- **Password Validation**: Enforces minimum password complexity (8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol)
- **Email Validation**: Validates email format and length (6-254 characters)
- **Bcrypt Hashing**: All passwords are hashed with salt (10 rounds)
- **JWT Authentication**: Secure token-based authentication with 1-hour expiration
- **Refresh Token Rotation**: New refresh tokens issued on every refresh, old ones revoked
- **Token Revocation**: Automatic revocation on logout, password change, or security events
- **Status Checks**: Blocks disabled users from authentication flows
- **Automatic Reactivation**: Inactive users automatically reactivated on successful login
- **Rate Limiting**: Built-in rate limiting to prevent brute force attacks
- **License Protection**: Module is protected by license validation

## 📄 License

This package requires a valid RS Tech Hub commercial license key. The software is protected by intellectual property laws and is provided under a commercial license agreement.

### License Terms

- Commercial use requires a valid license key
- Development testing allowed with free trial
- Production deployment requires a paid license from https://rstechhub.gumroad.com
- Contact insights@rs-tech-hub.com for questions and inquiries

## Release Notes

### 1.1.0

#### ⚠️ Breaking Changes

**Removed API**: `auth_confirmSignupEmail`

- This mutation has been removed from the GraphQL schema
- Previously returned auth tokens after activation
- **Migration**: Use `auth_activateUser` instead, which returns a boolean
- After activation, users must login separately via `auth_login`

**Security Enhancement**: Email activation no longer auto-logs users in

- Activation links are now separate from authentication
- Prevents security issues with long-lived activation tokens
- Supports cross-device activation flows

**New API**: `auth_activateUser`

- Protected by `ServiceAuthGuard`
- Input: `{ email: string, activationKey: string }`
- Returns: `Boolean` (true if successful)
- Validates activation token via `ActivationTokenService`

#### New Features

- **Password Reset API**: Added complete password reset flow with secure token management
  - `auth_requestPasswordReset` - Request password reset token
  - `auth_resetPassword` - Reset password with token
- **Enhanced Security**:
  - Automatically reactivates inactive users on login
  - Blocks disabled users from login and password reset
  - Improved password validation (min 8 chars, uppercase, lowercase, number, symbol)
  - Email format validation (6-254 characters)
- **Token Management**:
  - Improved token validation using `ActivationTokenService` and `PasswordResetTokenService`
  - Better separation between activation and authentication flows
  - All refresh tokens revoked after password reset
- **User Activity Logging**: Tracks authentication events for security auditing

#### Dependencies

- Added @rs-tech-hub/nestjs-password-reset-token
- Updated @rs-tech-hub/nestjs-user: 1.1.0+
- Updated @rs-tech-hub/nestjs-activation-token: 1.0.0+

#### Migration Guide

**Before (v1.0.x)**:

```graphql
mutation {
  auth_confirmSignupEmail(
    input: { email: "user@example.com", activationKey: "key" }
  ) {
    token
    refreshToken
    user {
      id
    }
  }
}
```

**After (v1.1.0+)**:

```graphql
# Step 1: Activate user
mutation {
  auth_activateUser(input: { email: "user@example.com", activationKey: "key" })
}

# Step 2: Login separately
mutation {
  auth_login(input: { email: "user@example.com", password: "password" }) {
    token
    refreshToken
    user {
      id
    }
  }
}
```

### 1.0.3

- Fixes unnecessary exports from AuthStarterModule

### 1.0.2

- Updates dependencies

### 1.0.1

- Updates dependencies

### 1.0.0

- Initial release

## 🐛 Issues & Support

For issues, feature requests, or general questions contact insights@rs-tech-hub.com

Please review the docs first: https://rs-tech-hub.com/docs

## 🌐 Website

Visit the website for more information: https://rs-tech-hub.com

## Newsletter

Stay updated with the latest news and updates by subscribing to the newsletter at https://rs-tech-hub.kit.com/newsletter

---

**Built with ❤️ by RS Tech Hub**
