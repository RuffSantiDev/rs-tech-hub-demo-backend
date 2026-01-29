# @rs-tech-hub/nestjs-auth-core

Core authentication infrastructure for NestJS applications. Provides JWT-based authentication, guards, decorators, and strategies for both REST and GraphQL endpoints with support for access/refresh tokens and service-to-service authentication.

## 🔑 License

**This package requires a valid commercial license.** A valid license key must be configured to use this package.

Visit https://rstechhub.gumroad.com to purchase a license.

## ✨ Features

- 🔐 JWT-based authentication (access & refresh tokens)
- 🛡️ Authentication guards for REST and GraphQL
- 🎯 Parameter decorators for user data extraction
- 🔓 Public route support with `@Public()` decorator
- 🔄 Refresh token strategy and guard
- 🔧 Basic authentication for admin/internal tools
- 🌐 Service-to-service authentication
- 📊 Works seamlessly with both REST and GraphQL

## 📋 Prerequisites

- Node.js >= 18
- TypeScript >= 5.1.0
- NestJS >= 11.1.6
- Prisma ORM v7.0+ (for user data)

## � Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Quick Start

### Environment Variables

```env
# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# Optional: Basic Auth for admin endpoints
BASIC_AUTH_ERROR_USERNAME=admin
BASIC_AUTH_ERROR_PASSWORD=secure-password

# Optional: Service-to-service auth
SERVICE_TOKEN=internal-service-token
```

### Module Setup

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  JwtGlobalModule,
  PassportGlobalModule,
} from '@rs-tech-hub/nestjs-auth-core';

@Module({
  imports: [ConfigModule.forRoot(), PassportGlobalModule, JwtGlobalModule],
})
export class AppModule {}
```

## 🔧 Usage

### REST API Authentication

```typescript
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  CurrentUser,
  CurrentUserId,
  Public,
  AuthenticatedUser,
} from '@rs-tech-hub/nestjs-auth-core';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('me')
  async getCurrentUser(@CurrentUser() user: AuthenticatedUser) {
    return { id: user.sub, email: user.email, role: user.role };
  }

  @Get('profile')
  async getProfile(@CurrentUserId() userId: string) {
    return this.userService.findById(userId);
  }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
```

### GraphQL Authentication

```typescript
import { Resolver, Query, Mutation, Args, UseGuards } from '@nestjs/graphql';
import {
  GqlAuthGuard,
  CurrentUser,
  Public,
  AuthenticatedUser,
} from '@rs-tech-hub/nestjs-auth-core';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  @Query(() => User)
  async me(@CurrentUser() user: AuthenticatedUser) {
    return this.userService.findById(user.sub);
  }

  @Public()
  @Query(() => String)
  async health() {
    return 'OK';
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    return this.authService.login(email, password);
  }
}
```

### Refresh Token Flow

```typescript
import { Controller, Post, UseGuards } from '@nestjs/common';
import {
  JwtRefreshGuard,
  RefreshToken,
  CurrentUserId,
} from '@rs-tech-hub/nestjs-auth-core';

@Controller('auth')
export class AuthController {
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @RefreshToken() refreshToken: string,
    @CurrentUserId() userId: string
  ) {
    return this.authService.refreshAccessToken(refreshToken, userId);
  }
}
```

### Basic Authentication (Admin/Internal)

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '@rs-tech-hub/nestjs-auth-core';

@Controller('admin')
@UseGuards(BasicAuthGuard)
export class AdminController {
  @Get('dashboard')
  async getDashboard() {
    return { message: 'Admin Dashboard' };
  }
}
```

### Service-to-Service Authentication

```typescript
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ServiceAuthGuard } from '@rs-tech-hub/nestjs-auth-core';

@Controller('internal')
@UseGuards(ServiceAuthGuard)
export class InternalController {
  @Post('sync')
  async syncData() {
    // Only accessible with valid SERVICE_TOKEN header
    return this.dataService.sync();
  }
}
```

## 📖 API Reference

### Guards

#### `AuthGuard`

JWT authentication guard for REST endpoints.

```typescript
@Controller('api')
@UseGuards(AuthGuard)
export class ApiController {}
```

#### `GqlAuthGuard`

JWT authentication guard for GraphQL resolvers.

```typescript
@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {}
```

#### `JwtRefreshGuard`

Guard for refresh token validation.

```typescript
@Post('refresh')
@UseGuards(JwtRefreshGuard)
async refresh(@RefreshToken() token: string) {}
```

#### `BasicAuthGuard`

HTTP Basic authentication guard (username/password).

```typescript
@Controller('admin')
@UseGuards(BasicAuthGuard)
export class AdminController {}
```

#### `ServiceAuthGuard`

Service-to-service authentication using shared token.

```typescript
@Controller('internal')
@UseGuards(ServiceAuthGuard)
export class InternalController {}
```

### Decorators

#### `@Public()`

Marks routes/resolvers as public (no authentication required).

```typescript
@Public()
@Get('status')
async getStatus() {
  return { status: 'ok' };
}
```

#### `@CurrentUser()`

Extracts the authenticated user object from the request.

```typescript
async getProfile(@CurrentUser() user: AuthenticatedUser) {
  return user; // { sub, email, role, iat, exp }
}
```

#### `@CurrentUserId()`

Extracts only the user ID from the authenticated user.

```typescript
async getMyData(@CurrentUserId() userId: string) {
  return this.service.findByUserId(userId);
}
```

#### `@RefreshToken()`

Extracts the refresh token from cookies or headers.

```typescript
async refresh(@RefreshToken() token: string) {
  return this.authService.refreshAccessToken(token);
}
```

## 📝 Interfaces

### AuthenticatedUser

```typescript
interface AuthenticatedUser {
  sub: string; // User ID
  email: string; // User email
  role: string; // User role(s)
  iat?: number; // Issued at (Unix timestamp)
  exp?: number; // Expires at (Unix timestamp)
}
```

### JwtPayload

```typescript
interface JwtPayload {
  sub: string; // User ID
  email: string; // User email
  role: string; // User role(s)
  iat?: number; // Issued at
  exp?: number; // Expires at
}
```

## 🔄 Complete Authentication Flow

```typescript
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    // 1. Validate credentials
    const user = await this.validateUser(email, password);

    // 2. Generate tokens
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    };
  }

  async refreshAccessToken(refreshToken: string) {
    // Verify refresh token and issue new access token
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return {
      accessToken: this.jwtService.sign({
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      }),
    };
  }
}
```

## ⚠️ Error Codes

| Error Code                          | Description                           |
| ----------------------------------- | ------------------------------------- |
| `auth-error:invalid-credentials`    | Invalid username or password          |
| `auth-error:no-token-provided`      | No authentication token provided      |
| `auth-error:invalid-token`          | Token is invalid or malformed         |
| `auth-error:expired-token`          | Token has expired                     |
| `auth-error:user-not-found`         | User does not exist                   |
| `auth-error:user-inactive`          | User account is inactive              |
| `auth-error:user-not-verified`      | User email not verified               |
| `auth-error:service-not-configured` | Service authentication not configured |

## 💡 Best Practices

1. **Use appropriate guards**: `AuthGuard` for REST, `GqlAuthGuard` for GraphQL
2. **Mark public routes**: Always use `@Public()` for unauthenticated endpoints
3. **Secure secrets**: Use strong, unique values for `JWT_SECRET` and `JWT_REFRESH_SECRET`
4. **Token expiration**: Keep access tokens short-lived (15min-1hr), refresh tokens longer (7d)
5. **Role-based access**: Use the `role` field in `AuthenticatedUser` for authorization
6. **Refresh tokens**: Store refresh tokens securely (httpOnly cookies recommended)

## 📄 License

This package requires a valid commercial license. See LICENSE.txt for details.

## 📧 Support

For technical support and inquiries:

- Email: insights@rs-tech-hub.com
