# @rs-tech-hub/nestjs-password-reset-token

Secure password reset token management for NestJS applications. Generate, validate, and manage time-limited password reset tokens for secure password recovery workflows with automatic expiration, revocation, and scheduled cleanup.

## ✨ Features

- 🔐 Secure token generation with SHA-256 hashing
- ⏰ Automatic token expiration (default: 1 hour)
- ✅ Token validation and verification
- 🔄 Token revocation for previously issued tokens
- 🧹 Automatic cleanup of expired/revoked/used tokens (60-day retention)
- ⏲️ Scheduled cleanup every 6 hours via built-in scheduler
- 🛡️ One-time use token enforcement
- 📊 Built-in token lifecycle tracking
- 🗑️ Cleanup on application startup
- 🔒 Optional IP address and user agent tracking for security

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

Include the Password Reset Token Prisma schema in your project:

```prisma
// In your main schema.prisma or import the schema
model PasswordResetToken {
  id        String    @id @default(uuid())
  tokenHash String    @unique
  userId    String
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  ipAddress String?
  userAgent String?
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
import { PasswordResetTokenModule } from '@rs-tech-hub/nestjs-password-reset-token';

@Module({
  imports: [PasswordResetTokenModule],
})
export class AppModule {}
```

The module automatically registers a scheduler that:

- Runs cleanup on application startup
- Executes cleanup every 6 hours to remove expired/revoked/used tokens older than 60 days

## 📖 API Reference

### PasswordResetTokenService

#### `create(userId: string)`

Creates a new password reset token for a user.

**Parameters:**

- `userId` (string): The user ID to associate with the token

**Returns:** `Promise<PasswordResetTokenCreateServiceOutput>`

**Output Fields:**

- `id` (string): Token ID
- `userId` (string): Associated user ID
- `tokenHash` (string): Hashed token (stored in database)
- `token` (string): Plain token to send to user (not stored)
- `createdAt` (Date): Token creation timestamp
- `expiresAt` (Date): Token expiration timestamp (2 days from creation)

```typescript
const tokenData = await passwordResetTokenService.create('user-123');
// Returns:
// {
//   id: 'token-id',
//   userId: 'user-123',
//   tokenHash: 'hashed-token',
//   token: 'plain-token-to-send', // Send this to user
//   createdAt: Date,
//   expiresAt: Date // 2 days from creation
// }
```

#### `validate(input: PasswordResetTokenValidateServiceInput)`

Validates a password reset token and marks it as used.

**Parameters:**

- `input.userId` (string): The user ID
- `input.token` (string): The reset token received from user

**Returns:** `Promise<boolean>`

**Throws:**

- `password-reset-token-error:token-not-found` if no valid token exists
- `password-reset-token-error:invalid` if token doesn't match or is expired

```typescript
const isValid = await passwordResetTokenService.validate({
  userId: 'user-123',
  token: 'token-from-email',
});
```

#### `verify(input: PasswordResetTokenVerifyServiceInput)`

Verifies if a reset token matches a token hash (without marking as used).

**Parameters:**

- `input.token` (string): The reset token to verify
- `input.tokenHash` (string): The stored token hash

**Returns:** `Promise<boolean>`

```typescript
const matches = await passwordResetTokenService.verify({
  token: 'reset-token',
  tokenHash: 'stored-hash',
});
```

#### `invalidatePreviousUserTokens(userId: string)`

Revokes all unused tokens for a specific user by setting `isRevoked` to true and recording `revokedAt` timestamp.

**Parameters:**

- `userId` (string): The user ID

**Returns:** `Promise<boolean>` - Returns true if tokens were found and revoked, false if no tokens found

```typescript
await passwordResetTokenService.invalidatePreviousUserTokens('user-123');
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
const result = await passwordResetTokenService.cleanupExpiredTokens();
// Returns: { success: true, count: 15 }
```

## 🔄 Common Workflows

### Password Reset Flow

```typescript
@Injectable()
export class PasswordResetService {
  constructor(
    private userService: UserService,
    private passwordResetTokenService: PasswordResetTokenService,
    private emailService: EmailService
  ) {}

  async requestPasswordReset(email: string) {
    // 1. Find user by email
    const user = await this.userService.findByEmail(email);

    if (!user) {
      // Don't reveal if user exists for security
      return { message: 'If the email exists, a reset link will be sent' };
    }

    // 2. Invalidate any previous tokens
    await this.passwordResetTokenService.invalidatePreviousUserTokens(user.id);

    // 3. Generate new reset token
    const tokenData = await this.passwordResetTokenService.create(user.id);

    // 4. Send reset email
    await this.emailService.sendPasswordResetEmail(email, tokenData.token);

    return { message: 'Password reset email sent' };
  }

  async resetPassword(userId: string, token: string, newPassword: string) {
    // Validate and mark token as used
    const isValid = await this.passwordResetTokenService.validate({
      userId,
      token,
    });

    if (!isValid) {
      throw new Error('Invalid or expired password reset token');
    }

    // Update user password
    await this.userService.updatePassword(userId, newPassword);

    // Revoke all refresh tokens for security
    await this.userService.revokeAllRefreshTokens(userId);

    return { message: 'Password reset successfully' };
  }
}
```

### Complete Password Recovery Integration

```typescript
@Injectable()
export class AuthService {
  constructor(
    private passwordResetTokenService: PasswordResetTokenService,
    private userService: UserService
  ) {}

  async initiatePasswordReset(email: string) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      // Security: Don't reveal user existence
      return { success: true };
    }

    // Revoke previous reset tokens
    await this.passwordResetTokenService.invalidatePreviousUserTokens(user.id);

    // Create new token
    const resetToken = await this.passwordResetTokenService.create(user.id);

    // Send email with reset link
    await this.sendResetEmail(email, resetToken.token);

    return { success: true };
  }

  async completePasswordReset(
    email: string,
    token: string,
    newPassword: string
  ) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new Error('Invalid reset request');
    }

    // Validate token
    const isValid = await this.passwordResetTokenService.validate({
      userId: user.id,
      token,
    });

    if (!isValid) {
      throw new Error('Invalid or expired token');
    }

    // Update password
    await this.userService.updatePassword(user.id, newPassword);

    return { success: true };
  }
}
```

## 🔒 Security Features

- **SHA-256 Hashing**: Reset tokens are hashed before storage
- **One-time Use**: Tokens are marked as used after validation
- **Expiration**: Tokens automatically expire after 1 hour
- **Revocation**: Previous tokens can be revoked when issuing new ones
- **Secure Generation**: Uses crypto.randomBytes for token generation
- **Automatic Cleanup**: Removes old tokens (60-day retention) every 6 hours
- **Cascade Deletion**: Tokens are deleted when associated user is deleted
- **Optional Tracking**: Support for IP address and user agent logging

## 📊 Token Lifecycle

1. **Created**: Token generated with 1-hour expiration
2. **Sent**: Plain `token` sent to user via email (not implemented here)
3. **Used**: Token validated and marked with `usedAt` timestamp
4. **Revoked**: Token marked as revoked with `revokedAt` timestamp (optional)
5. **Expired**: Token passes expiration date
6. **Cleaned**: Token deleted 60 days after expiration/revocation/use

## 📝 Data Types

### PasswordResetTokenValidateServiceInput

| Field  | Type   | Required | Description                   |
| ------ | ------ | -------- | ----------------------------- |
| userId | string | ✅        | User ID to validate token for |
| token  | string | ✅        | Reset token from email        |

### PasswordResetTokenVerifyServiceInput

| Field     | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| token     | string | ✅        | Reset token to verify        |
| tokenHash | string | ✅        | Stored token hash to compare |

### PasswordResetTokenCreateServiceOutput

| Field     | Type   | Description                |
| --------- | ------ | -------------------------- |
| id        | string | Token ID                   |
| userId    | string | Associated user ID         |
| tokenHash | string | Hashed token (stored)      |
| token     | string | Plain token (send to user) |
| createdAt | Date   | Token creation time        |
| expiresAt | Date   | Token expiration time      |

## ⚠️ Error Codes

| Error Code                                   | Description                 |
| -------------------------------------------- | --------------------------- |
| `password-reset-token-error:invalid`         | Token is invalid or expired |
| `password-reset-token-error:token-not-found` | No token found for user     |

## 💡 Best Practices

1. **Send tokens immediately**: Generate and send tokens right after password reset request
2. **Automatic cleanup**: Built-in scheduler handles cleanup - no manual intervention needed
3. **Revoke on new request**: Always revoke previous tokens when issuing new ones using `invalidatePreviousUserTokens()`
4. **Never expose token hash**: Only send the plain `token` to users
5. **Set reasonable expiration**: Default 1 hour is suitable for most cases (Balanced Approach)

- Common industry standard
- Balances security with user convenience
- Recommended by OWASP and most security frameworks

6. **Handle errors gracefully**: Catch and handle `token-not-found` and `invalid` errors appropriately
7. **Use validation over verification**: Use `validate()` for password reset as it marks tokens as used
8. **Security through obscurity**: Don't reveal if a user exists when requesting password reset
9. **Revoke sessions**: After password reset, revoke all active sessions/refresh tokens
10. **Rate limiting**: Implement rate limiting on password reset request endpoints

## 🔐 Security Considerations

### Email Security

- Always send reset tokens via secure email delivery
- Use HTTPS links for password reset pages
- Consider email link expiration shorter than token expiration

### Token Management

- Tokens are single-use only
- Old tokens are automatically revoked when requesting new ones
- Expired tokens cannot be used even if not yet cleaned up

### User Privacy

- Don't reveal whether an email exists in the system
- Return same response for existing and non-existing users
- Log security events for monitoring

### Additional Security

- Consider implementing CAPTCHA on reset request forms
- Monitor for unusual patterns (multiple requests from same IP)
- Consider shorter expiration times for high-security applications (not configurable yet)
- Optional: Track IP address and user agent for audit trails

## 🗂️ Database Schema

The package uses the following Prisma model:

```prisma
model PasswordResetToken {
  id        String    @id @default(uuid())
  tokenHash String    @unique
  userId    String
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  ipAddress String?
  userAgent String?
  isRevoked Boolean   @default(false)
  revokedAt DateTime?
  User      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

**Fields:**

- `id`: Unique token identifier
- `tokenHash`: SHA-256 hash of the reset token (unique)
- `userId`: Associated user identifier (indexed)
- `expiresAt`: Token expiration timestamp
- `usedAt`: Timestamp when token was validated (nullable)
- `createdAt`: Token creation timestamp
- `updatedAt`: Last update timestamp
- `ipAddress`: Optional IP address for security tracking
- `userAgent`: Optional user agent for security tracking
- `isRevoked`: Boolean flag indicating if token was manually revoked
- `revokedAt`: Timestamp when token was revoked (nullable)

## 📅 Release Notes

### 1.0.0

- Initial release
- Secure token generation with SHA-256 hashing
- Token validation and verification
- Token expiration (1 hour)
- Token revocation support
- Automatic cleanup of expired/revoked/used tokens
- Built-in scheduler for automatic cleanup every 6 hours
- Cleanup on application startup
- 60-day retention period for old tokens
- Optional IP address and user agent tracking

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
