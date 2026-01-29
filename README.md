Version: 1.0.0

# RS Tech Hub Demo Backend

This is a demo backend for RS Tech Hub Modules.

This repo gives you a basic user management system with secure authentication flow.
Please refer to the documentation of the individual packages.

The docker-compose file provides you with a production ready postgres database to get started right away.

## Included RS Tech Hub Modules

- @rs-tech-hub/nestjs-account-starter@latest
- @rs-tech-hub/nestjs-auth-core@latest
- @rs-tech-hub/nestjs-auth-starter@latest
- @rs-tech-hub/nestjs-clock@latest
- @rs-tech-hub/nestjs-common-interceptors@latest
- @rs-tech-hub/nestjs-prisma@latest
- @rs-tech-hub/nestjs-profile@latest
- @rs-tech-hub/nestjs-service-operation@latest
- @rs-tech-hub/nestjs-user@latest
- @rs-tech-hub/nestjs-test-starter@latest

# Requirements

- Docker 4+
- NodeJS v24+

# Setup

## Environment variables

DATABASE_URL=postgres://admin:PASSWORD@localhost:5440/dev
DATABASE_PORT=5440
DATABASE_HOST=localhost
NODE_ENV=development
JWT_SECRET=NEEDS_TO_BE_SET
JWT_REFRESH_SECRET=NEEDS_TO_BE_SET
SERVICE_TOKEN=NEEDS_TO_BE_SET
JWT_EXPIRES_IN=NEEDS_TO_BE_SET
REQUEST_SIGNING_SECRET=NEEDS_TO_BE_SET
CSRF_SECRET=NEEDS_TO_BE_SET
SESSION_SECRET=NEEDS_TO_BE_SET
BASIC_AUTH_USERNAME=NEEDS_TO_BE_SET
BASIC_AUTH_PASSWORD=NEEDS_TO_BE_SET
RS_TECH_HUB_NESTJS_LICENSE_KEY=NEEDS_TO_BE_SET_FOR_STAGING_AND_PROD

### Database Password

- use dbpw.dev.secret-template.txt and rename to dbpw.dev.secret.txt
  - set your database password string directly into the first line (no identifier)
- The password is loaded by docker-compose

### ENV

- use .env-template.txt and renamve to .env
- Update the database password in
  - DATABASE_URL=postgres://admin:password@localhost:5440/dev
- set the other environment variables

## Docker

### Initialize Docker

yarn docker:build:dev

- Creates docker container with postgres database
  - rs-tech-hub-nestjs-demo-backend
    - nestjs-starter-backend-db

## NodeJS Project

### Install dependencies

yarn install

- Installs project dependencies

## Prisma

### Generate prisma client

yarn prisma:gen

- Creates prisma client in ./generated
- Copies the client into rs-tech-hub/prisma automatically
  - alternatively run yarn prisma:copy:client



### Migrate prisma to database

yarn prisma:migrate:dev

- Initializes prisma schema in database

# Start Server

## Development Mode with hot reload

yarn start:dev

-> RS-Tech-Hub modules will automatically be copied into dist

## Regular startup

yarn start

# Testing

## Run test script

yarn test:api

## Test Report

The test creates a test report

Check your current test report under scripts/testing/reports/{currentDate}_testReport.md

# API

Open Postman and start a GRAPHQL request here: localhost:4000/graphql
The introspection query provides you with the following APIs

Set either the service token or the user authentication token in auth type Bearer Token depending on the API.

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

# Contact, Website & Support

Website: www.rs-tech-hub.com
contact: insights@rs-tech-hub.com
GitHub: https://github.com/RuffSantiDev
