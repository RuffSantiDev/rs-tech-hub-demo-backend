# @rs-tech-hub/nestjs-activation-token

Secure activation token management for NestJS applications. Generate, validate, and manage time-limited activation tokens for user verification workflows with automatic expiration, revocation, and scheduled cleanup.

## ✨ Features

- 🔐 Secure token generation with SHA-256 hashing
- ⏰ Automatic token expiration (default: 2 days)
- ✅ Token validation and verification
- 🔄 Token revocation for previously issued tokens
- 🧹 Automatic cleanup of expired/revoked/used tokens (60-day retention)
- ⏲️ Scheduled cleanup every 6 hours via built-in scheduler
- 🛡️ One-time use token enforcement
- 📊 Built-in token lifecycle tracking
- 🗑️ Cleanup on application startup

## 📋 Prerequisites

- Node.js >= 18
- TypeScript >= 5.1.0
- NestJS >= 11.1.6
- Prisma ORM v7.0+
- PostgreSQL database

## � Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Quick Start

### Prisma Schema Setup

Include the Activation Token Prisma schema in your project:

```prisma
// In your main schema.prisma or import the schema
model ActivationToken {
  id        String    @id @unique @default(cuid())
  userId    String
  tokenHash String    @unique
  createdAt DateTime  @default(now())
  expiresAt DateTime
  usedAt    DateTime?
  isRevoked Boolean   @default(false)
  revokedAt DateTime?
  User      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

### Module Registration

Import the module in your NestJS application:

```typescript
import { Module } from '@nestjs/common';
import { ActivationTokenModule } from '@rs-tech-hub/nestjs-activation-token';

@Module({
  imports: [ActivationTokenModule],
})
export class AppModule {}
```

The module automatically registers a scheduler that:

- Runs cleanup on application startup
- Executes cleanup every 6 hours to remove expired/revoked/used tokens older than 60 days

## � API Reference

### ActivationTokenService

#### `create(userId: string)`

Creates a new activation token for a user.

**Parameters:**

- `userId` (string): The user ID to associate with the token

**Returns:** `Promise<ActivationTokenCreateServiceOutput>`

**Output Fields:**

- `id` (string): Token ID
- `userId` (string): Associated user ID
- `tokenHash` (string): Hashed token (stored in database)
- `activationKey` (string): Plain token to send to user (not stored)
- `createdAt` (Date): Token creation timestamp
- `expiresAt` (Date): Token expiration timestamp (2 days from creation)

```typescript
const tokenData = await activationTokenService.create('user-123');
// Returns:
// {
//   id: 'token-id',
//   userId: 'user-123',
//   tokenHash: 'hashed-token',
//   activationKey: 'plain-token-to-send', // Send this to user
//   createdAt: Date,
//   expiresAt: Date // 2 days from creation
// }
```

#### `validate(input: ActivationTokenValidateServiceInput)`

Validates an activation token and marks it as used.

**Parameters:**

- `input.userId` (string): The user ID
- `input.activationKey` (string): The activation key received from user

**Returns:** `Promise<boolean>`

**Throws:**

- `activation-token-error:token-not-found` if no valid token exists
- `activation-token-error:invalid` if token doesn't match or is expired

```typescript
const isValid = await activationTokenService.validate({
  userId: 'user-123',
  activationKey: 'token-from-email',
});
```

#### `verify(input: ActivationTokenVerifyServiceInput)`

Verifies if an activation key matches a token hash (without marking as used).

**Parameters:**

- `input.activationKey` (string): The activation key to verify
- `input.tokenHash` (string): The stored token hash

**Returns:** `Promise<boolean>`

```typescript
const matches = await activationTokenService.verify({
  activationKey: 'token-key',
  tokenHash: 'stored-hash',
});
```

#### `invalidatePreviousUserTokens(userId: string)`

Revokes all unused tokens for a specific user by setting `isRevoked` to true and recording `revokedAt` timestamp.

**Parameters:**

- `userId` (string): The user ID

**Returns:** `Promise<boolean>` - Returns true if tokens were found and revoked, false if no tokens found

```typescript
await activationTokenService.invalidatePreviousUserTokens('user-123');
```

#### `cleanupExpiredTokens()`

Removes all expired, revoked, or used tokens that are older than 60 days from the database. This method is automatically called:

- On application startup
- Every 6 hours via the built-in scheduler

**Returns:** `Promise<{ success: boolean; count: number }>`

**Response:**

- `success` (boolean): True if any tokens were deleted
- `count` (number): Number of tokens deleted

```typescript
const result = await activationTokenService.cleanupExpiredTokens();
// Returns: { success: true, count: 15 }
```

## 🔄 Common Workflows

### User Registration Flow

```typescript
@Injectable()
export class RegistrationService {
  constructor(
    private userService: UserService,
    private activationTokenService: ActivationTokenService,
    private emailService: EmailService
  ) {}

  async registerUser(email: string, password: string) {
    // 1. Create user account (inactive)
    const user = await this.userService.create({
      email,
      password,
      isActive: false,
    });

    // 2. Generate activation token
    const token = await this.activationTokenService.create(user.id);

    // 3. Send activation email
    await this.emailService.sendActivationEmail(email, token.activationKey);

    return { userId: user.id, message: 'Activation email sent' };
  }

  async activateAccount(userId: string, activationKey: string) {
    // Validate and mark token as used
    const isValid = await this.activationTokenService.validate({
      userId,
      activationKey,
    });

    if (!isValid) {
      throw new Error('Invalid or expired activation token');
    }

    // Activate user account
    await this.userService.update(userId, { isActive: true });

    return { message: 'Account activated successfully' };
  }
}
```

### Resend Activation Token

```typescript
async resendActivationToken(userId: string) {
  // Revoke previous tokens
  await this.activationTokenService.invalidatePreviousUserTokens(userId);

  // Create new token
  const token = await this.activationTokenService.create(userId);

  // Send new email
  await this.emailService.sendActivationEmail(
    userEmail,
    token.activationKey
  );
}
```

## 🔒 Security Features

- **SHA-256 Hashing**: Activation keys are hashed before storage
- **One-time Use**: Tokens are marked as used after validation
- **Expiration**: Tokens automatically expire after 2 days
- **Revocation**: Previous tokens can be revoked when issuing new ones
- **Secure Generation**: Uses crypto.randomBytes for token generation
- **Automatic Cleanup**: Removes old tokens (60-day retention) every 6 hours
- **Cascade Deletion**: Tokens are deleted when associated user is deleted

## 📊 Token Lifecycle

1. **Created**: Token generated with 2-day expiration
2. **Sent**: Plain `activationKey` sent to user via email/SMS
3. **Used**: Token validated and marked with `usedAt` timestamp
4. **Revoked**: Token marked as revoked with `revokedAt` timestamp (optional)
5. **Expired**: Token passes expiration date
6. **Cleaned**: Token deleted 60 days after expiration/revocation/use

## 📝 Data Types

### ActivationTokenValidateServiceInput

| Field         | Type   | Required | Description                   |
| ------------- | ------ | -------- | ----------------------------- |
| userId        | string | ✅        | User ID to validate token for |
| activationKey | string | ✅        | Activation key from email/SMS |

### ActivationTokenVerifyServiceInput

| Field         | Type   | Required | Description                  |
| ------------- | ------ | -------- | ---------------------------- |
| activationKey | string | ✅        | Activation key to verify     |
| tokenHash     | string | ✅        | Stored token hash to compare |

### ActivationTokenCreateServiceOutput

| Field         | Type   | Description                |
| ------------- | ------ | -------------------------- |
| id            | string | Token ID                   |
| userId        | string | Associated user ID         |
| tokenHash     | string | Hashed token (stored)      |
| activationKey | string | Plain token (send to user) |
| createdAt     | Date   | Token creation time        |
| expiresAt     | Date   | Token expiration time      |

## ⚠️ Error Codes

| Error Code                               | Description                 |
| ---------------------------------------- | --------------------------- |
| `activation-token-error:invalid`         | Token is invalid or expired |
| `activation-token-error:token-not-found` | No token found for user     |

## 💡 Best Practices

1. **Send tokens immediately**: Generate and send tokens right after user registration
2. **Automatic cleanup**: Built-in scheduler handles cleanup - no manual intervention needed
3. **Revoke on resend**: Always revoke previous tokens when issuing new ones using `invalidatePreviousUserTokens()`
4. **Never expose token hash**: Only send the `activationKey` to users
5. **Set reasonable expiration**: Default 2 days is suitable for most cases
6. **Handle errors gracefully**: Catch and handle `token-not-found` and `invalid` errors appropriately
7. **Use validation over verification**: Use `validate()` for user activation as it marks tokens as used

## 🗂️ Database Schema

The package uses the following Prisma model:

```prisma
model ActivationToken {
  id        String    @id @unique @default(cuid())
  userId    String
  tokenHash String    @unique
  createdAt DateTime  @default(now())
  expiresAt DateTime
  usedAt    DateTime?
  isRevoked Boolean   @default(false)
  revokedAt DateTime?
  User      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

**Fields:**

- `id`: Unique token identifier
- `userId`: Associated user identifier (indexed)
- `tokenHash`: SHA-256 hash of the activation key (unique)
- `createdAt`: Token creation timestamp
- `expiresAt`: Token expiration timestamp
- `usedAt`: Timestamp when token was validated (nullable)
- `isRevoked`: Boolean flag indicating if token was manually revoked
- `revokedAt`: Timestamp when token was revoked (nullable)

## 📅 Release Notes

### 1.1.0

#### Breaking Changes

- Updated `ActivationToken` Prisma model: replaced `invalidatedAt` with `revokedAt` field
- Changed model field from `invalidatedAt DateTime?` to:
  - `isRevoked Boolean @default(false)`
  - `revokedAt DateTime?`
- Updated `cleanupExpiredTokens()` method to filter by `revokedAt` instead of `invalidatedAt`

#### New Features

- Added `ActivationTokenScheduler` to automatically clean up expired tokens every 6 hours
- Cleanup now runs automatically on application startup
- Enhanced cleanup to include revoked and used tokens with 60-day retention period
- Cleanup now returns detailed response with `{ success: boolean; count: number }`

### 1.0.0

- Initial release
- Secure token generation with SHA-256 hashing
- Token validation and verification
- Token expiration (2 days)
- Manual cleanup method

## 📄 License

This package requires a valid RS Tech Hub commercial license key. The software is protected by intellectual property laws and is provided under a commercial license agreement.

### License Terms

- Commercial use requires a valid license key
- Development testing allowed with free trial
- Production deployment requires a paid license from https://rstechhub.gumroad.com
- Contact insights@rs-tech-hub.com for questions and inquiries

## 🐛 Issues & Support

For issues, feature requests, or questions, please contact insights@rs-tech-hub.com

---

**Built with ❤️ by RS Tech Hub**
