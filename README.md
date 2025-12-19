Version: 1.0.0

# RS Tech Hub Demo Backend

This is a demo backend for RS Tech Hub Modules

## Included RS Tech Hub Modules

"@rs-tech-hub/nestjs-account-starter": "1.0.0",
"@rs-tech-hub/nestjs-auth-core": "1.0.0",
"@rs-tech-hub/nestjs-auth-starter": "1.0.1",
"@rs-tech-hub/nestjs-clock": "1.0.0",
"@rs-tech-hub/nestjs-common-interceptors": "1.0.1",
"@rs-tech-hub/nestjs-prisma": "1.0.0",
"@rs-tech-hub/nestjs-profile": "1.0.0",
"@rs-tech-hub/nestjs-service-operation": "1.0.0",
"@rs-tech-hub/nestjs-user": "1.0.0",

# Requirements

- Docker installed
- NodeJS v24+

# Setup

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

## Prisma

### Generate prisma client

yarn prisma:gen

-> Creates prisma client in ./generated

### Copy prisma client into node modules

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

# Support

Website: www.rs-tech-hub.com
eMail: insights@rs-tech-hub.com
NPM: https://www.npmjs.com/org/rs-tech-hub
GitHub: https://github.com/RuffSantiDev
