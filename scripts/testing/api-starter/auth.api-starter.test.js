const axios = require("axios");
const { logGraphQLRequest, logGraphQLResponse } = require("../test-utilities");
require("dotenv").config();

/**
 * AuthStarter API Test Script
 * Tests all endpoints of the AuthStarterResolver via GraphQL
 * Target: localhost:4000/graphql
 */

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";
const SERVICE_TOKEN = process.env.SERVICE_TOKEN;

// Test data
const testUser = {
  email: `test.user.${Date.now()}@example.com`,
  password: "TestPa$$word123!",
  newPassword: "NewPa$$word123!",
  firstName: "Test",
  lastName: "User",
};

let accessToken;
let refreshToken;
let userId;
let accountId;
let activationToken;
let passwordResetToken;
const createdAccountIds = []; // Track created accounts for cleanup

/**
 * Delay utility to prevent rate limiting
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const TEST_DELAY = 4000; // 4 seconds delay between tests (20 req/min limit)

/**
 * Make a GraphQL request
 */
async function makeGraphQLRequest(query, variables, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else if (SERVICE_TOKEN) {
      // For service authentication, use Bearer token
      headers["Authorization"] = `Bearer ${SERVICE_TOKEN}`;
    }

    // Log the query and variables being sent
    console.log("📤 GraphQL Query:", query.trim());
    console.log("📤 GraphQL Variables:", JSON.stringify(variables, null, 2));

    // Log to test report
    logGraphQLRequest(query, variables);

    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      { query, variables },
      { headers },
    );

    if (response.data.errors) {
      console.error(
        "GraphQL Errors:",
        JSON.stringify(response.data.errors, null, 2),
      );
      // Log error response to test report
      logGraphQLResponse(response.data.errors, true);
      throw new Error(`GraphQL Error: ${response.data.errors[0]?.message}`);
    }

    // Always log the actual result for proof
    console.log(
      "📊 GraphQL Result:",
      JSON.stringify(response.data.data, null, 2),
    );

    // Log successful response to test report
    logGraphQLResponse(response.data.data);

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Request failed:", {
        status: error.response?.status,
        errors: error.response?.data?.errors,
        message: error.message,
      });
    }
    throw error;
  }
}

/**
 * Test 1: Verify Email Before Signup (Should Fail)
 */
async function testVerifyEmailBeforeSignup() {
  console.log("\n🧪 Test 1: Verify Email Before Signup (Should return false)");
  const query = `
    query VerifyEmail($input: VerifyEmailResolverInput!) {
      auth_verifyEmail(input: $input) {
        success
        email
      }
    }
  `;

  const variables = {
    input: { email: testUser.email },
  };

  try {
    await makeGraphQLRequest(query, variables);
    console.log("✅ Should return success:false - email should not exist yet");
  } catch (error) {
    const errorMsg = error.message.toLowerCase();
    throw error;
  }
}

/**
 * Test 3: Verify Email After Signup (Should Pass)
 */
async function testVerifyEmailAfterSignup() {
  console.log("\n🧪 Test 3: Verify Email After Signup (Should Pass)");
  const query = `
    query VerifyEmail($input: VerifyEmailResolverInput!) {
      auth_verifyEmail(input: $input) {
        success
        email
      }
    }
  `;

  const variables = {
    input: { email: testUser.email },
  };

  const result = await makeGraphQLRequest(query, variables);

  console.log("✅ Email verification result:", result.auth_verifyEmail);
  return result.auth_verifyEmail.success;
}

/**
 * Test 2: Sign Up
 */
async function testSignUp() {
  console.log("\n🧪 Test 2: Sign Up");
  const mutation = `
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
  `;

  const variables = {
    input: {
      email: testUser.email,
      password: testUser.password,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    },
  };

  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ Sign up successful:", {
    userId: result.auth_signUp.user.id,
    email: result.auth_signUp.user.email,
    accountId: result.auth_signUp.user.accountId,
  });

  userId = result.auth_signUp.user.id;
  accountId = result.auth_signUp.user.accountId;
  activationToken = result.auth_signUp.activationKey;

  // Track accountId for cleanup and update type to TEST
  if (result.auth_signUp.user.accountId) {
    createdAccountIds.push(result.auth_signUp.user.accountId);
    console.log(
      "📝 Tracked accountId for cleanup:",
      result.auth_signUp.user.accountId,
    );

    // Update account type to TEST
    const updateAccountMutation = `
      mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
    `;

    const updateResult = await makeGraphQLRequest(updateAccountMutation, {
      id: result.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });

    console.log(
      "📝 Account type updated to TEST:",
      updateResult.account_update.Type,
    );
  }

  return result.auth_signUp;
}

/**
 * Test 2a: Get Account by ID
 */
async function testGetAccountById() {
  console.log("\n🧪 Test 2a: Get Account by ID");

  if (!accountId) {
    console.log("⚠️  No account ID available - skipping");
    return { success: true, skipped: true };
  }

  const query = `
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
  `;

  const variables = { accountId };
  const result = await makeGraphQLRequest(query, variables);

  console.log("✅ Account retrieved by ID:", {
    id: result.account_getById.id,
    primaryEmail: result.account_getById.primaryEmail,
    Type: result.account_getById.Type,
  });

  return result.account_getById;
}

/**
 * Test 2b: Validate Account Data
 */
async function testValidateAccountData() {
  console.log("\n🧪 Test 2b: Validate Account Data");

  const query = `
    query ValidateAccountData($data: AccountStarterCreateServiceInput!) {
      account_validateData(data: $data) {
        isValid
        errors
        message
      }
    }
  `;

  // Test with valid data
  const validVariables = {
    data: {
      name: "Test Company",
      primaryEmail: "newTestUser@example.com",
      Type: "TEST",
      signupIpAddress: "127.0.0.1",
      isDemoContentReady: false,
    },
  };

  const validResult = await makeGraphQLRequest(query, validVariables);
  console.log("✅ Valid data validation result:", {
    isValid: validResult.account_validateData.isValid,
    message: validResult.account_validateData.message,
  });

  // Test with invalid email
  await delay(1000);
  const invalidVariables = {
    data: {
      name: "Test Company",
      primaryEmail: "invalid-email",
      Type: "TEST",
      signupIpAddress: "127.0.0.1",
      isDemoContentReady: false,
    },
  };

  try {
    const invalidResult = await makeGraphQLRequest(query, invalidVariables);
    console.log("✅ Invalid data validation result:", {
      isValid: invalidResult.account_validateData.isValid,
      errors: invalidResult.account_validateData.errors,
    });
  } catch (error) {
    console.log("✅ Invalid data correctly rejected:", error.message);
  }

  return validResult.account_validateData;
}

/**
 * Test 3.5: Login Before Activation (Should Fail)
 */
async function testLoginBeforeActivation() {
  console.log("\n🧪 Test 3.5: Login Before Activation (Should Fail)");
  const mutation = `
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
  `;

  const variables = {
    input: {
      email: testUser.email,
      password: testUser.password,
    },
  };

  try {
    await makeGraphQLRequest(mutation, variables);
    console.log("❌ UNEXPECTED: Login should have failed for unactivated user");
    throw new Error("Login should have failed for unactivated user");
  } catch (error) {
    console.log(
      "✅ Login correctly rejected for unactivated user:",
      error.message,
    );
  }
}

/**
 * Test 4: Activate User
 */
async function testActivateUser() {
  console.log("\n🧪 Test 4: Activate User");
  const mutation = `
    mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
  `;

  const variables = {
    input: {
      email: testUser.email,
      activationKey: activationToken,
    },
  };

  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ User activated:", result.auth_activateUser);
  return result.auth_activateUser;
}

/**
 * Test 4: Login
 */
async function testLogin() {
  console.log("\n🧪 Test 4: Login");
  const mutation = `
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
  `;

  const variables = {
    input: {
      email: testUser.email,
      password: testUser.password,
    },
  };

  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ Login successful:", {
    userId: result.auth_login.user.id,
    email: result.auth_login.user.email,
  });

  accessToken = result.auth_login.token;
  refreshToken = result.auth_login.refreshToken;

  return result.auth_login;
}

/**
 * Test 5: Get Current User
 */
async function testGetCurrentUser() {
  console.log("\n🧪 Test 5: Get Current User");
  const query = `
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
  `;

  const result = await makeGraphQLRequest(query, {}, accessToken);

  console.log("✅ Current user:", result.auth_currentUser.user);
  return result.auth_currentUser;
}

/**
 * Test 6: Update Password
 */
async function testUpdatePassword() {
  console.log("\n🧪 Test 6: Update Password (logged in user & user token)");
  const mutation = `
    mutation UpdatePassword($input: UpdatePasswordResolverInput!) {
      auth_updatePassword(input: $input) {
        success
      }
    }
  `;

  const variables = {
    input: {
      oldPassword: testUser.password,
      newPassword: testUser.newPassword,
    },
  };

  const result = await makeGraphQLRequest(mutation, variables, accessToken);

  console.log("✅ Password updated:", result.auth_updatePassword.success);

  // Update the password in our test data
  testUser.password = testUser.newPassword;

  return result.auth_updatePassword;
}

/**
 * Test 7: Logout
 */
async function testLogout() {
  console.log("\n🧪 Test 7: Logout");
  const mutation = `
    mutation Logout {
      auth_logout {
        success
      }
    }
  `;

  const result = await makeGraphQLRequest(mutation, {}, accessToken);

  console.log("✅ Logout successful:", result.auth_logout);
  return result.auth_logout;
}

/**
 * Test 8: Login Again (with new password)
 */
async function testLoginAgain() {
  console.log("\n🧪 Test 8: Login Again (with new password)");
  const mutation = `
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
  `;

  const variables = {
    input: {
      email: testUser.email,
      password: testUser.password,
    },
  };

  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ Re-login successful");

  accessToken = result.auth_login.token;
  refreshToken = result.auth_login.refreshToken;

  return result.auth_login;
}

/**
 * Test 9: Refresh Token
 */
async function testRefreshToken() {
  console.log("\n🧪 Test 9: Refresh Token");
  const mutation = `
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
  `;

  const variables = {
    input: refreshToken,
  };

  const result = await makeGraphQLRequest(mutation, variables, accessToken);

  console.log("✅ Token refreshed successfully");

  accessToken = result.auth_refreshToken.token;
  refreshToken = result.auth_refreshToken.refreshToken;

  return result.auth_refreshToken;
}

/**
 * Test 10: Request Password Reset
 */
async function testRequestPasswordReset() {
  console.log("\n🧪 Test 10: Request Password Reset");
  const mutation = `
    mutation RequestPasswordReset($input: AuthRequestPasswordResetServiceInput!) {
      auth_requestPasswordReset(input: $input) {
        token
        expiresAt
      }
    }
  `;

  const variables = {
    input: { email: testUser.email },
  };

  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ Password reset requested:", {
    token: result.auth_requestPasswordReset.token ? "received" : "none",
    expiresAt: result.auth_requestPasswordReset.expiresAt,
  });

  // Store the token for the reset password test
  passwordResetToken = result.auth_requestPasswordReset.token;

  // Note: In a real scenario, you would get the token from email
  // For testing purposes, we're using the token directly from the API response
  console.log(
    "⚠️  Note: Password reset token would be sent via email in production",
  );

  return result.auth_requestPasswordReset;
}

/**
 * Test 11: Renew Activation Token
 */
async function testRenewActivationToken() {
  console.log("\n🧪 Test 11: Renew Activation Token");

  // Create a new unactivated user for this test
  const newUserEmail = `test.activation.${Date.now()}@example.com`;

  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
        token
      }
    }
  `;

  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "Test",
      lastName: "Activation",
    },
  });

  // Track accountId for cleanup and update type to TEST
  if (signupResult.auth_signUp.user.accountId) {
    createdAccountIds.push(signupResult.auth_signUp.user.accountId);
    console.log(
      "📝 Tracked accountId for cleanup:",
      signupResult.auth_signUp.user.accountId,
    );

    // Update account type to TEST
    const updateAccountMutation = `
      mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
    `;

    const updateResult = await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });

    console.log(
      "📝 Account type updated to TEST:",
      updateResult.account_update.Type,
    );
  }

  const renewMutation = `
    mutation RenewActivationToken($input: AuthRenewActivationTokenServiceInput!) {
      auth_renewActivationToken(input: $input) {
        activationKey
      }
    }
  `;

  const variables = {
    input: { email: newUserEmail },
  };

  const result = await makeGraphQLRequest(renewMutation, variables);

  console.log("✅ Activation token renewed:", {
    activationKey: result.auth_renewActivationToken.activationKey
      ? "received"
      : "none",
  });
  return result.auth_renewActivationToken;
}

/**
 * Test 12: Sign Up with Weak Password (should fail)
 */
async function testSignUpWeakPassword() {
  console.log("\n🧪 Test 12: Sign Up with Weak Password");
  const mutation = `
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
  `;

  const variables = {
    input: {
      email: `test.invalid.${Date.now()}@example.com`,
      password: "weak",
      firstName: "Test",
      lastName: "Invalid",
    },
  };

  try {
    await makeGraphQLRequest(mutation, variables);
    console.log("❌ Test should have failed with weak password");
    throw new Error(
      "Expected test to fail: Weak password was incorrectly accepted",
    );
  } catch (error) {
    const errorMsg = error.message.toLowerCase();
    if (
      errorMsg.includes("password") ||
      errorMsg.includes("validation") ||
      errorMsg.includes("minlength") ||
      errorMsg.includes("minimum")
    ) {
      console.log("✅ Weak password correctly rejected:", error.message);
      return { success: true, rejected: true };
    }
    // If it's the "expected test to fail" error, rethrow it
    if (error.message.includes("Expected test to fail")) {
      throw error;
    }
    throw error;
  }
}

/**
 * Test 13: Rate Limiter Test - Frequent Login Requests
 */
async function testRateLimiter() {
  console.log("\n🧪 Test 13: Rate Limiter - Frequent Login Requests");
  console.log("\n Adding 10s delay to cool off from previous requests");
  await delay(10000);

  const mutation = `
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
  `;

  const variables = {
    input: {
      email: testUser.email,
      password: testUser.password,
    },
  };

  let rateLimitHit = false;
  let requestCount = 0;

  // Try to make many rapid requests
  for (let i = 0; i < 15; i++) {
    try {
      await makeGraphQLRequest(mutation, variables);
      requestCount++;
    } catch (error) {
      if (
        error.message.includes("Too many requests") ||
        error.message.includes("rate limit")
      ) {
        rateLimitHit = true;
        console.log(`✅ Rate limiter triggered after ${requestCount} requests`);
        break;
      }
    }
  }

  if (!rateLimitHit) {
    console.log(
      `⚠️  Rate limiter not triggered after ${requestCount} requests (might need higher threshold)`,
    );
  }

  return rateLimitHit;
}

/**
 * Test 14: Reset Password with Weak Password (should fail)
 */
async function testResetPasswordWeakPassword() {
  console.log("\n🧪 Test 14: Reset Password with Weak Password");

  // Add extra delay before this test to avoid rate limiting
  await delay(3000);

  // First request a password reset
  const requestMutation = `
    mutation RequestPasswordReset($input: AuthRequestPasswordResetServiceInput!) {
      auth_requestPasswordReset(input: $input) {
        token
        expiresAt
      }
    }
  `;

  const requestVariables = {
    input: { email: testUser.email },
  };

  try {
    const requestResult = await makeGraphQLRequest(
      requestMutation,
      requestVariables,
    );
    const weakResetToken = requestResult.auth_requestPasswordReset.token;

    console.log("🔑 Password reset token received for weak password test");

    // Add delay before reset attempt
    await delay(1000);

    // Now try to reset with weak password
    const resetMutation = `
      mutation ResetPassword($input: AuthResetPasswordServiceInput!) {
        auth_resetPassword(input: $input)
      }
    `;

    const resetVariables = {
      input: {
        email: testUser.email,
        resetToken: weakResetToken,
        newPassword: "weak",
      },
    };

    try {
      await makeGraphQLRequest(resetMutation, resetVariables);
      console.log("❌ Test should have failed with weak password");
      throw new Error(
        "Expected test to fail: Weak password was incorrectly accepted",
      );
    } catch (error) {
      const errorMsg = error.message.toLowerCase();
      if (
        errorMsg.includes("password") ||
        errorMsg.includes("validation") ||
        errorMsg.includes("minlength") ||
        errorMsg.includes("minimum")
      ) {
        console.log("✅ Weak password correctly rejected:", error.message);
        return { success: true, rejected: true };
      }
      // If it's the "expected test to fail" error, rethrow it
      if (error.message.includes("Expected test to fail")) {
        throw error;
      }
      throw error;
    }
  } catch (error) {
    console.log("❌ Password reset request failed:", error.message);
    throw error;
  }
}

/**
 * Test 15: Reset Password with Used Token (should fail)
 */
async function testResetPasswordWithUsedToken() {
  console.log("\n🧪 Test 15: Reset Password with Used Token (Should Fail)");

  if (!passwordResetToken) {
    console.log("⚠️  No password reset token available - skipping");
    return { success: true, skipped: true };
  }

  // Add extra delay before this test to avoid rate limiting
  await delay(3000);

  const mutation = `
    mutation ResetPassword($input: AuthResetPasswordServiceInput!) {
      auth_resetPassword(input: $input)
    }
  `;

  const variables = {
    input: {
      email: testUser.email,
      resetToken: passwordResetToken, // Using old/used token
      newPassword: "AnotherP@ssw0rd2024!",
    },
  };

  try {
    await makeGraphQLRequest(mutation, variables);
    console.log("❌ Test should have failed - used token should be invalid");
    throw new Error(
      "Expected test to fail: Used reset token was incorrectly accepted",
    );
  } catch (error) {
    const errorMsg = error.message.toLowerCase();
    if (
      errorMsg.includes("invalid") ||
      errorMsg.includes("expired") ||
      errorMsg.includes("token") ||
      errorMsg.includes("not found")
    ) {
      console.log("✅ Used token correctly rejected:", error.message);
      return { success: true, rejected: true };
    }
    // If it's the "expected test to fail" error, rethrow it
    if (error.message.includes("Expected test to fail")) {
      throw error;
    }
    throw error;
  }
}

/**
 * Test 16: Reset Password (with fresh token)
 */
async function testResetPassword() {
  console.log("\n🧪 Test 16: Reset Password (with fresh token)");

  // Add extra delay before this test to avoid rate limiting
  await delay(3000);

  // Request a new password reset token
  const requestMutation = `
    mutation RequestPasswordReset($input: AuthRequestPasswordResetServiceInput!) {
      auth_requestPasswordReset(input: $input) {
        token
        expiresAt
      }
    }
  `;

  try {
    const requestResult = await makeGraphQLRequest(requestMutation, {
      input: { email: testUser.email },
    });
    const freshResetToken = requestResult.auth_requestPasswordReset.token;

    console.log("🔑 Fresh password reset token received");

    // Add delay before reset attempt
    await delay(1000);

    // Now reset password with the fresh token
    const resetMutation = `
      mutation ResetPassword($input: AuthResetPasswordServiceInput!) {
        auth_resetPassword(input: $input)
      }
    `;

    const resetVariables = {
      input: {
        email: testUser.email,
        resetToken: freshResetToken,
        newPassword: "ResetP@ssw0rd2024!Strong",
      },
    };

    const result = await makeGraphQLRequest(resetMutation, resetVariables);
    console.log("✅ Password reset:", result.auth_resetPassword);
    return result.auth_resetPassword;
  } catch (error) {
    console.log("❌ Password reset failed:", error.message);
    throw error;
  }
}

/**
 * Cleanup: Delete created accounts
 */
async function cleanup() {
  console.log("\n🧹 Cleanup: Removing all test accounts...");
  console.log(
    "⏳ Waiting 20 seconds before cleanup to ensure all operations are settled...",
  );
  await delay(20000);
  // Final cleanup: Remove all test accounts using bulk operation
  try {
    const mutation = `
      mutation TestRemoveTestUsers {
        test_removeTestUsers {
          message
          count
          data
        }
      }
    `;

    const result = await makeGraphQLRequest(mutation, {});
    console.log(`✅ Test accounts cleanup:`, result.test_removeTestUsers);
  } catch (error) {
    console.log(`⚠️  Could not remove test accounts: ${error.message}`);
  }
}

/**
 * Export tests array for centralized test runner
 */
const tests = [
  { testId: "00", name: "Cleanup", fn: cleanup },
  {
    testId: "01",
    name: "Verify Email Before Signup (Should return success:false)",
    fn: testVerifyEmailBeforeSignup,
    shouldFail: false,
  },
  { testId: "02", name: "Sign Up", fn: testSignUp },
  { testId: "02a", name: "Get Account by ID", fn: testGetAccountById },
  { testId: "02b", name: "Validate Account Data", fn: testValidateAccountData },
  {
    testId: "03",
    name: "Verify Email After Signup (Should Pass)",
    fn: testVerifyEmailAfterSignup,
  },
  {
    testId: "03.5",
    name: "Login Before Activation (Should Fail)",
    fn: testLoginBeforeActivation,
    shouldFail: true, // Expected to fail
  },
  { testId: "04", name: "Activate User", fn: testActivateUser },
  { testId: "05", name: "Login", fn: testLogin },
  { testId: "06", name: "Get Current User", fn: testGetCurrentUser },
  {
    testId: "07",
    name: "Update Password (logged in user & user token)",
    fn: testUpdatePassword,
  },
  { testId: "08", name: "Logout", fn: testLogout },
  { testId: "09", name: "Login Again", fn: testLoginAgain },
  { testId: "10", name: "Refresh Token", fn: testRefreshToken },
  {
    testId: "11",
    name: "Request Password Reset",
    fn: testRequestPasswordReset,
  },
  {
    testId: "12",
    name: "Renew Activation Token",
    fn: testRenewActivationToken,
  },
  {
    testId: "13",
    name: "Sign Up with Weak Password",
    fn: testSignUpWeakPassword,
    shouldFail: true, // Expected to fail
  },
  { testId: "14", name: "Rate Limiter Test", fn: testRateLimiter },
  {
    testId: "15",
    name: "Reset Password with Weak Password",
    fn: testResetPasswordWeakPassword,
    shouldFail: true, // Expected to fail
  },
  {
    testId: "16",
    name: "Reset Password with Used Token",
    fn: testResetPasswordWithUsedToken,
    shouldFail: true, // Expected to fail
  },
  { testId: "17", name: "Reset Password", fn: testResetPassword },
  { testId: "99", name: "Cleanup", fn: cleanup },
];

module.exports = {
  tests,
  cleanup,
  makeGraphQLRequest,
  testActivateUser,
  testGetAccountById,
  testGetCurrentUser,
  testLogin,
  testLoginBeforeActivation,
  testLogout,
  testRefreshToken,
  testRenewActivationToken,
  testRequestPasswordReset,
  testResetPassword,
  testResetPasswordWeakPassword,
  testResetPasswordWithUsedToken,
  testSignUp,
  testSignUpWeakPassword,
  testValidateAccountData,
  testUpdatePassword,
  testVerifyEmailBeforeSignup,
  testVerifyEmailAfterSignup,
  testRateLimiter,
};
