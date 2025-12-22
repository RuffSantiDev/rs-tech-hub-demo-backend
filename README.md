Version: 1.0.0

# RS Tech Hub Demo Backend

This is a demo backend for RS Tech Hub Modules.

This repo gives you a basic user management system with secure authentication flow.
Please refer to the documentation of the individual packages.

The docker-compose file provides you with a production ready postgres database to get started right away.

## Included RS Tech Hub Modules

@rs-tech-hub/nestjs-account-starter@latest
@rs-tech-hub/nestjs-auth-core@latest
@rs-tech-hub/nestjs-auth-starter@latest
@rs-tech-hub/nestjs-clock@latest
@rs-tech-hub/nestjs-common-interceptors@latest
@rs-tech-hub/nestjs-prisma@latest
@rs-tech-hub/nestjs-profile@latest
@rs-tech-hub/nestjs-service-operation@latest
@rs-tech-hub/nestjs-user@latest
@rs-tech-hub/nestjs-test-starter@latest

# Requirements

- Docker installed
- NodeJS v24+

# Setup

## Environment variables

### Database Password

- use dbpw.dev.secret-template.txt and rename to dbpw.dev.secret.txt
  --> set your database password string directly into the first line (no identifier)
  --> The password is loaded by docker-compose

### ENV

- use .env-template.txt and renamve to .env
- Update the database password in
  --> DATABASE_URL=postgres://admin:password@localhost:5440/dev
- set the other environment variables

## Docker

### Initialize Docker

yarn docker:build:dev

-> Creates docker container with postgres database
--> rs-tech-hub-nestjs-demo-backend
---> nestjs-starter-backend-db

## NodeJS Project

### Install dependencies

yarn install

-> Installs project dependencies

### Installation notes:

!If some modules are still missing after installation, run these commands as well!

yarn add @rs-tech-hub/nestjs-account-starter@latest @rs-tech-hub/nestjs-auth-core@latest @rs-tech-hub/nestjs-auth-starter@latest @rs-tech-hub/nestjs-clock@latest @rs-tech-hub/nestjs-common-interceptors@latest @rs-tech-hub/nestjs-prisma@latest @rs-tech-hub/nestjs-profile@latest @rs-tech-hub/nestjs-service-operation@latest @rs-tech-hub/nestjs-user@latest @rs-tech-hub/nestjs-test-starter@latest
yarn add graphql @apollo/server
yarn add @nestjs/common @nestjs/core reflect-metadata rxjs
yarn add @nestjs/platform-express
yarn add passport @nestjs/passport passport-jwt @nestjs/jwt passport-local bcrypt axios
yarn add @as-integrations/express5

## Prisma

### Generate prisma client

yarn prisma:gen

-> Creates prisma client in ./generated

### Copy prisma client into node modules

!Always run this command after adding new dependencies!

yarn postinstall

-> Runs script/copy-prisma-client.js
--> copies generated folder -> node_modules/@rs-tech-hub/nestjs-prisma/src/lib/generated/client

### Migrate prisma to database

yarn prisma:migrate:dev

-> Initializes prisma schema in database

# Start Server

## Development Mode with hot reload

yarn start:dev

## Regular startup

yarn start

# API

Open Postman and start a GRAPHQL request here: localhost:4000/graphql
The introspection query provides you with the following APIs

## Query

- license_getLicenses
- auth_verifyEmail
- auth_currentUser
- account_getById
- account_validateData
- user_getCurrent
- user_getById
- user_getByEmail
- profile_get

## Mutation

- test_signUpTestUsers
- test_removeTestUsers
- license_resetProductionUsageCount
- auth_signUp
- auth_login
- auth_refreshToken
- auth_logout
- auth_renewActivationToken
- auth_activateUser
- auth_confirmSignupEmail
- auth_updatePassword
- account_update
- account_remove
- profile_update

# Support

Website: www.rs-tech-hub.com
eMail: insights@rs-tech-hub.com
NPM: https://www.npmjs.com/org/rs-tech-hub
GitHub: https://github.com/RuffSantiDev
