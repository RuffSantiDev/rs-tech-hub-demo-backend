# @rs-tech-hub/nestjs-profile

User profile management for NestJS applications with GraphQL support. Create and update user profiles with personal information, avatar, and demographics.

## 🔑 License

**This package requires a valid commercial license.** A valid license key must be configured to use this package.

Visit https://rstechhub.gumroad.com to purchase a license.

## ✨ Features

- 👤 **Profile Management** - Create and update user profiles
- 🔒 **Authentication Required** - Protected GraphQL operations
- 🌍 **Demographics** - Store country, date of birth, salutation
- 🖼️ **Avatar Support** - Profile avatar URL management
- 📊 **GraphQL API** - Mutations and queries for profile operations
- 🔐 **User-Scoped** - Profiles automatically linked to authenticated users

## 📋 Prerequisites

- Node.js ≥ 18
- TypeScript ≥ 5.1.0
- NestJS ≥ 11.1.6
- Prisma ORM v7.0+
- GraphQL support configured in your NestJS application

## 📦 Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Module Registration

Import the module in your NestJS application:

```typescript
import { Module } from '@nestjs/common';
import { ProfileModule } from '@rs-tech-hub/nestjs-profile';

@Module({
  imports: [ProfileModule],
})
export class AppModule {}
```

## 📖 GraphQL API

### Mutations

#### Create Profile

```graphql
mutation {
  profile_create(
    createProfileInput: {
      avatarUrl: "https://example.com/avatar.jpg"
      salutation: "Mr"
      firstName: "John"
      lastName: "Doe"
      dateOfBirth: "1990-01-15"
      country: "United States"
    }
  ) {
    profile {
      id
      avatarUrl
      Salutation
      firstName
      lastName
      dateOfBirth
      country
      userId
    }
  }
}
```

#### Update Profile

```graphql
mutation {
  updateProfile(
    updateProfileInput: {
      avatarUrl: "https://example.com/new-avatar.jpg"
      country: "Canada"
    }
  ) {
    id
    avatarUrl
    country
    userId
  }
}
```

### Queries

#### Get Current User Profile

```graphql
query {
  profile_get {
    id
    avatarUrl
    Salutation
    firstName
    lastName
    dateOfBirth
    country
    userId
  }
}
```

## 🔧 Repository Usage

Inject the repository in your own services:

```typescript
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@rs-tech-hub/nestjs-profile';

@Injectable()
export class UserService {
  constructor(private profileRepository: ProfileRepository) {}

  async getUserProfile(userId: string) {
    return this.profileRepository.findUnique({ userId });
  }

  async createProfile(data: ProfileCreateDto) {
    return this.profileRepository.create(data);
  }

  async updateProfile(userId: string, data: ProfileUpdateInput) {
    return this.profileRepository.update({ userId }, data);
  }

  async deleteProfile(userId: string) {
    return this.profileRepository.delete({ userId });
  }
}
```

## 📝 Data Types

### ProfileSalutations Enum

Available salutations for user profiles:

- `MR` - Mister
- `MS` - Miss
- `MRS` - Missus
- `DR` - Doctor
- `PROF` - Professor

### Input Fields

#### Create Profile Input

| Field       | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| avatarUrl   | string | ❌        | URL to profile avatar image     |
| salutation  | string | ✅        | User salutation (Mr, Ms, etc.)  |
| firstName   | string | ✅        | User's first name               |
| lastName    | string | ✅        | User's last name                |
| dateOfBirth | Date   | ✅        | User's date of birth (ISO 8601) |
| country     | string | ✅        | User's country                  |

#### Update Profile Input

| Field     | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| avatarUrl | string | ❌        | URL to profile avatar image |
| country   | string | ❌        | User's country              |

All fields are optional in update operations. Only provided fields will be updated.

## 🔒 Authentication

All GraphQL operations require authentication. The package uses `@rs-tech-hub/nestjs-auth-core` for JWT authentication:

- **profile_create** - Protected with `GqlAuthGuard`
- **profile_get** - Protected with `GqlAuthGuard`, returns current user's profile
- **updateProfile** - Protected with `GqlAuthGuard`, updates current user's profile

```typescript
// Authentication is handled automatically
// The current user is injected via @CurrentUser() decorator
@Query(() => [ProfileServiceOutput])
@UseGuards(GqlAuthGuard)
async profile_get(@CurrentUser() user: AuthenticatedUser) {
  // user.sub contains the authenticated user ID
  return this.profileRepository.findUnique({ userId: user.sub });
}
```

## ⚠️ Error Codes

| Error Code                      | Description             |
| ------------------------------- | ----------------------- |
| `profile-error:creation-failed` | Profile creation failed |
| `profile-error:update-failed`   | Profile update failed   |
| `profile-error:not-found`       | Profile not found       |

## 💡 Best Practices

1. **One Profile Per User**: Each user should have exactly one profile
2. **Validate Dates**: Ensure dateOfBirth is in valid ISO 8601 format
3. **Avatar URLs**: Validate avatar URLs before storing
4. **Country Codes**: Use standardized country names or ISO codes
5. **Update Selectively**: Only update fields that have changed
6. **Handle Not Found**: Gracefully handle cases where profile doesn't exist

## 📄 License

This package requires a valid commercial license. See LICENSE.txt for details.


## Release Notes

### 1.0.0

- Initial release

### 1.0.1

- Fixes profile_get Graphql endpoint
- Updates profile_update Graphql endpoint
- Updates internal license handling

## 🆘 Support

For technical support and inquiries:

- Email: insights@rs-tech-hub.com
- Website: https://rs-tech-hub.com
