# @rs-tech-hub/nestjs-refresh-token

Refresh token management for NestJS applications. Create, validate, revoke, and manage JWT refresh tokens with automatic expiry and cleanup.

## ✨ Features

- 🔄 **Token Generation** - Create unique refresh tokens with UUID
- ⏰ **Expiry Management** - Configurable token expiration (default 7 days)
- 🚫 **Token Revocation** - Revoke individual or all user tokens
- 🧹 **Automatic Cleanup** - Remove expired and revoked tokens
- 🔍 **Token Validation** - Find and validate tokens by value
- 👤 **User Association** - Link tokens to specific users
- 🔗 **Token Replacement** - Track token replacement chains

## 📋 Prerequisites

- Node.js >= 18
- TypeScript >= 5.1.0
- NestJS >= 11.1.6
- Prisma ORM v7.0+
- PostgreSQL database

## 📦 Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## � Quick Start

### Prisma Schema Setup

Include the Refresh Token Prisma schema in your project:

```prisma
// In your main schema.prisma or import the schema
model RefreshToken {
  id              String    @id @unique @default(cuid())
  token           String    @unique
  userId          String
  isRevoked       Boolean   @default(false)
  revokedAt       DateTime?
  replacedByToken String?
  expiresAt       DateTime
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  User            User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

### Module Registration

Import the module in your NestJS application:

```typescript
import { Module } from '@nestjs/common';
import { RefreshTokenModule } from '@rs-tech-hub/nestjs-refresh-token';

@Module({
  imports: [RefreshTokenModule],
})
export class AppModule {}
```

## 💻 Usage Examples

### Creating Refresh Tokens

```typescript
import { Injectable } from '@nestjs/common';
import { RefreshTokenService } from '@rs-tech-hub/nestjs-refresh-token';

@Injectable()
export class AuthService {
  constructor(private refreshTokenService: RefreshTokenService) {}

  async login(userId: string) {
    // Create a refresh token (expires in 7 days by default)
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      userId
    );

    // Or specify custom expiry in days
    const longLivedToken = await this.refreshTokenService.createRefreshToken(
      userId,
      30
    );

    return {
      accessToken: 'jwt-access-token',
      refreshToken,
    };
  }
}
```

### Finding Tokens

```typescript
// Find token by token value
const tokenData = await this.refreshTokenService.findByToken(tokenString);

// Find user ID by token
const userIdData = await this.refreshTokenService.findUserIdByToken(
  tokenString
);

// Find all active tokens for a user
const activeTokens = await this.refreshTokenService.findActiveTokensForUser(
  userId
);
```

### Revoking Tokens

```typescript
// Revoke a specific token by ID
await this.refreshTokenService.revokeToken(tokenId);

// Revoke token by token value
await this.refreshTokenService.revokeTokenByValue(tokenString);

// Revoke token and specify replacement
await this.refreshTokenService.revokeToken(oldTokenId, newTokenString);

// Revoke all tokens for a user
const result = await this.refreshTokenService.revokeAllUserTokens(userId);
```

### Token Cleanup

```typescript
// Clean up expired tokens (retention period: 60 days)
await this.refreshTokenService.cleanupExpiredTokens();

// Delete all expired and revoked tokens
const deletedCount =
  await this.refreshTokenService.deleteExpiredAndRevokedTokens();
```

## 🔧 Repository Usage

The package also exports `RefreshTokenRepository` for direct database access:

```typescript
import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '@rs-tech-hub/nestjs-refresh-token';

@Injectable()
export class TokenManagementService {
  constructor(private refreshTokenRepo: RefreshTokenRepository) {}

  async getTokensByUser(userId: string) {
    return this.refreshTokenRepo.findMany({ userId });
  }

  async deleteToken(tokenId: string) {
    return this.refreshTokenRepo.delete({ id: tokenId });
  }

  async countUserTokens(userId: string) {
    return this.refreshTokenRepo.count({ userId });
  }
}
```

## 📖 API Reference

### RefreshTokenService

#### `createRefreshToken(userId: string, expiryDays?: number): Promise<string>`

Create a new refresh token for a user.

**Parameters:**

- `userId` - The ID of the user
- `expiryDays` - Token expiry in days (default: 7)

**Returns:** The token string (UUID v4)

#### `findByToken(token: string): Promise<RefreshTokenServiceOutput>`

Find a refresh token by its token value.

**Returns:** Token data including id, userId, expiresAt, revoked status

#### `findUserIdByToken(token: string): Promise<{ userId: string }>`

Find the user ID associated with a token.

**Returns:** Object containing userId

#### `findActiveTokensForUser(userId: string): Promise<RefreshTokenServiceOutput[]>`

Find all active (not revoked and not expired) tokens for a user.

**Returns:** Array of active refresh tokens

#### `revokeToken(tokenId: string, replacedByToken?: string): Promise<RefreshTokenServiceOutput>`

Revoke a refresh token by its ID.

**Parameters:**

- `tokenId` - The ID of the token to revoke
- `replacedByToken` - Optional new token that replaces this one

**Returns:** The updated token

#### `revokeTokenByValue(token: string, replacedByToken?: string): Promise<RefreshTokenServiceOutput>`

Revoke a refresh token by its token value.

**Parameters:**

- `token` - The token string to revoke
- `replacedByToken` - Optional new token that replaces this one

**Returns:** The updated token

#### `revokeAllUserTokens(userId: string): Promise<ServiceResult<string, boolean>>`

Revoke all tokens for a specific user.

**Returns:** ServiceResult indicating success or failure

#### `cleanupExpiredTokens(): Promise<ServiceResult>`

Delete expired and old revoked tokens (60 day retention period).

**Returns:** ServiceResult with deletion count

#### `deleteExpiredAndRevokedTokens(): Promise<number>`

Delete all expired and revoked tokens immediately.

**Returns:** Number of deleted tokens

## 📊 Data Model

### RefreshTokenModel

```typescript
{
  id: string;               // Unique token ID
  token: string;            // UUID v4 token value
  userId: string;           // Associated user ID
  isRevoked: boolean;       // Revocation status
  revokedAt?: Date;         // Revocation timestamp
  replacedByToken?: string; // Token that replaced this one
  expiresAt: Date;          // Expiration date
  createdAt: Date;          // Creation timestamp
  updatedAt: Date;          // Last update timestamp
}
```

## ⚠️ Error Codes

| Error Code                         | Description                   |
| ---------------------------------- | ----------------------------- |
| `user-error:refresh-token-expired` | Token has expired             |
| `user-error:refresh-token-invalid` | Token is invalid or not found |
| `user-error:refresh-token-revoked` | Token has been revoked        |

## 💡 Best Practices

1. **Token Rotation**: Always revoke old tokens when issuing new ones
2. **Regular Cleanup**: Run `cleanupExpiredTokens()` periodically (e.g., daily cron job)
3. **Expiry Duration**: Use appropriate expiry times (7-30 days recommended)
4. **Revoke on Logout**: Always revoke tokens when users log out
5. **Track Replacements**: Use `replacedByToken` parameter to track token chains
6. **Validate Before Use**: Always check token status before issuing new access tokens
7. **Limit Active Tokens**: Consider limiting the number of active tokens per user

## 🔄 Typical Token Refresh Flow

```typescript
@Injectable()
export class AuthService {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private jwtService: JwtService
  ) {}

  async refreshAccessToken(refreshToken: string) {
    // 1. Find the refresh token
    const tokenData = await this.refreshTokenService.findByToken(refreshToken);

    // 2. Validate token
    if (!tokenData) {
      throw new Error('user-error:refresh-token-invalid');
    }

    if (tokenData.revoked) {
      throw new Error('user-error:refresh-token-revoked');
    }

    if (tokenData.expiresAt < new Date()) {
      throw new Error('user-error:refresh-token-expired');
    }

    // 3. Generate new tokens
    const accessToken = this.jwtService.sign({ sub: tokenData.userId });
    const newRefreshToken = await this.refreshTokenService.createRefreshToken(
      tokenData.userId
    );

    // 4. Revoke old refresh token and link to new one
    await this.refreshTokenService.revokeToken(tokenData.id, newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
```

## 📅 Release Notes

### 1.1.0

#### New Features

- Added RefreshTokenScheduler to automatically clean up expired tokens every 6 hours
- Cleanup runs automatically on application startup
- Enhanced cleanup with 60-day retention period for expired/revoked tokens
- Improved token management with better revocation tracking

### 1.0.1

- Updates RefreshTokenService methods

### 1.0.0

- Initial release
- Token generation with UUID v4
- Token validation and verification
- Token expiration (default 7 days)
- Token revocation support
- User token management
- Token replacement tracking

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
