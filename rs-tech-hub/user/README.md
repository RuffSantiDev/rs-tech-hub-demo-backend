# @rs-tech-hub/nestjs-user

Comprehensive user management for NestJS applications with GraphQL support. Manage complete user lifecycles including creation, activation, deactivation, soft deletion, and permanent removal with status tracking, activity logging, and automated lifecycle management.

## 📄 License

This package requires a valid RS Tech Hub commercial license key. The software is protected by intellectual property laws and is provided under a commercial license agreement.

### License Terms

- Commercial use requires a valid license key
- Development testing allowed with free trial
- Production deployment requires a paid license from https://rstechhub.gumroad.com
- Contact insights@rs-tech-hub.com for questions and inquiries

## ✨ Features

- 👤 **User CRUD** - Create and manage user accounts
- ✅ **User Activation** - Activate users with status tracking
- 🔄 **User Reactivation** - Reactivate deactivated users
- 📧 **Email Updates** - Update user email addresses with validation
- 🔒 **Password Management** - Update user passwords with hash/salt
- 👥 **Role Management** - Assign and update user roles
- 🚫 **Deactivation** - Deactivate inactive or pending users (with grace periods)
- ⛔ **Disable Users** - Permanently disable user accounts
- 🗑️ **Soft Delete** - Soft delete disabled users before permanent removal
- ⏰ **Scheduled Deletion** - Schedule soft-deleted users for permanent deletion
- 💀 **Permanent Deletion** - Permanently delete scheduled users
- 📊 **Activity Logging** - Track user activities (register, activate, login, etc.)
- 🔍 **User Queries** - Retrieve users by ID, email, status, or account
- 📈 **Statistics** - Get user counts and check email existence
- 🔐 **Authentication Required** - Protected GraphQL operations
- 🔄 **Batch Operations** - Deactivate, disable, soft delete, and delete users in batches
- ⏱️ **Automated Scheduler** - Daily cron job for deactivating inactive users

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
import { UserModule } from '@rs-tech-hub/nestjs-user';

@Module({
  imports: [UserModule],
})
export class AppModule {}
```

## 📖 GraphQL API

### Authentication Requirements

- **GqlAuthGuard** - Requires User JWT token (authenticated user)
- **ServiceAuthGuard** - Requires Service token (internal service-to-service communication)

### Queries

#### Get Current User

🔐 **Authentication**: GqlAuthGuard (User token required)

```graphql
query {
  user_getCurrent {
    id
    email
    Status
    Role
    accountId
    isVerified
    activatedAt
    deactivatedAt
    disabledAt
    createdAt
    updatedAt
  }
}
```

#### Get User by ID

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
query {
  user_getById(userId: "user-id-here") {
    id
    email
    Status
    Role
    accountId
    isVerified
    activatedAt
    createdAt
    updatedAt
  }
}
```

#### Get User by Email

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
query {
  user_getByEmail(email: "user@example.com") {
    id
    email
    Status
    Role
    accountId
    isVerified
    createdAt
    updatedAt
  }
}
```

#### Get All Users (Paginated)

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
query {
  user_getAll(page: 1, limit: 10) {
    users {
      id
      email
      Status
      Role
      accountId
      createdAt
    }
    total
    page
    limit
    totalPages
  }
}
```

#### Check if Email Exists

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
query {
  user_emailExists(email: "user@example.com")
}
```

#### Get Users by Status

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
query {
  user_getAllByStatus(status: ACTIVE) {
    id
    email
    Status
    Role
    createdAt
  }
}
```

#### Get Users by Account ID

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
query {
  user_getAllByAccountId(accountId: "account-id-here") {
    id
    email
    Status
    Role
    createdAt
  }
}
```

#### Get Total Users Count

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
query {
  user_getUsersCount
}
```

#### Get Active Users Count

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
query {
  user_getActiveUsersCount
}
```

### Mutations

#### Activate User

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_activate(userId: "user-id-here") {
    id
    Status
    isVerified
    activatedAt
  }
}
```

#### Reactivate User

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_reactivate(userId: "user-id-here") {
    id
    Status
    activatedAt
  }
}
```

#### Update User Role

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_updateRole(input: { id: "user-id-here", role: USER }) {
    id
    Role
    updatedAt
  }
}
```

#### Update User Email

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

**Note**: This mutation is not exposed in the GraphQL resolver. Use the UserService directly in your application code.

#### Update User Password

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

**Note**: This mutation is not exposed in the GraphQL resolver. Use the UserService directly in your application code for security reasons.

#### Deactivate User

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_deactivate(userId: "user-id-here") {
    id
    Status
    deactivatedAt
  }
}
```

#### Deactivate Pending User

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_deactivatePendingUser(
    input: { id: "user-id-here", gracePeriodInDays: 30 }
  ) {
    id
    Status
    deactivatedAt
  }
}
```

#### Deactivate Active User

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_deactivateActiveUser(
    input: { id: "user-id-here", gracePeriodInMonths: 6 }
  ) {
    id
    Status
    deactivatedAt
  }
}
```

#### Disable User

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_disable(userId: "user-id-here") {
    id
    Status
    disabledAt
  }
}
```

#### Delete User

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_delete(userId: "user-id-here") {
    id
    Status
  }
}
```

#### Deactivate Inactive Users (Batch)

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

Batch deactivate all active and pending users based on inactivity. Provides detailed tracking with categorized results for deactivated, skipped, and failed users.

```graphql
mutation {
  user_deactivateInactiveUsers {
    id
    email
    Status
    deactivatedAt
  }
}
```

#### Disable Deactivated Users (Batch)

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

```graphql
mutation {
  user_disableDeactivatedUsers(gracePeriodInMonths: 6) {
    id
    email
    Status
    disabledAt
  }
}
```

#### Soft Delete and Schedule for Deletion (Batch)

🔐 **Authentication**: ServiceAuthGuard (ServiceToken required)

Soft deletes disabled users and schedules them for permanent deletion.

```graphql
mutation {
  user_scheduleSoftDeletedUsersForDeletion() {
    id
    email
    Status
    softDeletedAt
    isScheduledForDeletion
    scheduledDeletionAt
  }
}
```

## 💻 Service Usage

### Creating Users

```typescript
import { Injectable } from '@nestjs/common';
import { UserService } from '@rs-tech-hub/nestjs-user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser(email: string, password: string, accountId: string) {
    const { hash, salt } = this.hashPassword(password);

    return await this.userService.create({
      email,
      hash,
      salt,
      accountId,
    });
  }
}
```

### Activating Users

```typescript
// Activate user by ID
async activateUserById(userId: string) {
  return await this.userService.activateById(userId);
}

// Reactivate deactivated or inactive user by ID
async reactivateUserById(userId: string) {
  return await this.userService.reactivateById(userId);
}
```

### Updating Email

```typescript
async changeUserEmail(userId: string, newEmail: string) {
  return await this.userService.updateEmail({
    id: userId,
    email: newEmail,
  });
}
```

### Updating Password

```typescript
async changePassword(userId: string, newPassword: string) {
  const { hash, salt } = this.hashPassword(newPassword);

  return await this.userService.updatePassword({
    id: userId,
    hash,
    salt,
  });
}
```

### Updating Account ID

```typescript
async changeUserAccount(userId: string, newAccountId: string) {
  return await this.userService.updateAccountId({
    id: userId,
    accountId: newAccountId,
  });
}
```

### User Status Management

```typescript
// Deactivate user by ID
async deactivateUser(userId: string) {
  return await this.userService.deactivateById(userId);
}

// Permanently disable user by ID
async disableUser(userId: string) {
  return await this.userService.disableById(userId);
}

// Delete user by ID (must be disabled first)
async deleteUser(userId: string) {
  return await this.userService.deleteById(userId);
}
```

### Activity Logging

```typescript
async logUserActivity(userId: string, activityType: UserActivityType) {
  await this.userService.logActivity({
    userId,
    Type: activityType,
  });
}
```

### Retrieving Users

```typescript
// Get user by ID
const user = await this.userService.getById('user-id');

// Get user by email
const user = await this.userService.getByEmail('user@example.com');

// Get all users with pagination
const paginatedResult = await this.userService.getAll({ page: 1, limit: 10 });

// Get users by status
const activeUsers = await this.userService.getAllByStatus(UserStatus.ACTIVE);

// Get users by account ID
const accountUsers = await this.userService.getAllByAccountId('account-id');

// Check if email exists
const exists = await this.userService.emailExists('user@example.com');

// Get total and active user counts
const totalCount = await this.userService.getUsersCount();
const activeCount = await this.userService.getActiveUsersCount();
```

### User Lifecycle Management

```typescript
// Deactivate pending user after grace period
const result = await this.userService.deactivatePendingUser({
  id: 'user-id',
  gracePeriodInDays: 30,
});

// Deactivate active user after inactivity period
const result = await this.userService.deactivateActiveUser({
  id: 'user-id',
  gracePeriodInMonths: 6,
});

// Soft delete a disabled user
const softDeletedUser = await this.userService.softDeleteById('user-id');

// Schedule a soft-deleted user for permanent deletion
const scheduledUser = await this.userService.scheduleForDeletionById('user-id');

// Permanently delete a user (must be scheduled first)
const deletedUser = await this.userService.deleteById('user-id');
```

### Batch Operations

Batch operations provide comprehensive tracking and reporting. Each operation returns arrays of successfully processed users and logs detailed information about skipped users and errors.

```typescript
// Deactivate all inactive users (6 months for active, 30 days for pending)
// Returns only successfully deactivated users
// Logs summary: X deactivated, Y skipped, Z errors
const deactivatedUsers = await this.userService.deactivateInactiveUsers();

// Disable all deactivated users after grace period (default: 6 months)
const disabledUsers = await this.userService.disableDeactivatedUsers(6);

// Soft delete all disabled users
const softDeletedUsers = await this.userService.softDeleteDisabledUsers();

// Schedule soft-deleted users for permanent deletion (default: 30 days)
const scheduledUsers =
  await this.userService.scheduleSoftDeletedUsersForDeletion(30);

// Permanently delete all scheduled users
const deletedUsers = await this.userService.deleteScheduledUsers();
```

## 🔧 Repository Usage

Direct database access via `UserRepository`:

```typescript
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@rs-tech-hub/nestjs-user';

@Injectable()
export class UserManagementService {
  constructor(private userRepo: UserRepository) {}

  async findActiveUsers() {
    return this.userRepo.findMany({ Status: 'ACTIVE' });
  }

  async countUsers() {
    return this.userRepo.count();
  }

  async deleteUser(userId: string) {
    return this.userRepo.delete({ id: userId });
  }
}
```

## 📖 API Reference

### UserService Public Methods

#### User Creation & Registration

##### `create(input: UserCreateServiceInput): Promise<UserServiceOutput>`

Create a new user with email, hash, salt, and account association.

#### User Activation & Reactivation

##### `activateById(id: string): Promise<UserServiceOutput>`

Activate a user account by ID and log activation activity.

##### `reactivateById(id: string): Promise<UserServiceOutput>`

Reactivate a deactivated or inactive user account. Sets status to ACTIVE and updates activatedAt timestamp.

#### User Information Updates

##### `updateEmail(input: UserUpdateEmailServiceInput): Promise<UserServiceOutput>`

Update user email address (email is normalized to lowercase and trimmed).

##### `updatePassword(data: { id, hash, salt }): Promise<UserServiceOutput>`

Update user password with new hash and salt.

##### `updateRole(input: UserUpdateRoleServiceInput): Promise<UserServiceOutput>`

Update user role (USER, ADMIN, SUPER_ADMIN).

##### `updateAccountId(input: UserUpdateAccountIdServiceInput): Promise<UserServiceOutput>`

Update the account ID associated with a user.

#### User Deactivation - Single User

##### `deactivateById(userId: string): Promise<UserServiceOutput>`

Deactivate a user by ID. Sets status to INACTIVE.

##### `deactivatePendingUser(userId: string, gracePeriodInDays: number): Promise<UserServiceOutput>`

Deactivate a pending user who hasn't activated within the grace period.

##### `deactivateActiveUser(userId: string, gracePeriodInMonths: number): Promise<UserServiceOutput>`

Deactivate an active user with no login activity for the specified grace period.

#### User Deactivation - Batch Operations

##### `deactivateInactiveUsers(): Promise<UserServiceOutput[]>`

Batch deactivate all active and pending users with no login activity. Active users are deactivated after 6 months of inactivity, pending users after 30 days. Returns array of successfully deactivated users. Provides comprehensive logging with categorized tracking of deactivated, skipped, and failed users.

#### User Disable - Single User

##### `disableById(userId: string): Promise<UserServiceOutput>`

Permanently disable a user account by ID.

#### User Disable - Batch Operations

##### `disableDeactivatedUsers(gracePeriodInMonths: number): Promise<UserServiceOutput[]>`

Batch disable all users who have been deactivated for the specified period.

#### User Soft Deletion - Single User

##### `softDeleteById(userId: string): Promise<UserServiceOutput>`

Soft delete a disabled user by ID. User must be disabled first.

##### `scheduleForDeletionById(userId: string): Promise<UserServiceOutput>`

Schedule a soft-deleted user for permanent deletion.

#### User Soft Deletion - Batch Operations

##### `softDeleteDisabledUsers(): Promise<UserServiceOutput[]>`

Batch soft delete all disabled users.

##### `scheduleSoftDeletedUsersForDeletion(gracePeriodInDays: number): Promise<UserServiceOutput[]>`

Schedule all soft-deleted users for permanent deletion after the grace period.

#### User Deletion - Single User

##### `deleteById(userId: string): Promise<UserServiceOutput>`

Permanently delete a user account by ID. User must have DISABLED status (not SCHEDULED_DELETION as previously documented).

#### User Deletion - Batch Operations

##### `deleteScheduledUsers(): Promise<UserServiceOutput[]>`

Permanently delete all users scheduled for deletion.

#### User Retrieval

##### `getById(userId: string): Promise<UserServiceOutput>`

Retrieve user by ID.

##### `getByEmail(email: string): Promise<UserServiceOutput>`

Retrieve user by email address.

##### `getAll(input: UserGetAllServiceInput): Promise<PaginatedUserServiceOutput>`

Get all users with pagination. Returns paginated results with total count and page information.

##### `getAllByStatus(status: UserStatus): Promise<UserServiceOutput[]>`

Get all users with a specific status (PENDING, ACTIVE, INACTIVE, DISABLED).

##### `getAllByAccountId(accountId: string): Promise<UserServiceOutput[]>`

Get all users associated with a specific account ID.

#### User Statistics

##### `emailExists(email: string): Promise<boolean>`

Check if an email address already exists in the system.

##### `getUsersCount(): Promise<number>`

Get total count of all users in the system.

##### `getActiveUsersCount(): Promise<number>`

Get count of active users only.

#### Activity Logging

##### `logActivity(input: UserLogActivityServiceInput): Promise<UserActivity>`

Log user activity (register, activate, login, update, etc.). Returns the created UserActivity record.

## 📊 Data Types

### UserStatus Enum

- `PENDING` - User created but not activated
- `ACTIVE` - User is active and can use the system
- `INACTIVE` - User inactive for extended period (deactivated)
- `DISABLED` - User permanently disabled
- `SCHEDULED_DELETION` - User soft-deleted and scheduled for permanent deletion

### UserRole Enum

- `USER` - Regular user
- `ADMIN` - Administrator

### UserActivityType Enum

- `REGISTER` - User registration
- `ACTIVATE` - Account activation
- `LOGIN` - User login
- `LOGOUT` - User logout
- `UPDATE_EMAIL` - Email address update
- `UPDATE_PASSWORD` - Password update
- `UPDATE_PROFILE` - Profile update (including role changes)
- `DEACTIVATE` - Account deactivation
- `DISABLE` - Account disable
- `SOFT_DELETE` - Soft deletion
- `SCHEDULE_DELETION` - Scheduled for permanent deletion

### UserCreateServiceInput

```typescript
{
  email: string; // User email (normalized to lowercase)
  hash: string; // Password hash
  salt: string; // Password salt
  accountId: string; // Associated account ID
}
```

### UserActivateServiceInput

```typescript
{
  id: string; // User ID to activate
}
```

### UserUpdateEmailServiceInput

```typescript
{
  id: string; // User ID
  email: string; // New email address
}
```

### UserUpdateRoleServiceInput

```typescript
{
  id: string; // User ID
  role: UserRole; // New role (USER, ADMIN, SUPER_ADMIN)
}
```

### UserUpdateAccountIdServiceInput

```typescript
{
  id: string; // User ID
  accountId: string; // New account ID
}
```

### UserGetAllServiceInput

```typescript
{
  page?: number; // Page number (default: 1)
  limit?: number; // Items per page (default: 10)
}
```

### PaginatedUserServiceOutput

```typescript
{
  users: UserServiceOutput[]; // Array of users
  total: number; // Total count of users
  page: number; // Current page
  limit: number; // Items per page
  totalPages: number; // Total number of pages
}
```

## 🔒 Authentication

All GraphQL operations require authentication. The package uses `@rs-tech-hub/nestjs-auth-core` for authentication with two types of guards:

### GqlAuthGuard (User Token)

Requires a valid JWT user authentication token. Used for user-facing operations:

- **user_getCurrent** - Returns authenticated user's information

### ServiceAuthGuard (Service Token)

Requires a valid service-to-service authentication token. Used for internal service operations:

**Queries:**

- **user_getById** - Get user by ID
- **user_getByEmail** - Get user by email
- **user_getAll** - Get all users with pagination
- **user_emailExists** - Check if email exists
- **user_getAllByStatus** - Get users by status
- **user_getAllByAccountId** - Get users by account
- **user_getUsersCount** - Get total users count
- **user_getActiveUsersCount** - Get active users count

**Mutations:**

- **user_activate** - Activate user
- **user_reactivate** - Reactivate user
- **user_updateRole** - Update user role
- **user_updateEmail** - Update user email
- **user_updatePassword** - Update user password
- **user_deactivate** - Deactivate user
- **user_deactivatePendingUser** - Deactivate pending user with grace period
- **user_deactivateActiveUser** - Deactivate active user with grace period
- **user_deactivateInactiveUsers** - Batch deactivate inactive users
- **user_disable** - Disable user
- **user_disableDeactivatedUsers** - Batch disable deactivated users
- **user_delete** - Delete user
- **user_scheduleSoftDeletedUsersForDeletion** - Soft delete and schedule for deletion

## ⚠️ Error Codes

### User Validation Errors

| Error Code                        | Description                  |
| --------------------------------- | ---------------------------- |
| `user-error:user-does-not-exist`  | User not found               |
| `user-error:user-not-found`       | User not found (alternative) |
| `user-error:id-required`          | User ID is required          |
| `user-error:user-already-exists`  | User already exists          |
| `user-error:failed-to-fetch-user` | Failed to fetch user         |

### User Status Errors

| Error Code                          | Description               |
| ----------------------------------- | ------------------------- |
| `user-error:user-already-activated` | User is already activated |
| `user-error:user-already-disabled`  | User is already disabled  |
| `user-error:user-already-inactive`  | User is already inactive  |
| `user-error:user-not-activated`     | User not activated        |
| `user-error:user-not-active`        | User is not active        |
| `user-error:user-not-disabled`      | User is not disabled      |
| `user-error:user-not-inactive`      | User is not inactive      |
| `user-error:user-not-pending`       | User is not pending       |
| `user-error:user-still-active`      | User is still active      |
| `user-error:user-not-soft-deleted`  | User is not soft deleted  |

### User Lifecycle Operation Errors

| Error Code                                  | Description                             |
| ------------------------------------------- | --------------------------------------- |
| `user-error:activation-failed`              | User activation failed                  |
| `user-error:deactivation-failed`            | User deactivation failed                |
| `user-error:soft-delete-failed`             | Soft delete failed                      |
| `user-error:delete-failed`                  | Permanent deletion failed               |
| `user-error:disable-failed`                 | User disable failed                     |
| `user-error:reactivation-failed`            | User reactivation failed                |
| `user-error:not-scheduled-for-deletion`     | User not scheduled for deletion         |
| `user-error:scheduled-deletion-not-reached` | Scheduled deletion date not yet reached |

### User Update Operation Errors

| Error Code                          | Description            |
| ----------------------------------- | ---------------------- |
| `user-error:password-update-failed` | Password update failed |
| `user-error:role-update-failed`     | Role update failed     |
| `user-error:email-update-failed`    | Email update failed    |
| `user-error:update-failed`          | General update failed  |

### User Email Errors

| Error Code                        | Description                   |
| --------------------------------- | ----------------------------- |
| `user-error:email-already-exists` | Email already exists          |
| `user-error:is-current-email`     | Email is user's current email |

### User Activity Errors

| Error Code                            | Description                  |
| ------------------------------------- | ---------------------------- |
| `user-error:activity-creation-failed` | Activity log creation failed |

## ⏱️ Automated Scheduler

The user package includes an automated scheduler service that runs daily maintenance tasks.

### Daily Cron Job

The scheduler automatically runs every day at 10:00 AM to deactivate inactive users:

```typescript
@Cron(CronExpression.EVERY_DAY_AT_10AM)
async handleDeactivateInactiveUsers()
```

This cron job:

- Checks for ACTIVE and PENDING users with no login activity
- Automatically deactivates users based on inactivity criteria
- Logs all deactivation actions for audit purposes

### Configuration

The scheduler is automatically enabled when you import the `UserModule`. No additional configuration is required.

**Note**: The scheduler uses the `@nestjs/schedule` package which is included as a dependency.

## 💡 Best Practices

1. **Email Normalization**: Emails are automatically lowercased and trimmed
2. **Status Transitions**: Follow proper status flow (PENDING → ACTIVE → INACTIVE → DISABLED → SCHEDULED_DELETION → Deleted)
3. **Activity Logging**: Log significant user activities using `logActivity()` for audit trails
4. **Password Security**: Store only hash and salt, never plain passwords
5. **Account Association**: Users must be linked to an account
6. **Lifecycle Management**:
   - Use deactivate for temporary suspension
   - Use disable for permanent suspension
   - Use soft delete before permanent deletion
   - Schedule soft-deleted users for permanent deletion with grace period
7. **Timestamp Tracking**: Track activatedAt, deactivatedAt, disabledAt, softDeletedAt, and scheduledDeletionAt
8. **Grace Periods**: Use appropriate grace periods for batch operations (30 days for pending, 6 months for active)
9. **Batch Operations**: Use batch operations for efficient cleanup of inactive users
10. **Automated Maintenance**: The scheduler automatically handles daily deactivation - no manual intervention needed
11. **Security**: Email and password updates are not exposed via GraphQL - use the service directly for better security

## 📋 Release Notes

### Version 1.1.0 (January 21, 2026)

#### New Features

- ✅ Added `updateAccountId()` method to update user account associations
- ✅ Implemented automated scheduler for daily user deactivation tasks
- ✅ Added cron job running at 10 AM daily to deactivate inactive users
- ✅ Enhanced user lifecycle management with scheduled deletion support
- ✅ Added `scheduleForDeletionById()` method for soft-deleted users
- ✅ Improved batch operations for user lifecycle management

#### Bug Fixes

- 🐛 Fixed user retrieval logic to correctly prioritize ID over email lookups
- 🐛 Fixed activity logging to ensure all user actions are properly tracked
- 🐛 Fixed operation tracking conflicts in user management methods

#### Improvements

- 🔧 Enhanced email validation performance and reliability
- 🔧 Improved batch operation reporting with detailed tracking:
  - Successfully processed users
  - Skipped users with reasons
  - Failed operations with error details
- 🔧 Better error messages for easier troubleshooting
- 🔧 Enhanced audit logging with detailed summaries and individual user tracking
- 🔧 Improved batch operation resilience - errors no longer stop the entire process
- 🔧 Added validation for grace period inputs

#### API Changes

- 📝 `deactivatePendingUser()` now requires input object with `id` and `gracePeriodInDays`
- 📝 `deactivateActiveUser()` now requires input object with `id` and `gracePeriodInMonths`
- 📝 GraphQL mutations updated to match new input object patterns
- 📝 Email and password update mutations removed from GraphQL for security (use service directly)

## 🐛 Issues & Support

For issues, feature requests, or general questions contact insights@rs-tech-hub.com

Please review the docs first: https://rs-tech-hub.com/docs

## 🌐 Website

Visit the website for more information: https://rs-tech-hub.com

## 📰 Newsletter

Stay updated with the latest news and updates by subscribing to the newsletter at https://rs-tech-hub.kit.com/newsletter

---

**Built with ❤️ by RS Tech Hub**
