# @rs-tech-hub/nestjs-prisma

Prisma ORM integration for NestJS applications with PostgreSQL adapter, providing seamless database management, type-safe queries, and repository pattern support.

## ✨ Features

- 🔌 **PostgreSQL Adapter** - Built-in PrismaPg adapter with connection pooling
- 🎯 **Type-Safe Queries** - Full TypeScript support with Prisma Client
- 🏗️ **Repository Factory** - Generic repository pattern with automatic type inference
- 🔄 **Lifecycle Hooks** - Automatic connection management (connect/disconnect)
- 🧹 **Data Cleanup** - Helper methods to clean nested Prisma results
- 🌐 **Global Module** - Available throughout your application
- 📝 **Comprehensive CRUD** - Find, create, update, upsert, delete operations

## 📋 Prerequisites

- Node.js ≥ 20.11.1
- NestJS ≥ 11.1.6
- TypeScript ≥ 5.1.0
- Prisma ≥ 7.0.0
- PostgreSQL database

## 📦 Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## Schema

```prisma
generator client {
provider = "prisma-client-js"
output = "../generated/.prisma/client"
}

// Copy the generated client folder into the @rs-tech-hub/nestjs-prisma module
// -> src/lib/generated/client

datasource db {
provider = "postgresql"
}
```

## 🚀 Module Registration

### Basic Registration

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@rs-tech-hub/nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, // Global module - available everywhere
  ],
})
export class AppModule {}
```

### Environment Configuration

Set your database connection string in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:port/mydb?schema=public"
```

## 💻 Service Usage

### Direct PrismaService Usage

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@rs-tech-hub/nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; email: string }) {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: { name?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

### Data Cleanup Helper

Remove Prisma internal fields (fields starting with `_`):

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@rs-tech-hub/nestjs-prisma';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPostsWithCommentCount() {
    const posts = await this.prisma.post.findMany({
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });

    // Clean up _count and other internal fields
    return this.prisma.cleanupData(posts);
  }
}
```

## 🏗️ Repository Pattern

### Creating a Repository

Use the factory to create type-safe repositories:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService, createRepository } from '@rs-tech-hub/nestjs-prisma';
import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import type { User } from '@prisma/client';

const UserRepositoryBase = createRepository<User, PrismaService['user']>(
  (prisma) => prisma.user,
  'user'
);

@Injectable()
export class UserRepository extends UserRepositoryBase {
  constructor(
    prisma: PrismaService,
    serviceFacilitator: ServiceFacilitatorService
  ) {
    super(prisma, serviceFacilitator);
  }

  // Add custom methods here
  async findByEmail(email: string) {
    return this.findUnique({ email });
  }

  async findActiveUsers() {
    return this.findMany({ isActive: true });
  }
}
```

### Repository Usage in Service

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(id: string) {
    return this.userRepository.findUnique({ id });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async createUser(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.userRepository.update({ id }, data);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }
}
```

## 📖 Repository API Reference

### Find Methods

#### `findMany(where?, options?)`

Find multiple records with optional filtering and pagination.

```typescript
const users = await repository.findMany(
  { isActive: true },
  {
    orderBy: { createdAt: 'desc' },
    take: 10,
    skip: 0,
    select: { id: true, name: true, email: true },
  }
);
```

#### `findUnique(where, options?)`

Find a unique record by unique identifier.

```typescript
const user = await repository.findUnique(
  { id: 'user-123' },
  { include: { posts: true } }
);
```

#### `findWithSelect(where, select)`

Find with specific field selection (type-safe).

```typescript
const user = await repository.findWithSelect(
  { email: 'john@example.com' },
  { id: true, name: true, email: true }
);
// Returns: { id: string, name: string, email: string } | null
```

#### `findManyWithSelect(where?, select?, options?)`

Find multiple records with specific field selection.

```typescript
const users = await repository.findManyWithSelect(
  { isActive: true },
  { id: true, name: true },
  { orderBy: { name: 'asc' }, take: 5 }
);
```

#### `findOneWithSelect(where?, select?)`

Find first record matching criteria with field selection.

```typescript
const user = await repository.findOneWithSelect(
  { email: 'john@example.com' },
  { id: true, name: true }
);
```

#### `findWithInclude(where?, include?)`

Find with included relations.

```typescript
const user = await repository.findWithInclude(
  { id: 'user-123' },
  { posts: true, profile: true }
);
```

#### `findManyWithInclude(where?, include?, options?)`

Find multiple records with included relations.

```typescript
const users = await repository.findManyWithInclude(
  { isActive: true },
  { posts: true },
  { orderBy: { createdAt: 'desc' } }
);
```

#### `findWithFields(where?, fields?)`

Find with specific fields (simplified API).

```typescript
const user = await repository.findWithFields({ id: 'user-123' }, [
  'id',
  'name',
  'email',
]);
```

#### `findManyWithFields(where?, fields?)`

Find multiple records with specific fields.

```typescript
const users = await repository.findManyWithFields({ isActive: true }, [
  'id',
  'name',
]);
```

#### `findUniqueWithSelect(where, select)`

Find unique record with field selection.

```typescript
const user = await repository.findUniqueWithSelect(
  { id: 'user-123' },
  { id: true, name: true, email: true }
);
```

### Create/Update Methods

#### `create(data, select?)`

Create a new record.

```typescript
const user = await repository.create({
  name: 'John Doe',
  email: 'john@example.com',
});
```

#### `update(where, data, select?)`

Update an existing record.

```typescript
const user = await repository.update({ id: 'user-123' }, { name: 'Jane Doe' });
```

#### `upsert(where, create, update, select?)`

Create if not exists, update if exists.

```typescript
const user = await repository.upsert(
  { email: 'john@example.com' },
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'John Updated' }
);
```

### Delete Methods

#### `delete(where)`

Delete a single record.

```typescript
const deleted = await repository.delete({ id: 'user-123' });
```

#### `deleteMany(where?)`

Delete multiple records.

```typescript
const result = await repository.deleteMany({ isActive: false });
// Returns: { count: number }
```

### Utility Methods

#### `count(where?)`

Count records matching criteria.

```typescript
const total = await repository.count({ isActive: true });
```

#### `exists(where?)`

Check if records exist.

```typescript
const hasUsers = await repository.exists({ isActive: true });
```

### Data Cleanup

#### `cleanupData(data)`

Remove internal Prisma fields (starting with `_`).

```typescript
const cleanData = this.prisma.cleanupData(result);
```

## 📊 Advanced Usage

### Transactions

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@rs-tech-hub/nestjs-prisma';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrderWithItems(orderData: any, items: any[]) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({ data: orderData });

      const orderItems = await Promise.all(
        items.map((item) =>
          tx.orderItem.create({
            data: { ...item, orderId: order.id },
          })
        )
      );

      return { order, orderItems };
    });
  }
}
```

### Raw Queries

```typescript
const users = await this.prisma.$queryRaw`
  SELECT * FROM "User" WHERE "email" = ${email}
`;
```

### Middleware

```typescript
constructor(configService: ConfigService) {
  super(/* ... */);

  this.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
    return result;
  });
}
```

## Release notes

### 1.0.1

- Adds testConnection method
- Throws error when database connection fails

## 💡 Best Practices

1. **Use Repository Pattern**: Encapsulate data access logic in repositories
2. **Type Safety**: Leverage TypeScript for compile-time type checking
3. **Connection Pooling**: The service uses pg Pool for efficient connection management
4. **Transactions**: Use `$transaction` for operations that must succeed or fail together
5. **Select Fields**: Use `select` to fetch only needed fields for better performance
6. **Error Handling**: Repository methods use ServiceFacilitator for consistent error handling
7. **Cleanup Data**: Use `cleanupData()` to remove Prisma internal fields from API responses

## 📄 License

This package is free and open source under the MIT License.

## 🆘 Support

For issues, questions, or contributions, please visit the [RS-Tech-Hub repository](https://github.com/rs-tech-hub/nestjs-backend).
