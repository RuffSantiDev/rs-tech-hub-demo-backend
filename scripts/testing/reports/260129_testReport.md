# Test Report - 2026-01-29 06:58:41

**Endpoint:** http://localhost:4000/graphql
**Flags:** {"all":true,"auth":false,"user":false}
**Start Time:** 2026-01-29 06:58:41

---

**[2026-01-29 06:58:41]** [INFO] Test suite execution started

## Auth Starter Test Suite

**[2026-01-29 06:58:41]** [SUITE] Starting test suite: Auth Starter Test Suite

**[2026-01-29 06:58:41]** [TEST] Running test: [01] Verify Email Before Signup (Should return success:false)

### [01] Verify Email Before Signup (Should return success:false)

#### GraphQL Request

**Query:**
```graphql
query VerifyEmail($input: VerifyEmailResolverInput!) {
      auth_verifyEmail(input: $input) {
        success
        email
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com"
  }
}
```

**Response:**
```json
{
  "auth_verifyEmail": {
    "success": false,
    "email": "test.user.1769669921681@example.com"
  }
}
```

- **Test ID:** 01
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:58:41

**[2026-01-29 06:58:47]** [TEST] Running test: [02] Sign Up

### [02] Sign Up

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          email
          accountId
        }
        token
        activationKey
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "TestPa$$word123!",
    "firstName": "Test",
    "lastName": "User"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com",
      "accountId": "cmkz3s7pa00003gelh1890sb5"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY2OTkyOCwiZXhwIjoxNzY5NjczNTI4fQ.U2knU-DVoLSfdX3hWs1Wj9rIntq1S1IdAhe_TwBL-70",
    "activationKey": "7950f11c5b56d0931196b3411e365ee10b6ce53699d05aff5ce5c5da2b979771"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3s7pa00003gelh1890sb5",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3s7pa00003gelh1890sb5",
    "Type": "TEST"
  }
}
```

- **Test ID:** 02
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:58:48

**[2026-01-29 06:58:54]** [TEST] Running test: [02a] Get Account by ID

### [02a] Get Account by ID

#### GraphQL Request

**Query:**
```graphql
query GetAccountById($accountId: String!) {
      account_getById(accountId: $accountId) {
        id
        name
        primaryEmail
        Type
        signupIpAddress
        isDemoContentReady
        createdAt
        updatedAt
      }
    }
```

**Variables:**
```json
{
  "accountId": "cmkz3s7pa00003gelh1890sb5"
}
```

**Response:**
```json
{
  "account_getById": {
    "id": "cmkz3s7pa00003gelh1890sb5",
    "name": "test.user.1769669921681@example.com",
    "primaryEmail": "test.user.1769669921681@example.com",
    "Type": "TEST",
    "signupIpAddress": null,
    "isDemoContentReady": false,
    "createdAt": "2026-01-29T06:58:48.189Z",
    "updatedAt": "2026-01-29T06:58:48.391Z"
  }
}
```

- **Test ID:** 02a
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:58:54

**[2026-01-29 06:59:00]** [TEST] Running test: [02b] Validate Account Data

### [02b] Validate Account Data

#### GraphQL Request

**Query:**
```graphql
query ValidateAccountData($data: AccountStarterCreateServiceInput!) {
      account_validateData(data: $data) {
        isValid
        errors
        message
      }
    }
```

**Variables:**
```json
{
  "data": {
    "name": "Test Company",
    "primaryEmail": "newTestUser@example.com",
    "Type": "TEST",
    "signupIpAddress": "127.0.0.1",
    "isDemoContentReady": false
  }
}
```

**Response:**
```json
{
  "account_validateData": {
    "isValid": true,
    "errors": null,
    "message": "Account validation passed"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
query ValidateAccountData($data: AccountStarterCreateServiceInput!) {
      account_validateData(data: $data) {
        isValid
        errors
        message
      }
    }
```

**Variables:**
```json
{
  "data": {
    "name": "Test Company",
    "primaryEmail": "invalid-email",
    "Type": "TEST",
    "signupIpAddress": "127.0.0.1",
    "isDemoContentReady": false
  }
}
```

**Response:**
```json
{
  "account_validateData": {
    "isValid": false,
    "errors": [
      "primaryEmail must be an email"
    ],
    "message": "account-error:validation-failed"
  }
}
```

- **Test ID:** 02b
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:01

**[2026-01-29 06:59:07]** [TEST] Running test: [03] Verify Email After Signup (Should Pass)

### [03] Verify Email After Signup (Should Pass)

#### GraphQL Request

**Query:**
```graphql
query VerifyEmail($input: VerifyEmailResolverInput!) {
      auth_verifyEmail(input: $input) {
        success
        email
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com"
  }
}
```

**Response:**
```json
{
  "auth_verifyEmail": {
    "success": true,
    "email": "test.user.1769669921681@example.com"
  }
}
```

- **Test ID:** 03
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:07

**[2026-01-29 06:59:13]** [TEST] Running test: [03.5] Login Before Activation (Should Fail)

### [03.5] Login Before Activation (Should Fail)

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
          Status
          Role
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "TestPa$$word123!"
  }
}
```

**Response:**
```json
[
  {
    "message": "auth-error:user-not-verified",
    "locations": [
      {
        "line": 3,
        "column": 7
      }
    ],
    "path": [
      "auth_login"
    ],
    "extensions": {
      "code": "INTERNAL_SERVER_ERROR",
      "stacktrace": [
        "Error: auth-error:user-not-verified",
        "    at ServiceResult.extractOrThrow (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\classes\\service.result.js:28:19)",
        "    at AuthStarterResolver.auth_login (rs-tech-hub-demo-backend\\rs-tech-hub\\auth-starter\\src\\lib\\auth-starter.resolver.js:1:7609)",
        "    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)"
      ]
    }
  }
]
```

- **Test ID:** 03.5
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:13

**[2026-01-29 06:59:19]** [TEST] Running test: [04] Activate User

### [04] Activate User

#### GraphQL Request

**Query:**
```graphql
mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "activationKey": "7950f11c5b56d0931196b3411e365ee10b6ce53699d05aff5ce5c5da2b979771"
  }
}
```

**Response:**
```json
{
  "auth_activateUser": true
}
```

- **Test ID:** 04
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:19

**[2026-01-29 06:59:25]** [TEST] Running test: [05] Login

### [05] Login

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
          Status
          Role
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "TestPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY2OTk2NiwiZXhwIjoxNzY5NjczNTY2fQ.MIIQHzcO841zagAtuQstMpC2ekMdk54kR9s0oesXjIk",
    "refreshToken": "323c79e8-b8ef-4520-a65c-d30011f57a52",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com",
      "Status": "ACTIVE",
      "Role": "USER"
    }
  }
}
```

- **Test ID:** 05
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:26

**[2026-01-29 06:59:32]** [TEST] Running test: [06] Get Current User

### [06] Get Current User

#### GraphQL Request

**Query:**
```graphql
query CurrentUser {
      auth_currentUser {
        user {
          id
          email
        }
        token
        refreshToken
      }
    }
```

**Response:**
```json
{
  "auth_currentUser": {
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY2OTk3MiwiZXhwIjoxNzY5NjczNTcyfQ.rRExHDLH5O4m_VQSKnG6wuG43jHmVizvVV4XnB0-7-U",
    "refreshToken": "43d7768f-2664-488e-b7fd-23f3614f1180"
  }
}
```

- **Test ID:** 06
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:32

**[2026-01-29 06:59:38]** [TEST] Running test: [07] Update Password (logged in user & user token)

### [07] Update Password (logged in user & user token)

#### GraphQL Request

**Query:**
```graphql
mutation UpdatePassword($input: UpdatePasswordResolverInput!) {
      auth_updatePassword(input: $input) {
        success
      }
    }
```

**Variables:**
```json
{
  "input": {
    "oldPassword": "TestPa$$word123!",
    "newPassword": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_updatePassword": {
    "success": true
  }
}
```

- **Test ID:** 07
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:38

**[2026-01-29 06:59:44]** [TEST] Running test: [08] Logout

### [08] Logout

#### GraphQL Request

**Query:**
```graphql
mutation Logout {
      auth_logout {
        success
      }
    }
```

**Response:**
```json
{
  "auth_logout": {
    "success": true
  }
}
```

- **Test ID:** 08
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:44

**[2026-01-29 06:59:50]** [TEST] Running test: [09] Login Again

### [09] Login Again

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY2OTk5MCwiZXhwIjoxNzY5NjczNTkwfQ.wAnKa7DxyFDGoGqDrotm0a5YMrW-AVih1vB7DLs4DsU",
    "refreshToken": "dfd41d5e-068b-42a0-ac2c-cf31256346b2",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

- **Test ID:** 09
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:50

**[2026-01-29 06:59:56]** [TEST] Running test: [10] Refresh Token

### [10] Refresh Token

#### GraphQL Request

**Query:**
```graphql
mutation RefreshToken($input: String!) {
      auth_refreshToken(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": "dfd41d5e-068b-42a0-ac2c-cf31256346b2"
}
```

**Response:**
```json
{
  "auth_refreshToken": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY2OTk5NiwiZXhwIjoxNzY5NjczNTk2fQ.7WHA8pNs3ZJ2J0K_Qx3cvkRGU3m-k-IiQCNL2JqI5Go",
    "refreshToken": "9b06304d-f603-4120-a78a-567d75ec7ce9",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

- **Test ID:** 10
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 06:59:56

**[2026-01-29 07:00:02]** [TEST] Running test: [11] Request Password Reset

### [11] Request Password Reset

#### GraphQL Request

**Query:**
```graphql
mutation RequestPasswordReset($input: AuthRequestPasswordResetServiceInput!) {
      auth_requestPasswordReset(input: $input) {
        token
        expiresAt
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com"
  }
}
```

**Response:**
```json
{
  "auth_requestPasswordReset": {
    "token": "e977b739c07d7ef3540714a06747fa4fdd04c435b65dbf08d235f7f99dd90bd1",
    "expiresAt": "2026-01-29T08:00:02.824Z"
  }
}
```

- **Test ID:** 11
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:00:02

**[2026-01-29 07:00:08]** [TEST] Running test: [12] Renew Activation Token

### [12] Renew Activation Token

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
        token
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.activation.1769670008872@example.com",
    "password": "TestPassword123!",
    "firstName": "Test",
    "lastName": "Activation"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3ty58000i3gel5unqtvqb",
      "accountId": "cmkz3ty50000h3gel038x0hai"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3R5NTgwMDBpM2dlbDV1bnF0dnFiIiwiZW1haWwiOiJ0ZXN0LmFjdGl2YXRpb24uMTc2OTY3MDAwODg3MkBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAwOSwiZXhwIjoxNzY5NjczNjA5fQ.Ss8Q3EJzOCfRLM5IFYDZfc6jGhnlt4rhfZHH_zprKIc"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3ty50000h3gel038x0hai",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3ty50000h3gel038x0hai",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation RenewActivationToken($input: AuthRenewActivationTokenServiceInput!) {
      auth_renewActivationToken(input: $input) {
        activationKey
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.activation.1769670008872@example.com"
  }
}
```

**Response:**
```json
{
  "auth_renewActivationToken": {
    "activationKey": "a13f10018487a63f08e032b210beb4b4f2e1fd6310f2991b3f49eeb35c0fa81c"
  }
}
```

- **Test ID:** 12
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:00:09

**[2026-01-29 07:00:15]** [TEST] Running test: [13] Sign Up with Weak Password

### [13] Sign Up with Weak Password

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          email
        }
        token
        activationKey
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.invalid.1769670015447@example.com",
    "password": "weak",
    "firstName": "Test",
    "lastName": "Invalid"
  }
}
```

**Response:**
```json
[
  {
    "message": "Password length is below minimum required length of 8 characters.",
    "locations": [
      {
        "line": 3,
        "column": 7
      }
    ],
    "path": [
      "auth_signUp"
    ],
    "extensions": {
      "code": "INTERNAL_SERVER_ERROR",
      "stacktrace": [
        "Error: Password length is below minimum required length of 8 characters.",
        "    at ServiceResult.extractOrThrow (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\classes\\service.result.js:28:19)",
        "    at AuthStarterResolver.auth_signUp (rs-tech-hub-demo-backend\\rs-tech-hub\\auth-starter\\src\\lib\\auth-starter.resolver.js:1:7453)",
        "    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)"
      ]
    }
  }
]
```

- **Test ID:** 13
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:00:15

**[2026-01-29 07:00:21]** [TEST] Running test: [14] Rate Limiter Test

### [14] Rate Limiter Test

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMSwiZXhwIjoxNzY5NjczNjMxfQ.KznbcIGd2yAE1WOAYLqOGo0PvbwI4q6saRMfhU1MQzQ",
    "refreshToken": "07205f51-f4e8-4aad-aaa1-25b17023236d",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMSwiZXhwIjoxNzY5NjczNjMxfQ.KznbcIGd2yAE1WOAYLqOGo0PvbwI4q6saRMfhU1MQzQ",
    "refreshToken": "68ff0bbd-9798-47f9-8b67-39f77999f198",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMiwiZXhwIjoxNzY5NjczNjMyfQ.ruH77jQsZTwIJpMio1_MAWdtY4usK1kaA4YdnEfIL3k",
    "refreshToken": "b7d8d293-7099-4b16-b839-e4bf71f4d395",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMiwiZXhwIjoxNzY5NjczNjMyfQ.ruH77jQsZTwIJpMio1_MAWdtY4usK1kaA4YdnEfIL3k",
    "refreshToken": "3af8c815-11af-4279-94e7-90a6f5d67b79",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMiwiZXhwIjoxNzY5NjczNjMyfQ.ruH77jQsZTwIJpMio1_MAWdtY4usK1kaA4YdnEfIL3k",
    "refreshToken": "0e3baac8-2f79-43cb-8996-5a1b52db4050",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMiwiZXhwIjoxNzY5NjczNjMyfQ.ruH77jQsZTwIJpMio1_MAWdtY4usK1kaA4YdnEfIL3k",
    "refreshToken": "833d4fb9-928e-4b2e-97d9-c7c9d42a1816",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMiwiZXhwIjoxNzY5NjczNjMyfQ.ruH77jQsZTwIJpMio1_MAWdtY4usK1kaA4YdnEfIL3k",
    "refreshToken": "cc060a41-9abf-491a-a5e3-943fedfafae8",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMiwiZXhwIjoxNzY5NjczNjMyfQ.ruH77jQsZTwIJpMio1_MAWdtY4usK1kaA4YdnEfIL3k",
    "refreshToken": "4d92637c-1f5b-48be-832c-0068254a2f75",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMiwiZXhwIjoxNzY5NjczNjMyfQ.ruH77jQsZTwIJpMio1_MAWdtY4usK1kaA4YdnEfIL3k",
    "refreshToken": "9e9ebef3-d922-46d7-b2c6-9ac05bcb7e06",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMiwiZXhwIjoxNzY5NjczNjMyfQ.ruH77jQsZTwIJpMio1_MAWdtY4usK1kaA4YdnEfIL3k",
    "refreshToken": "831c532c-71fa-42c1-a3fd-3822d9199102",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMywiZXhwIjoxNzY5NjczNjMzfQ.ZbVtwYBcBHY-jGryxW83FUHPul8K1-A3G04xAAmSoo0",
    "refreshToken": "28550b79-8420-4ccb-a232-1969ad5a9aca",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMywiZXhwIjoxNzY5NjczNjMzfQ.ZbVtwYBcBHY-jGryxW83FUHPul8K1-A3G04xAAmSoo0",
    "refreshToken": "4c6a9aab-791c-43b7-85a6-1174f48afeb1",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMywiZXhwIjoxNzY5NjczNjMzfQ.ZbVtwYBcBHY-jGryxW83FUHPul8K1-A3G04xAAmSoo0",
    "refreshToken": "dca433f9-ccbc-4929-a2a1-1addacca9d18",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMywiZXhwIjoxNzY5NjczNjMzfQ.ZbVtwYBcBHY-jGryxW83FUHPul8K1-A3G04xAAmSoo0",
    "refreshToken": "e11b8613-62cc-4042-858c-8b22c1091a85",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        refreshToken
        user {
          id
          email
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "password": "NewPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3M3cWIwMDAxM2dlbHV3bTVnYmY3IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4MUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDAzMywiZXhwIjoxNzY5NjczNjMzfQ.ZbVtwYBcBHY-jGryxW83FUHPul8K1-A3G04xAAmSoo0",
    "refreshToken": "2432d4b8-25ee-40f8-9b04-0c0b80d6f86b",
    "user": {
      "id": "cmkz3s7qb00013geluwm5gbf7",
      "email": "test.user.1769669921681@example.com"
    }
  }
}
```

- **Test ID:** 14
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:00:33

**[2026-01-29 07:00:39]** [TEST] Running test: [15] Reset Password with Weak Password

### [15] Reset Password with Weak Password

#### GraphQL Request

**Query:**
```graphql
mutation RequestPasswordReset($input: AuthRequestPasswordResetServiceInput!) {
      auth_requestPasswordReset(input: $input) {
        token
        expiresAt
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com"
  }
}
```

**Response:**
```json
{
  "auth_requestPasswordReset": {
    "token": "c164964db5db7e7116237783cf087c6e9ef013622a3231a289716af5db97381f",
    "expiresAt": "2026-01-29T08:00:42.746Z"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation ResetPassword($input: AuthResetPasswordServiceInput!) {
        auth_resetPassword(input: $input)
      }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "resetToken": "c164964db5db7e7116237783cf087c6e9ef013622a3231a289716af5db97381f",
    "newPassword": "weak"
  }
}
```

**Response:**
```json
[
  {
    "message": "Password length is below minimum required length of 8 characters.",
    "locations": [
      {
        "line": 3,
        "column": 9
      }
    ],
    "path": [
      "auth_resetPassword"
    ],
    "extensions": {
      "code": "INTERNAL_SERVER_ERROR",
      "stacktrace": [
        "Error: Password length is below minimum required length of 8 characters.",
        "    at ServiceResult.extractOrThrow (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\classes\\service.result.js:28:19)",
        "    at ServiceFacilitatorService.executeAndExtract (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\service-facilitator.service.js:78:23)",
        "    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)",
        "    at async AuthStarterService.resetPassword (rs-tech-hub-demo-backend\\rs-tech-hub\\auth-starter\\src\\lib\\auth-starter.service.js:1:18211)",
        "    at async AuthStarterResolver.auth_resetPassword (rs-tech-hub-demo-backend\\rs-tech-hub\\auth-starter\\src\\lib\\auth-starter.resolver.js:1:8791)"
      ]
    }
  }
]
```

- **Test ID:** 15
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:00:43

**[2026-01-29 07:00:49]** [TEST] Running test: [16] Reset Password with Used Token

### [16] Reset Password with Used Token

#### GraphQL Request

**Query:**
```graphql
mutation ResetPassword($input: AuthResetPasswordServiceInput!) {
      auth_resetPassword(input: $input)
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "resetToken": "e977b739c07d7ef3540714a06747fa4fdd04c435b65dbf08d235f7f99dd90bd1",
    "newPassword": "AnotherP@ssw0rd2024!"
  }
}
```

**Response:**
```json
[
  {
    "message": "password-reset-token-error:invalid",
    "locations": [
      {
        "line": 3,
        "column": 7
      }
    ],
    "path": [
      "auth_resetPassword"
    ],
    "extensions": {
      "code": "INTERNAL_SERVER_ERROR",
      "stacktrace": [
        "Error: password-reset-token-error:invalid",
        "    at ServiceResult.extractOrThrow (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\classes\\service.result.js:28:19)",
        "    at ServiceFacilitatorService.executeAndExtract (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\service-facilitator.service.js:78:23)",
        "    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)",
        "    at async AuthStarterService.resetPassword (rs-tech-hub-demo-backend\\rs-tech-hub\\auth-starter\\src\\lib\\auth-starter.service.js:1:18211)",
        "    at async AuthStarterResolver.auth_resetPassword (rs-tech-hub-demo-backend\\rs-tech-hub\\auth-starter\\src\\lib\\auth-starter.resolver.js:1:8791)"
      ]
    }
  }
]
```

- **Test ID:** 16
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:00:52

**[2026-01-29 07:00:58]** [TEST] Running test: [17] Reset Password

### [17] Reset Password

#### GraphQL Request

**Query:**
```graphql
mutation RequestPasswordReset($input: AuthRequestPasswordResetServiceInput!) {
      auth_requestPasswordReset(input: $input) {
        token
        expiresAt
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com"
  }
}
```

**Response:**
```json
{
  "auth_requestPasswordReset": {
    "token": "037090981d07d80336920fbb97863fee4a318dd342f603e391370634380f677e",
    "expiresAt": "2026-01-29T08:01:02.031Z"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation ResetPassword($input: AuthResetPasswordServiceInput!) {
        auth_resetPassword(input: $input)
      }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921681@example.com",
    "resetToken": "037090981d07d80336920fbb97863fee4a318dd342f603e391370634380f677e",
    "newPassword": "ResetP@ssw0rd2024!Strong"
  }
}
```

**Response:**
```json
{
  "auth_resetPassword": true
}
```

- **Test ID:** 17
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:01:03

**[2026-01-29 07:01:09]** [CLEANUP] Running cleanup: Cleanup

#### GraphQL Request

**Query:**
```graphql
mutation TestRemoveTestUsers {
        test_removeTestUsers {
          message
          count
          data
        }
      }
```

**Response:**
```json
{
  "test_removeTestUsers": {
    "message": "Test user removed successfully",
    "count": 2,
    "data": "{\"deletedAccounts\":{\"success\":true,\"count\":2}}"
  }
}
```

### ✅ CLEANUP: Cleanup

- **Status:** SUCCESS
- **Timestamp:** 2026-01-29 07:01:29

## User API Test Suite

**[2026-01-29 07:01:35]** [SUITE] Starting test suite: User API Test Suite

**[2026-01-29 07:01:35]** [SETUP] Running setup: Setup test

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          email
          accountId
        }
        activationKey
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921685@example.com",
    "password": "TestPa$$word123!",
    "firstName": "Test",
    "lastName": "User"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3vsz5001n3gelghy9nr0u",
      "email": "test.user.1769669921685@example.com",
      "accountId": "cmkz3vsyu001m3gelxfluykf4"
    },
    "activationKey": "cfcada4c864544c32b30d65d2f66bdbe33243381833c9612ad16b8802cf963c5"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3vsyu001m3gelxfluykf4",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3vsyu001m3gelxfluykf4",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921685@example.com",
    "activationKey": "cfcada4c864544c32b30d65d2f66bdbe33243381833c9612ad16b8802cf963c5"
  }
}
```

**Response:**
```json
{
  "auth_activateUser": true
}
```

#### GraphQL Request

**Query:**
```graphql
mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        user {
          id
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.user.1769669921685@example.com",
    "password": "TestPa$$word123!"
  }
}
```

**Response:**
```json
{
  "auth_login": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWt6M3ZzejUwMDFuM2dlbGdoeTlucjB1IiwiZW1haWwiOiJ0ZXN0LnVzZXIuMTc2OTY2OTkyMTY4NUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTY3MDA5NSwiZXhwIjoxNzY5NjczNjk1fQ.ExPip-E86z8tFP6nN8TKNWuIl_s8rcm6kMmZoC46qxU",
    "user": {
      "id": "cmkz3vsz5001n3gelghy9nr0u"
    }
  }
}
```

### ✅ SETUP: Setup test

- **Status:** SUCCESS
- **Timestamp:** 2026-01-29 07:01:36

**[2026-01-29 07:01:42]** [TEST] Running test: [01] Get Current User

### [01] Get Current User

#### GraphQL Request

**Query:**
```graphql
query GetCurrentUser {
      user_getCurrent {
        id
        email
        Status
        Role
        isVerified
        createdAt
      }
    }
```

**Response:**
```json
{
  "user_getCurrent": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "email": "test.user.1769669921685@example.com",
    "Status": "ACTIVE",
    "Role": "USER",
    "isVerified": true,
    "createdAt": "2026-01-29T07:01:35.727Z"
  }
}
```

- **Test ID:** 01
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:01:42

**[2026-01-29 07:01:48]** [TEST] Running test: [01a] Get Profile

### [01a] Get Profile

#### GraphQL Request

**Query:**
```graphql
query Profile_get {
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

**Response:**
```json
{
  "profile_get": {
    "id": "cmkz3vszo001q3gelkir047xm",
    "avatarUrl": null,
    "Salutation": "NONE",
    "firstName": "Test",
    "lastName": "User",
    "dateOfBirth": null,
    "country": null,
    "userId": "cmkz3vsz5001n3gelghy9nr0u"
  }
}
```

- **Test ID:** 01a
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:01:48

**[2026-01-29 07:01:54]** [TEST] Running test: [01b] Update Profile

### [01b] Update Profile

#### GraphQL Request

**Query:**
```graphql
mutation Profile_update($profileUpdateInput: ProfileUpdateServiceInput!) {
      profile_update(profileUpdateInput: $profileUpdateInput) {
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

**Variables:**
```json
{
  "profileUpdateInput": {
    "avatarUrl": "https://example.com/avatar.jpg",
    "country": "US"
  }
}
```

**Response:**
```json
{
  "profile_update": {
    "id": "cmkz3vszo001q3gelkir047xm",
    "avatarUrl": "https://example.com/avatar.jpg",
    "Salutation": "NONE",
    "firstName": "Test",
    "lastName": "User",
    "dateOfBirth": null,
    "country": "US",
    "userId": "cmkz3vsz5001n3gelghy9nr0u"
  }
}
```

- **Test ID:** 01b
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:01:54

**[2026-01-29 07:02:00]** [TEST] Running test: [02] Get User by ID

### [02] Get User by ID

#### GraphQL Request

**Query:**
```graphql
query GetUserById($userId: String!) {
      user_getById(userId: $userId) {
        id
        email
        Status
        Role
        isVerified
        createdAt
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3vsz5001n3gelghy9nr0u"
}
```

**Response:**
```json
{
  "user_getById": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "email": "test.user.1769669921685@example.com",
    "Status": "ACTIVE",
    "Role": "USER",
    "isVerified": true,
    "createdAt": "2026-01-29T07:01:35.727Z"
  }
}
```

- **Test ID:** 02
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:00

**[2026-01-29 07:02:06]** [TEST] Running test: [03] Get User by Email

### [03] Get User by Email

#### GraphQL Request

**Query:**
```graphql
query GetUserByEmail($email: String!) {
      user_getByEmail(email: $email) {
        id
        email
        Status
        Role
        isVerified
        createdAt
      }
    }
```

**Variables:**
```json
{
  "email": "test.user.1769669921685@example.com"
}
```

**Response:**
```json
{
  "user_getByEmail": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "email": "test.user.1769669921685@example.com",
    "Status": "ACTIVE",
    "Role": "USER",
    "isVerified": true,
    "createdAt": "2026-01-29T07:01:35.727Z"
  }
}
```

- **Test ID:** 03
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:06

**[2026-01-29 07:02:12]** [TEST] Running test: [04] Check if Email Exists

### [04] Check if Email Exists

#### GraphQL Request

**Query:**
```graphql
query EmailExists($email: String!) {
      user_emailExists(email: $email)
    }
```

**Variables:**
```json
{
  "email": "test.user.1769669921685@example.com"
}
```

**Response:**
```json
{
  "user_emailExists": true
}
```

#### GraphQL Request

**Query:**
```graphql
query EmailExists($email: String!) {
      user_emailExists(email: $email)
    }
```

**Variables:**
```json
{
  "email": "nonexistent@example.com"
}
```

**Response:**
```json
{
  "user_emailExists": false
}
```

- **Test ID:** 04
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:12

**[2026-01-29 07:02:18]** [TEST] Running test: [05] Get All Users (Paginated)

### [05] Get All Users (Paginated)

#### GraphQL Request

**Query:**
```graphql
query GetAllUsers($page: Int, $limit: Int) {
      user_getAll(page: $page, limit: $limit) {
        users {
          id
          email
          Status
          Role
        }
        total
        page
        limit
        totalPages
      }
    }
```

**Variables:**
```json
{
  "page": 1,
  "limit": 10
}
```

**Response:**
```json
{
  "user_getAll": {
    "users": [
      {
        "id": "cmkz3vsz5001n3gelghy9nr0u",
        "email": "test.user.1769669921685@example.com",
        "Status": "ACTIVE",
        "Role": "USER"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

- **Test ID:** 05
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:18

**[2026-01-29 07:02:24]** [TEST] Running test: [06] Get Users Count

### [06] Get Users Count

#### GraphQL Request

**Query:**
```graphql
query GetUsersCount {
      user_getUsersCount
    }
```

**Response:**
```json
{
  "user_getUsersCount": 1
}
```

- **Test ID:** 06
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:24

**[2026-01-29 07:02:30]** [TEST] Running test: [07] Get Active Users Count

### [07] Get Active Users Count

#### GraphQL Request

**Query:**
```graphql
query GetActiveUsersCount {
      user_getActiveUsersCount
    }
```

**Response:**
```json
{
  "user_getActiveUsersCount": 1
}
```

- **Test ID:** 07
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:30

**[2026-01-29 07:02:36]** [TEST] Running test: [08] Get All Users by Status

### [08] Get All Users by Status

#### GraphQL Request

**Query:**
```graphql
query GetAllUsersByStatus($status: UserStatus!) {
      user_getAllByStatus(status: $status) {
        id
        email
        Status
        Role
      }
    }
```

**Variables:**
```json
{
  "status": "ACTIVE"
}
```

**Response:**
```json
{
  "user_getAllByStatus": [
    {
      "id": "cmkz3vsz5001n3gelghy9nr0u",
      "email": "test.user.1769669921685@example.com",
      "Status": "ACTIVE",
      "Role": "USER"
    }
  ]
}
```

- **Test ID:** 08
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:36

**[2026-01-29 07:02:42]** [TEST] Running test: [09] Update User Role

### [09] Update User Role

#### GraphQL Request

**Query:**
```graphql
mutation UpdateUserRole($input: UserUpdateRoleServiceInput!) {
      user_updateRole(input: $input) {
        id
        email
        Role
      }
    }
```

**Variables:**
```json
{
  "input": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "role": "ADMIN"
  }
}
```

**Response:**
```json
{
  "user_updateRole": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "email": "test.user.1769669921685@example.com",
    "Role": "ADMIN"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation UpdateUserRole($input: UserUpdateRoleServiceInput!) {
      user_updateRole(input: $input) {
        id
        email
        Role
      }
    }
```

**Variables:**
```json
{
  "input": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "role": "USER"
  }
}
```

**Response:**
```json
{
  "user_updateRole": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "email": "test.user.1769669921685@example.com",
    "Role": "USER"
  }
}
```

- **Test ID:** 09
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:44

**[2026-01-29 07:02:50]** [TEST] Running test: [10] Deactivate User

### [10] Deactivate User

#### GraphQL Request

**Query:**
```graphql
mutation DeactivateUser($userId: String!) {
      user_deactivateById(userId: $userId) {
        id
        email
        Status
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3vsz5001n3gelghy9nr0u"
}
```

**Response:**
```json
{
  "user_deactivateById": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "email": "test.user.1769669921685@example.com",
    "Status": "INACTIVE"
  }
}
```

- **Test ID:** 10
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:50

**[2026-01-29 07:02:56]** [TEST] Running test: [11] Reactivate User

### [11] Reactivate User

#### GraphQL Request

**Query:**
```graphql
mutation ReactivateUser($userId: String!) {
      user_reactivateById(userId: $userId) {
        id
        email
        Status
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3vsz5001n3gelghy9nr0u"
}
```

**Response:**
```json
{
  "user_reactivateById": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "email": "test.user.1769669921685@example.com",
    "Status": "ACTIVE"
  }
}
```

- **Test ID:** 11
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:02:56

**[2026-01-29 07:03:02]** [TEST] Running test: [12] Deactivate Pending User (Should fail in Grace Period of 30 days)

### [12] Deactivate Pending User (Should fail in Grace Period of 30 days)

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.pending.1769670182325@example.com",
    "password": "TestPassword123!",
    "firstName": "Pending",
    "lastName": "User"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3xnvl00203gelq2mh61km",
      "accountId": "cmkz3xnvb001z3gell9w06st3"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3xnvb001z3gell9w06st3",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3xnvb001z3gell9w06st3",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DeactivatePendingUser($input: UserDeactivatePendingUserServiceInput!) {
      user_deactivatePendingUser(input: $input) {
        id
        Status
      }
    }
```

**Variables:**
```json
{
  "input": {
    "id": "cmkz3xnvl00203gelq2mh61km",
    "gracePeriodInDays": 7
  }
}
```

**Response:**
```json
[
  {
    "message": "user-error:deactivation-failed",
    "locations": [
      {
        "line": 3,
        "column": 7
      }
    ],
    "path": [
      "user_deactivatePendingUser"
    ],
    "extensions": {
      "code": "INTERNAL_SERVER_ERROR",
      "stacktrace": [
        "Error: user-error:deactivation-failed",
        "    at ServiceResult.extractOrThrow (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\classes\\service.result.js:28:19)",
        "    at ServiceFacilitatorService.executeAndExtract (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\service-facilitator.service.js:78:23)",
        "    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)",
        "    at async UserService.deactivatePendingUser (rs-tech-hub-demo-backend\\rs-tech-hub\\user\\src\\lib\\user.service.js:1:23399)",
        "    at async UserResolver.user_deactivatePendingUser (rs-tech-hub-demo-backend\\rs-tech-hub\\user\\src\\lib\\user.resolver.js:1:9463)"
      ]
    }
  }
]
```

- **Test ID:** 12
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:02

**[2026-01-29 07:03:08]** [TEST] Running test: [13] Deactivate Active User (Should succeed -> no login yet)

### [13] Deactivate Active User (Should succeed -> no login yet)

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
        activationKey
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.active.1769670188613@example.com",
    "password": "TestPassword123!",
    "firstName": "Active",
    "lastName": "User"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3xsq800263gel9m21e5y5",
      "accountId": "cmkz3xspy00253gelaw8a3asy"
    },
    "activationKey": "483a40ea1495e3256b04c0fd70d9db19db1f81560de4169d72c1ab2c827e8766"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3xspy00253gelaw8a3asy",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3xspy00253gelaw8a3asy",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.active.1769670188613@example.com",
    "activationKey": "483a40ea1495e3256b04c0fd70d9db19db1f81560de4169d72c1ab2c827e8766"
  }
}
```

**Response:**
```json
{
  "auth_activateUser": true
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DeactivateActiveUser($input: UserDeactivateActiveUserServiceInput!) {
      user_deactivateActiveUser(input: $input) {
        id
        Status
      }
    }
```

**Variables:**
```json
{
  "input": {
    "id": "cmkz3xsq800263gel9m21e5y5",
    "gracePeriodInMonths": 3
  }
}
```

**Response:**
```json
{
  "user_deactivateActiveUser": {
    "id": "cmkz3xsq800263gel9m21e5y5",
    "Status": "INACTIVE"
  }
}
```

- **Test ID:** 13
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:08

**[2026-01-29 07:03:15]** [TEST] Running test: [14] Disable User

### [14] Disable User

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.deactivation.1769670195022@example.com",
    "password": "TestPassword123!",
    "firstName": "Deactivation",
    "lastName": "User"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3xxov002e3gel7kwuq9mx",
      "accountId": "cmkz3xxoh002d3geljndhaayn"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3xxoh002d3geljndhaayn",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3xxoh002d3geljndhaayn",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DisableUser($userId: String!) {
      user_disableById(userId: $userId) {
        id
        email
        Status
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3xxov002e3gel7kwuq9mx"
}
```

**Response:**
```json
{
  "user_disableById": {
    "id": "cmkz3xxov002e3gel7kwuq9mx",
    "email": "test.deactivation.1769670195022@example.com",
    "Status": "DISABLED"
  }
}
```

- **Test ID:** 14
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:15

**[2026-01-29 07:03:21]** [TEST] Running test: [15] Deactivate Inactive Users (Bulk) -> 0 within grace period: 6 months for active, 30 days for pending

### [15] Deactivate Inactive Users (Bulk) -> 0 within grace period: 6 months for active, 30 days for pending

#### GraphQL Request

**Query:**
```graphql
mutation DeactivateInactiveUsers {
      user_deactivateInactiveUsers {
        id
        email
        Status
      }
    }
```

**Response:**
```json
{
  "user_deactivateInactiveUsers": []
}
```

- **Test ID:** 15
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:21

**[2026-01-29 07:03:27]** [TEST] Running test: [16] Disable Deactivated Users (Bulk) -> 0 within grace period of 6 months

### [16] Disable Deactivated Users (Bulk) -> 0 within grace period of 6 months

#### GraphQL Request

**Query:**
```graphql
mutation DisableDeactivatedUsers($gracePeriodInMonths: Int) {
      user_disableDeactivatedUsers(gracePeriodInMonths: $gracePeriodInMonths) {
        id
        email
        Status
      }
    }
```

**Variables:**
```json
{
  "gracePeriodInMonths": 6
}
```

**Response:**
```json
{
  "user_disableDeactivatedUsers": []
}
```

- **Test ID:** 16
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:27

**[2026-01-29 07:03:33]** [TEST] Running test: [17] Schedule Soft Delete (Bulk) -> 0 within grace period of 30 days

### [17] Schedule Soft Delete (Bulk) -> 0 within grace period of 30 days

#### GraphQL Request

**Query:**
```graphql
mutation ScheduleSoftDelete {
      user_scheduleSoftDeletedUsersForDeletion {
        id
        Status
        Role
        email
        issuerId
        isVerified
        activatedAt
        deactivatedAt
        disabledAt
        softDeletedAt
        isScheduledForDeletion
        scheduledDeletionAt
        accountId
        createdAt
        updatedAt
      }
    }
```

**Response:**
```json
{
  "user_scheduleSoftDeletedUsersForDeletion": []
}
```

- **Test ID:** 17
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:33

**[2026-01-29 07:03:39]** [TEST] Running test: [18] Soft Delete Disabled User (Success)

### [18] Soft Delete Disabled User (Success)

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.removal.1769670219561@example.com",
    "password": "TestPassword123!",
    "firstName": "Removal",
    "lastName": "User"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3ygn1002l3gelwogseduz",
      "accountId": "cmkz3ygmq002k3geltf8dnk4k"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3ygmq002k3geltf8dnk4k",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3ygmq002k3geltf8dnk4k",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DisableUser($userId: String!) {
      user_disableById(userId: $userId) {
        id
        Status
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3ygn1002l3gelwogseduz"
}
```

**Response:**
```json
{
  "user_disableById": {
    "id": "cmkz3ygn1002l3gelwogseduz",
    "Status": "DISABLED"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation SoftDeleteUser($userId: String!) {
      user_softDeleteById(userId: $userId) {
        id
        Status
        isScheduledForDeletion
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3ygn1002l3gelwogseduz"
}
```

**Response:**
```json
{
  "user_softDeleteById": {
    "id": "cmkz3ygn1002l3gelwogseduz",
    "Status": "SOFT_DELETED",
    "isScheduledForDeletion": false
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation ScheduleSoftDeletedUsers {
      user_scheduleSoftDeletedUsersForDeletion {
        id
        email
        Status
      }
    }
```

**Response:**
```json
{
  "user_scheduleSoftDeletedUsersForDeletion": [
    {
      "id": "cmkz3ygn1002l3gelwogseduz",
      "email": "test.removal.1769670219561@example.com",
      "Status": "SOFT_DELETED"
    }
  ]
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DeleteUser($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        email
        Status
        scheduledDeletionAt
        isScheduledForDeletion
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3ygn1002l3gelwogseduz"
}
```

**Response:**
```json
{
  "user_deleteById": {
    "id": "cmkz3ygn1002l3gelwogseduz",
    "email": "test.removal.1769670219561@example.com",
    "Status": "SOFT_DELETED",
    "scheduledDeletionAt": null,
    "isScheduledForDeletion": false
  }
}
```

- **Test ID:** 18
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:40

**[2026-01-29 07:03:46]** [TEST] Running test: [19] Delete Active User (Should Fail- needs to be disabled first)

### [19] Delete Active User (Should Fail- needs to be disabled first)

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
        activationKey
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.active.1769670226088@example.com",
    "password": "TestPassword123!",
    "firstName": "Active",
    "lastName": "ToDelete"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3ylni002v3gel73rnqi1l",
      "accountId": "cmkz3yln5002u3gelpi5qyyxg"
    },
    "activationKey": "6a098c96c4fa20304c0be34f966e3e0fd527a5a599d6f5acf1bc1d0ab14ed4e8"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3yln5002u3gelpi5qyyxg",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3yln5002u3gelpi5qyyxg",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.active.1769670226088@example.com",
    "activationKey": "6a098c96c4fa20304c0be34f966e3e0fd527a5a599d6f5acf1bc1d0ab14ed4e8"
  }
}
```

**Response:**
```json
{
  "auth_activateUser": true
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DeleteUser($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        email
        Status
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3ylni002v3gel73rnqi1l"
}
```

**Response:**
```json
[
  {
    "message": "user-error:not-scheduled-for-deletion",
    "locations": [
      {
        "line": 3,
        "column": 7
      }
    ],
    "path": [
      "user_deleteById"
    ],
    "extensions": {
      "code": "INTERNAL_SERVER_ERROR",
      "stacktrace": [
        "Error: user-error:not-scheduled-for-deletion",
        "    at ServiceResult.extractOrThrow (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\classes\\service.result.js:28:19)",
        "    at ServiceFacilitatorService.executeAndExtract (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\service-facilitator.service.js:78:23)",
        "    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)",
        "    at async UserService.deleteById (rs-tech-hub-demo-backend\\rs-tech-hub\\user\\src\\lib\\user.service.js:1:32663)",
        "    at async UserResolver.user_deleteById (rs-tech-hub-demo-backend\\rs-tech-hub\\user\\src\\lib\\user.resolver.js:1:7295)"
      ]
    }
  }
]
```

- **Test ID:** 19
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:46

**[2026-01-29 07:03:52]** [TEST] Running test: [20] Delete User by ID - Active User (Should Fail- needs to be disabled and scheduled for deletion)

### [20] Delete User by ID - Active User (Should Fail- needs to be disabled and scheduled for deletion)

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
        activationKey
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.deleteby.active.1769670232443@example.com",
    "password": "TestPassword123!",
    "firstName": "DeleteBy",
    "lastName": "Active"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3yqjz00323gelu22vh5uw",
      "accountId": "cmkz3yqjm00313geliq5nsm98"
    },
    "activationKey": "e66b6cb989be8ad69687a38bab1f7538ce24c0f1c6a4002ce65ead926d2d5cbb"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3yqjm00313geliq5nsm98",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3yqjm00313geliq5nsm98",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.deleteby.active.1769670232443@example.com",
    "activationKey": "e66b6cb989be8ad69687a38bab1f7538ce24c0f1c6a4002ce65ead926d2d5cbb"
  }
}
```

**Response:**
```json
{
  "auth_activateUser": true
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DeleteUserById($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        email
        Status
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3yqjz00323gelu22vh5uw"
}
```

**Response:**
```json
[
  {
    "message": "user-error:not-scheduled-for-deletion",
    "locations": [
      {
        "line": 3,
        "column": 7
      }
    ],
    "path": [
      "user_deleteById"
    ],
    "extensions": {
      "code": "INTERNAL_SERVER_ERROR",
      "stacktrace": [
        "Error: user-error:not-scheduled-for-deletion",
        "    at ServiceResult.extractOrThrow (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\classes\\service.result.js:28:19)",
        "    at ServiceFacilitatorService.executeAndExtract (rs-tech-hub-demo-backend\\rs-tech-hub\\service-operation\\src\\lib\\facilitator\\service-facilitator.service.js:78:23)",
        "    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)",
        "    at async UserService.deleteById (rs-tech-hub-demo-backend\\rs-tech-hub\\user\\src\\lib\\user.service.js:1:32663)",
        "    at async UserResolver.user_deleteById (rs-tech-hub-demo-backend\\rs-tech-hub\\user\\src\\lib\\user.resolver.js:1:7295)"
      ]
    }
  }
]
```

- **Test ID:** 20
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:52

**[2026-01-29 07:03:58]** [TEST] Running test: [21] Delete User by ID - Non-Active User (Should Soft Delete - was disabled)

### [21] Delete User by ID - Non-Active User (Should Soft Delete - was disabled)

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.deleteby.inactive.1769670238845@example.com",
    "password": "TestPassword123!",
    "firstName": "DeleteBy",
    "lastName": "Inactive"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3yvlx00393gel7zrbimft",
      "accountId": "cmkz3yvld00383geltu8pw8z8"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3yvld00383geltu8pw8z8",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3yvld00383geltu8pw8z8",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DeleteUserById($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        email
        Status
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3yvlx00393gel7zrbimft"
}
```

**Response:**
```json
{
  "user_deleteById": {
    "id": "cmkz3yvlx00393gel7zrbimft",
    "email": "test.deleteby.inactive.1769670238845@example.com",
    "Status": "SOFT_DELETED"
  }
}
```

- **Test ID:** 21
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:03:59

**[2026-01-29 07:04:05]** [TEST] Running test: [22] Delete User by ID - Scheduled User (Should Fail, stays soft deleted until scheduled after grace period)

### [22] Delete User by ID - Scheduled User (Should Fail, stays soft deleted until scheduled after grace period)

#### GraphQL Request

**Query:**
```graphql
mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
```

**Variables:**
```json
{
  "input": {
    "email": "test.deleteby.scheduled.1769670245558@example.com",
    "password": "TestPassword123!",
    "firstName": "DeleteBy",
    "lastName": "Scheduled"
  }
}
```

**Response:**
```json
{
  "auth_signUp": {
    "user": {
      "id": "cmkz3z0o4003g3geljjnt9bxj",
      "accountId": "cmkz3z0nw003f3gel01ffqa7x"
    }
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
```

**Variables:**
```json
{
  "id": "cmkz3z0nw003f3gel01ffqa7x",
  "data": {
    "Type": "TEST"
  }
}
```

**Response:**
```json
{
  "account_update": {
    "id": "cmkz3z0nw003f3gel01ffqa7x",
    "Type": "TEST"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DisableUser($userId: String!) {
      user_disableById(userId: $userId) {
        id
        Status
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3z0o4003g3geljjnt9bxj"
}
```

**Response:**
```json
{
  "user_disableById": {
    "id": "cmkz3z0o4003g3geljjnt9bxj",
    "Status": "DISABLED"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation SoftDeleteUser($userId: String!) {
      user_softDeleteById(userId: $userId) {
        id
        Status
        Role
        email
        disabledAt
        softDeletedAt
        isScheduledForDeletion
        scheduledDeletionAt
        createdAt
        updatedAt
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3z0o4003g3geljjnt9bxj"
}
```

**Response:**
```json
{
  "user_softDeleteById": {
    "id": "cmkz3z0o4003g3geljjnt9bxj",
    "Status": "SOFT_DELETED",
    "Role": "USER",
    "email": "test.deleteby.scheduled.1769670245558@example.com",
    "disabledAt": "2026-01-29T07:04:05.857Z",
    "softDeletedAt": "2026-01-29T07:04:05.908Z",
    "isScheduledForDeletion": false,
    "scheduledDeletionAt": null,
    "createdAt": "2026-01-29T07:04:05.666Z",
    "updatedAt": "2026-01-29T07:04:05.909Z"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
mutation ScheduleSoftDeletedUsers {
      user_scheduleSoftDeletedUsersForDeletion {
        id
        Status
        Role
        email
        disabledAt
        softDeletedAt
        isScheduledForDeletion
        scheduledDeletionAt
        createdAt
        updatedAt
      }
    }
```

**Response:**
```json
{
  "user_scheduleSoftDeletedUsersForDeletion": [
    {
      "id": "cmkz3z0o4003g3geljjnt9bxj",
      "Status": "SOFT_DELETED",
      "Role": "USER",
      "email": "test.deleteby.scheduled.1769670245558@example.com",
      "disabledAt": "2026-01-29T07:04:05.857Z",
      "softDeletedAt": "2026-01-29T07:04:05.908Z",
      "isScheduledForDeletion": false,
      "scheduledDeletionAt": null,
      "createdAt": "2026-01-29T07:04:05.666Z",
      "updatedAt": "2026-01-29T07:04:05.909Z"
    },
    {
      "id": "cmkz3ygn1002l3gelwogseduz",
      "Status": "SOFT_DELETED",
      "Role": "USER",
      "email": "test.removal.1769670219561@example.com",
      "disabledAt": "2026-01-29T07:03:39.854Z",
      "softDeletedAt": "2026-01-29T07:03:40.027Z",
      "isScheduledForDeletion": false,
      "scheduledDeletionAt": null,
      "createdAt": "2026-01-29T07:03:39.707Z",
      "updatedAt": "2026-01-29T07:03:40.029Z"
    },
    {
      "id": "cmkz3yvlx00393gel7zrbimft",
      "Status": "SOFT_DELETED",
      "Role": "USER",
      "email": "test.deleteby.inactive.1769670238845@example.com",
      "disabledAt": null,
      "softDeletedAt": "2026-01-29T07:03:59.452Z",
      "isScheduledForDeletion": false,
      "scheduledDeletionAt": null,
      "createdAt": "2026-01-29T07:03:59.105Z",
      "updatedAt": "2026-01-29T07:03:59.454Z"
    }
  ]
}
```

#### GraphQL Request

**Query:**
```graphql
mutation DeleteUserById($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        Status
        Role
        email
        disabledAt
        softDeletedAt
        isScheduledForDeletion
        scheduledDeletionAt
        createdAt
        updatedAt
      }
    }
```

**Variables:**
```json
{
  "userId": "cmkz3z0o4003g3geljjnt9bxj"
}
```

**Response:**
```json
{
  "user_deleteById": {
    "id": "cmkz3z0o4003g3geljjnt9bxj",
    "Status": "SOFT_DELETED",
    "Role": "USER",
    "email": "test.deleteby.scheduled.1769670245558@example.com",
    "disabledAt": "2026-01-29T07:04:05.857Z",
    "softDeletedAt": "2026-01-29T07:04:06.068Z",
    "isScheduledForDeletion": false,
    "scheduledDeletionAt": null,
    "createdAt": "2026-01-29T07:04:05.666Z",
    "updatedAt": "2026-01-29T07:04:06.069Z"
  }
}
```

- **Test ID:** 22
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:04:06

**[2026-01-29 07:04:12]** [TEST] Running test: [23] Get All Users by Account ID

### [23] Get All Users by Account ID

#### GraphQL Request

**Query:**
```graphql
query GetCurrentUser {
      user_getCurrent {
        id
        accountId
      }
    }
```

**Response:**
```json
{
  "user_getCurrent": {
    "id": "cmkz3vsz5001n3gelghy9nr0u",
    "accountId": "cmkz3vsyu001m3gelxfluykf4"
  }
}
```

#### GraphQL Request

**Query:**
```graphql
query GetAllUsersByAccountId($accountId: String!) {
      user_getAllByAccountId(accountId: $accountId) {
        id
        email
        accountId
      }
    }
```

**Variables:**
```json
{
  "accountId": "cmkz3vsyu001m3gelxfluykf4"
}
```

**Response:**
```json
{
  "user_getAllByAccountId": [
    {
      "id": "cmkz3vsz5001n3gelghy9nr0u",
      "email": "test.user.1769669921685@example.com",
      "accountId": "cmkz3vsyu001m3gelxfluykf4"
    }
  ]
}
```

- **Test ID:** 23
- **Status:** PASS ✅
- **Timestamp:** 2026-01-29 07:04:12

**[2026-01-29 07:04:18]** [CLEANUP] Running cleanup: Cleanup

#### GraphQL Request

**Query:**
```graphql
mutation TestRemoveTestUsers {
        test_removeTestUsers {
          message
          count
          data
        }
      }
```

**Response:**
```json
{
  "test_removeTestUsers": {
    "message": "Test user removed successfully",
    "count": 9,
    "data": "{\"deletedAccounts\":{\"success\":true,\"count\":9}}"
  }
}
```

### ✅ CLEANUP: Cleanup

- **Status:** SUCCESS
- **Timestamp:** 2026-01-29 07:04:38


---

## Final Summary

**End Time:** 2026-01-29 07:04:44
**Duration:** 362.89s
**Total Tests:** 45
**Passed:** 45 ✅
**Failed:** 0 ❌
**Success Rate:** 100.00%

### Test Suite Results

#### Auth Starter

- Total: 20
- Passed: 20
- Failed: 0

#### User API

- Total: 25
- Passed: 25
- Failed: 0

**[2026-01-29 07:04:44]** [INFO] Test suite execution completed

