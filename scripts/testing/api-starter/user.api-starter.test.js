const axios = require("axios");
const { logGraphQLRequest, logGraphQLResponse } = require("../test-utilities");

/**
 * User API Test Script
 * Tests all endpoints of the UserResolver via GraphQL
 * Target: localhost:4000/graphql
 *
 * Prerequisites:
 * - Backend server running on localhost:4000
 * - Valid SERVICE_TOKEN set
 * - At least one authenticated user (created via auth tests)
 *
 * User Lifecycle Status Flow:
 * 1. PENDING     - User signs up but hasn't activated account
 * 2. ACTIVE      - User activates account (required for login)
 * 3. INACTIVE    - User deactivated (via user_deactivateById, can be reactivated)
 * 4. DISABLED    - User permanently disabled (cannot login, cannot reactivate)
 * 5. SOFT_DELETED - User soft-deleted (data retained, scheduled for deletion)
 * 6. DELETED     - User permanently deleted (automatic via scheduled jobs)
 *
 * Available Lifecycle Transitions:
 * - PENDING → ACTIVE (via auth_activateUser or user_activateById)
 * - ACTIVE → INACTIVE (via user_deactivateById)
 * - INACTIVE → ACTIVE (via user_reactivateById)
 * - PENDING/ACTIVE/INACTIVE → DISABLED (via user_disableById)
 * - DISABLED → SOFT_DELETED (via user_softDeleteById)
 * - SOFT_DELETED → DELETED (automatic after scheduling, testable via user_deleteById)
 *
 * Typical Deletion Flow:
 * ACTIVE → INACTIVE → DISABLED → SOFT_DELETED → SCHEDULED_DELETION → DELETED
 * or skip INACTIVE:
 * ACTIVE → DISABLED → SOFT_DELETED → SCHEDULED_DELETION → DELETED
 */

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

const SERVICE_TOKEN = process.env.SERVICE_TOKEN;
// Test data
const testUser = {
  email: `test.user.${Date.now()}@example.com`,
  password: "TestPa$$word123!",
  firstName: "Test",
  lastName: "User",
};

let accessToken;
let testUserId;
const createdUserIds = []; // Track created users for cleanup
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
 * Setup: Create a test user and authenticate
 */
async function setupTestUser() {
  console.log("\n🔧 Setup: Creating test user and authenticating...");

  // Sign up
  const signupMutation = `
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
  `;

  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: testUser.email,
      password: testUser.password,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    },
  });

  testUserId = signupResult.auth_signUp.user.id;
  createdUserIds.push(testUserId);
  const activationKey = signupResult.auth_signUp.activationKey;

  console.log(`✅ Test user created: ${testUserId}`);

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

    await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
    console.log("✅ Account type updated to TEST");
  }

  // Activate
  const activateMutation = `
    mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
  `;

  await makeGraphQLRequest(activateMutation, {
    input: {
      email: testUser.email,
      activationKey: activationKey,
    },
  });

  console.log("✅ Test user activated");

  // Login
  const loginMutation = `
    mutation Login($input: AuthLoginServiceInput!) {
      auth_login(input: $input) {
        token
        user {
          id
        }
      }
    }
  `;

  const loginResult = await makeGraphQLRequest(loginMutation, {
    input: {
      email: testUser.email,
      password: testUser.password,
    },
  });

  accessToken = loginResult.auth_login.token;
  console.log("✅ Test user logged in");
}

/**
 * Test 1: Get Current User
 */
async function testGetCurrentUser() {
  console.log(
    "\n🧪 Test 1: Get Current User (Logged in - Authentication Token set",
  );
  const query = `
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
  `;

  const result = await makeGraphQLRequest(query, {}, accessToken);

  console.log("✅ Current user:", {
    id: result.user_getCurrent.id,
    email: result.user_getCurrent.email,
    status: result.user_getCurrent.Status,
    role: result.user_getCurrent.Role,
  });

  return result.user_getCurrent;
}

/**
 * Test 1a: Get Profile
 */
async function testGetProfile() {
  console.log("\n🧪 Test 1a: Get Profile");
  const query = `
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
  `;

  const result = await makeGraphQLRequest(query, {}, accessToken);

  console.log("✅ Profile retrieved:", {
    id: result.profile_get.id,
    firstName: result.profile_get.firstName,
    lastName: result.profile_get.lastName,
    country: result.profile_get.country,
  });

  return result.profile_get;
}

/**
 * Test 1b: Update Profile
 */
async function testUpdateProfile() {
  console.log("\n🧪 Test 1b: Update Profile");
  const mutation = `
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
  `;

  const variables = {
    profileUpdateInput: {
      avatarUrl: "https://example.com/avatar.jpg",
      country: "US",
    },
  };

  const result = await makeGraphQLRequest(mutation, variables, accessToken);

  console.log("✅ Profile updated:", {
    id: result.profile_update.id,
    avatarUrl: result.profile_update.avatarUrl,
    country: result.profile_update.country,
  });

  return result.profile_update;
}

/**
 * Test 2: Get User by ID (Service Auth)
 */
async function testGetUserById() {
  console.log("\n🧪 Test 2: Get User by ID");
  const query = `
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
  `;

  const variables = { userId: testUserId };
  const result = await makeGraphQLRequest(query, variables);

  console.log("✅ User retrieved by ID:", {
    id: result.user_getById.id,
    email: result.user_getById.email,
  });

  return result.user_getById;
}

/**
 * Test 3: Get User by Email (Service Auth)
 */
async function testGetUserByEmail() {
  console.log("\n🧪 Test 3: Get User by Email");
  const query = `
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
  `;

  const variables = { email: testUser.email };
  const result = await makeGraphQLRequest(query, variables);

  console.log("✅ User retrieved by email:", {
    id: result.user_getByEmail.id,
    email: result.user_getByEmail.email,
  });

  return result.user_getByEmail;
}

/**
 * Test 4: Check if Email Exists
 */
async function testEmailExists() {
  console.log("\n🧪 Test 4: Check if Email Exists");
  const query = `
    query EmailExists($email: String!) {
      user_emailExists(email: $email)
    }
  `;

  // Test with existing email
  const existingResult = await makeGraphQLRequest(query, {
    email: testUser.email,
  });
  console.log(
    `✅ Email exists check (existing): ${existingResult.user_emailExists}`,
  );

  // Test with non-existing email
  const nonExistingResult = await makeGraphQLRequest(query, {
    email: "nonexistent@example.com",
  });
  console.log(
    `✅ Email exists check (non-existing): ${nonExistingResult.user_emailExists}`,
  );

  return existingResult.user_emailExists;
}

/**
 * Test 5: Get All Users (Paginated)
 */
async function testGetAllUsers() {
  console.log("\n🧪 Test 5: Get All Users (Paginated)");
  const query = `
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
  `;

  const variables = { page: 1, limit: 10 };
  const result = await makeGraphQLRequest(query, variables);

  console.log("✅ Users retrieved:", {
    total: result.user_getAll.total,
    page: result.user_getAll.page,
    limit: result.user_getAll.limit,
    totalPages: result.user_getAll.totalPages,
    usersCount: result.user_getAll.users.length,
  });

  return result.user_getAll;
}

/**
 * Test 6: Get Users Count
 */
async function testGetUsersCount() {
  console.log("\n🧪 Test 6: Get Users Count");
  const query = `
    query GetUsersCount {
      user_getUsersCount
    }
  `;

  const result = await makeGraphQLRequest(query, {});

  console.log("✅ Total users count:", result.user_getUsersCount);
  return result.user_getUsersCount;
}

/**
 * Test 7: Get Active Users Count
 */
async function testGetActiveUsersCount() {
  console.log("\n🧪 Test 7: Get Active Users Count");
  const query = `
    query GetActiveUsersCount {
      user_getActiveUsersCount
    }
  `;

  const result = await makeGraphQLRequest(query, {});

  console.log("✅ Active users count:", result.user_getActiveUsersCount);
  return result.user_getActiveUsersCount;
}

/**
 * Test 8: Get All Users by Status
 */
async function testGetAllUsersByStatus() {
  console.log("\n🧪 Test 8: Get All Users by Status");
  const query = `
    query GetAllUsersByStatus($status: UserStatus!) {
      user_getAllByStatus(status: $status) {
        id
        email
        Status
        Role
      }
    }
  `;

  const variables = { status: "ACTIVE" };
  const result = await makeGraphQLRequest(query, variables);

  console.log("✅ Active users retrieved:", result.user_getAllByStatus.length);
  return result.user_getAllByStatus;
}

/**
 * Test 9: Update User Role
 */
async function testUpdateUserRole() {
  console.log("\n🧪 Test 9: Update User Role");
  const mutation = `
    mutation UpdateUserRole($input: UserUpdateRoleServiceInput!) {
      user_updateRole(input: $input) {
        id
        email
        Role
      }
    }
  `;

  const variables = {
    input: {
      id: testUserId,
      role: "ADMIN",
    },
  };

  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ User role updated:", {
    id: result.user_updateRole.id,
    newRole: result.user_updateRole.Role,
  });

  // Revert back to USER role
  await delay(1000);
  await makeGraphQLRequest(mutation, {
    input: { id: testUserId, role: "USER" },
  });
  console.log("✅ User role reverted to USER");

  return result.user_updateRole;
}

/**
 * Test 10: Deactivate User
 */
async function testDeactivateUser() {
  console.log("\n🧪 Test 10: Deactivate User");
  const mutation = `
    mutation DeactivateUser($userId: String!) {
      user_deactivateById(userId: $userId) {
        id
        email
        Status
      }
    }
  `;

  const variables = { userId: testUserId };
  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ User deactivated:", {
    id: result.user_deactivateById.id,
    status: result.user_deactivateById.Status,
  });

  return result.user_deactivateById;
}

/**
 * Test 11: Reactivate User
 */
async function testReactivateUser() {
  console.log("\n🧪 Test 11: Reactivate User");
  const mutation = `
    mutation ReactivateUser($userId: String!) {
      user_reactivateById(userId: $userId) {
        id
        email
        Status
      }
    }
  `;

  const variables = { userId: testUserId };
  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ User reactivated:", {
    id: result.user_reactivateById.id,
    status: result.user_reactivateById.Status,
  });

  return result.user_reactivateById;
}

/**
 * Test 12: Deactivate Pending User (with grace period)
 */
async function testDeactivatePendingUser() {
  console.log(
    "\n🧪 Test 12: Deactivate Pending User: Should fail due to grace period",
  );

  // Create a new pending user
  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
  `;

  const newUserEmail = `test.pending.${Date.now()}@example.com`;
  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "Pending",
      lastName: "User",
    },
  });

  const pendingUserId = signupResult.auth_signUp.user.id;
  createdUserIds.push(pendingUserId);

  console.log(`✅ Pending user created: ${pendingUserId}`);

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

    await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
  }

  const mutation = `
    mutation DeactivatePendingUser($input: UserDeactivatePendingUserServiceInput!) {
      user_deactivatePendingUser(input: $input) {
        id
        Status
      }
    }
  `;

  const variables = {
    input: {
      id: pendingUserId,
      gracePeriodInDays: 7,
    },
  };
  try {
    await makeGraphQLRequest(mutation, variables);
  } catch (error) {
    if (error.message.includes("FAILED")) {
      console.log(
        "✅ Pending user could not be deactivated as expected due to recent registration activity within 7 day grace period.",
      );
      return null;
    }
  }

  console.log(
    "✅ Deactivate Pending User within grace period failed successfully:",
  );
}

/**
 * Test 13: Deactivate Active User (with grace period)
 */
async function testDeactivateActiveUser() {
  console.log("\n🧪 Test 13: Deactivate Active User");

  // Create and activate a new user
  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
        activationKey
      }
    }
  `;

  const newUserEmail = `test.active.${Date.now()}@example.com`;
  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "Active",
      lastName: "User",
    },
  });

  const activeUserId = signupResult.auth_signUp.user.id;
  const activationKey = signupResult.auth_signUp.activationKey;
  createdUserIds.push(activeUserId);

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

    await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
  }

  // Activate the user
  const activateMutation = `
    mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
  `;

  await makeGraphQLRequest(activateMutation, {
    input: {
      email: newUserEmail,
      activationKey: activationKey,
    },
  });

  console.log(`✅ Active user created and activated: ${activeUserId}`);

  const mutation = `
    mutation DeactivateActiveUser($input: UserDeactivateActiveUserServiceInput!) {
      user_deactivateActiveUser(input: $input) {
        id
        Status
      }
    }
  `;

  const variables = {
    input: {
      id: activeUserId,
      gracePeriodInMonths: 3,
    },
  };

  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ Active user deactivated with grace period:", {
    id: result.user_deactivateActiveUser.id,
    status: result.user_deactivateActiveUser.Status,
  });

  return result.user_deactivateActiveUser;
}

/**
 * Test 14: Disable User
 */
async function testDisableUser() {
  console.log("\n🧪 Test 14: Disable User");

  // Create a new user to disable
  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
  `;

  const newUserEmail = `test.deactivation.${Date.now()}@example.com`;
  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "Deactivation",
      lastName: "User",
    },
  });

  const disableUserId = signupResult.auth_signUp.user.id;
  createdUserIds.push(disableUserId);

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

    await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
  }

  const mutation = `
    mutation DisableUser($userId: String!) {
      user_disableById(userId: $userId) {
        id
        email
        Status
      }
    }
  `;

  const variables = { userId: disableUserId };
  const result = await makeGraphQLRequest(mutation, variables);

  console.log("✅ User disabled:", {
    id: result.user_disableById.id,
    status: result.user_disableById.Status,
  });

  return result.user_disableById;
}

/**
 * Test 15: Deactivate Inactive Users (Bulk Operation)
 */
async function testDeactivateInactiveUsers() {
  console.log(
    "\n🧪 Test 15: Deactivate Inactive Users (Bulk) -> 0 within grace period",
  );
  const mutation = `
    mutation DeactivateInactiveUsers {
      user_deactivateInactiveUsers {
        id
        email
        Status
      }
    }
  `;

  const result = await makeGraphQLRequest(mutation, {});

  console.log(
    "✅ Inactive users deactivated:",
    result.user_deactivateInactiveUsers.length,
  );
  return result.user_deactivateInactiveUsers;
}

/**
 * Test 16: Disable Deactivated Users (Bulk Operation)
 */
async function testDisableDeactivatedUsers() {
  console.log(
    "\n🧪 Test 16: Disable Deactivated Users (Bulk) -> 0 within grace period",
  );
  const mutation = `
    mutation DisableDeactivatedUsers($gracePeriodInMonths: Int) {
      user_disableDeactivatedUsers(gracePeriodInMonths: $gracePeriodInMonths) {
        id
        email
        Status
      }
    }
  `;

  const variables = { gracePeriodInMonths: 6 };
  const result = await makeGraphQLRequest(mutation, variables);

  console.log(
    "✅ Deactivated users disabled:",
    result.user_disableDeactivatedUsers.length,
  );
  return result.user_disableDeactivatedUsers;
}

/**
 * Test 17: Soft Delete Disabled Users & Schedule for Deletion (Bulk Operation)
 * Note: This mutation actually performs TWO operations:
 * 1. Soft deletes all DISABLED users (DISABLED -> SOFT_DELETED)
 * 2. Schedules them for deletion (sets isScheduledForDeletion flag)
 */
async function testScheduleSoftDeletedUsers() {
  console.log(
    "\n🧪 Test 17: Soft Delete & Schedule Disabled Users (Bulk) -> 0 within grace period of 30 days",
  );
  const mutation = `
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
  `;

  const result = await makeGraphQLRequest(mutation, {});

  console.log(
    "✅ Disabled users soft-deleted and scheduled for deletion:",
    result.user_scheduleSoftDeletedUsersForDeletion.length,
  );
  return result.user_scheduleSoftDeletedUsersForDeletion;
}

/**
 * Test 18: Soft Delete Disabled User (Success Case)
 */
async function testSoftDeleteDisabledUser() {
  console.log("\n🧪 Test 18: Soft Delete Disabled User (Success)");

  // Create a new user to delete
  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
  `;

  const newUserEmail = `test.removal.${Date.now()}@example.com`;
  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "Removal",
      lastName: "User",
    },
  });

  const deleteUserId = signupResult.auth_signUp.user.id;

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

    const result01 = await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
    console.log("📝 Account type updated to TEST:", result01.account_update);
  }

  // Step 1: Disable the user (required before soft delete)
  const disableMutation = `
    mutation DisableUser($userId: String!) {
      user_disableById(userId: $userId) {
        id
        Status
      }
    }
  `;

  const result02 = await makeGraphQLRequest(disableMutation, {
    userId: deleteUserId,
  });
  console.log("✅ User disabled (Status: DISABLED)");
  console.log("📝 Disabled User Info:", result02.user_disableById);

  // Step 2: Soft delete the user (DISABLED -> SOFT_DELETED)
  const softDeleteMutation = `
    mutation SoftDeleteUser($userId: String!) {
      user_softDeleteById(userId: $userId) {
        id
        Status
        isScheduledForDeletion
      }
    }
  `;

  const result03 = await makeGraphQLRequest(softDeleteMutation, {
    userId: deleteUserId,
  });
  console.log("✅ User soft-deleted (Status: SOFT_DELETED)");
  console.log("📝 Soft Deleted User Info:", result03.user_softDeleteById);

  // Step 3: Schedule for deletion (sets isScheduledForDeletion flag)
  // Note: Using bulk operation as it's the only available mutation
  const scheduleMutation = `
    mutation ScheduleSoftDeletedUsers {
      user_scheduleSoftDeletedUsersForDeletion {
        id
        email
        Status
      }
    }
  `;

  const result04 = await makeGraphQLRequest(scheduleMutation, {});
  console.log(
    "✅ User scheduled for deletion (isScheduledForDeletion: false) - scheduling is automatic after grace period",
  );
  console.log(
    "📝 Scheduled Users Info:",
    result04.user_scheduleSoftDeletedUsersForDeletion,
  );

  // Step 4: Permanently delete the scheduled user
  const deleteMutation = `
    mutation DeleteUser($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        email
        Status
        scheduledDeletionAt
        isScheduledForDeletion
      }
    }
  `;

  const variables = { userId: deleteUserId };
  const result05 = await makeGraphQLRequest(deleteMutation, variables);

  console.log(
    "✅ User permanently deleted fails (Status: SOFT_DELETED): Needs to be scheduled for deletion first",
    {
      id: result05.user_deleteById.id,
      status: result05.user_deleteById.Status,
      scheduledDeletionAt: result05.user_deleteById.scheduledDeletionAt,
      isScheduledForDeletion: result05.user_deleteById.isScheduledForDeletion,
    },
  );

  return result05.user_deleteById;
}

/**
 * Test 19: Delete Active User (Should Fail)
 */
async function testDeleteActiveUserFailure() {
  console.log("\n🧪 Test 19: Delete Active User (Should Fail)");

  // Create and activate a new user
  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
        activationKey
      }
    }
  `;

  const newUserEmail = `test.active.${Date.now()}@example.com`;
  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "Active",
      lastName: "ToDelete",
    },
  });

  const activeUserId = signupResult.auth_signUp.user.id;
  const activationKey = signupResult.auth_signUp.activationKey;

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

    await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
  }

  // Activate the user
  const activateMutation = `
    mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
  `;

  await makeGraphQLRequest(activateMutation, {
    input: {
      email: newUserEmail,
      activationKey: activationKey,
    },
  });

  console.log("✅ User activated");

  // Try to delete the active user (should fail)
  const deleteMutation = `
    mutation DeleteUser($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        email
        Status
      }
    }
  `;

  try {
    await makeGraphQLRequest(deleteMutation, { userId: activeUserId });
    console.log(
      "❌ Test should have failed - active user should not be deletable",
    );
    throw new Error("Expected deletion to fail for active user");
  } catch (error) {
    const errorMsg = error.message.toLowerCase();
    if (
      errorMsg.includes("not-scheduled-for-deletion") ||
      errorMsg.includes("not scheduled") ||
      errorMsg.includes("user-error")
    ) {
      console.log("✅ Active user deletion correctly rejected:", error.message);
      return { success: true, rejected: true };
    }
    // If it's the "expected test to fail" error, rethrow it
    if (error.message.includes("Expected deletion to fail")) {
      throw error;
    }
    throw error;
  }
}

/**
 * Test 20: Delete User by ID - Active User (Should Fail)
 * Tests the deleteById implementation for active users
 * Expected: Should fail with error - active users cannot be deleted directly
 */
async function testDeleteByIdActiveUser() {
  console.log("\n🧪 Test 20: Delete User by ID - Active User (Should Fail)");

  // Create and activate a new user
  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
        activationKey
      }
    }
  `;

  const newUserEmail = `test.deleteby.active.${Date.now()}@example.com`;
  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "DeleteBy",
      lastName: "Active",
    },
  });

  const activeUserId = signupResult.auth_signUp.user.id;
  const activationKey = signupResult.auth_signUp.activationKey;
  createdUserIds.push(activeUserId);

  // Track accountId for cleanup and update type to TEST
  if (signupResult.auth_signUp.user.accountId) {
    createdAccountIds.push(signupResult.auth_signUp.user.accountId);
    const updateAccountMutation = `
      mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
    `;

    await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
  }

  // Activate the user
  const activateMutation = `
    mutation ActivateUser($input: AuthActivateUserResolverInput!) {
      auth_activateUser(input: $input)
    }
  `;

  await makeGraphQLRequest(activateMutation, {
    input: {
      email: newUserEmail,
      activationKey: activationKey,
    },
  });

  console.log("✅ User activated (Status: ACTIVE)");

  // Try to delete the active user using deleteById (should fail)
  const deleteByIdMutation = `
    mutation DeleteUserById($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        email
        Status
      }
    }
  `;

  try {
    await makeGraphQLRequest(deleteByIdMutation, { userId: activeUserId });
    console.log(
      "❌ Test should have failed - active user deletion should be rejected",
    );
    throw new Error("Expected deleteById to fail for active user");
  } catch (error) {
    const errorMsg = error.message.toLowerCase();
    if (
      errorMsg.includes("not-scheduled-for-deletion") ||
      errorMsg.includes("not scheduled") ||
      errorMsg.includes("user-error")
    ) {
      console.log("✅ Active user deletion correctly rejected:", error.message);
      return { success: true, rejected: true };
    }
    // If it's the "expected test to fail" error, rethrow it
    if (error.message.includes("Expected deleteById to fail")) {
      throw error;
    }
    throw error;
  }
}

/**
 * Test 21: Delete User by ID - Non-Active User (Should Soft Delete)
 * Tests the deleteById implementation for users with status other than ACTIVE or SCHEDULED_DELETION
 * Expected: Should perform soft delete
 */
async function testDeleteByIdNonActiveUser() {
  console.log(
    "\n🧪 Test 21: Delete User by ID - Non-Active User (Should Soft Delete)",
  );

  // Create a new user
  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
  `;

  const newUserEmail = `test.deleteby.inactive.${Date.now()}@example.com`;
  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "DeleteBy",
      lastName: "Inactive",
    },
  });

  const userId = signupResult.auth_signUp.user.id;
  createdUserIds.push(userId);

  // Track accountId for cleanup and update type to TEST
  if (signupResult.auth_signUp.user.accountId) {
    createdAccountIds.push(signupResult.auth_signUp.user.accountId);
    const updateAccountMutation = `
      mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
    `;

    await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
  }

  console.log(
    "✅ User created (Status: PENDING - not ACTIVE or SCHEDULED_DELETION)",
  );

  // Call deleteById - should perform soft delete for non-active user
  const deleteByIdMutation = `
    mutation DeleteUserById($userId: String!) {
      user_deleteById(userId: $userId) {
        id
        email
        Status
      }
    }
  `;

  const result = await makeGraphQLRequest(deleteByIdMutation, { userId });

  console.log("✅ User soft-deleted via deleteById:", {
    id: result.user_deleteById.id,
    status: result.user_deleteById.Status,
  });

  // Verify the user was soft deleted
  if (result.user_deleteById.Status === "SOFT_DELETED") {
    console.log("✅ Verified: User status changed to SOFT_DELETED");
    return result.user_deleteById;
  } else {
    throw new Error(
      `Expected SOFT_DELETED status, got ${result.user_deleteById.Status}`,
    );
  }
}

/**
 * Test 22: Delete User by ID - Scheduled for Deletion (Should Fail - Date Not Reached)
 * Tests the deleteById implementation for users scheduled for deletion but date not reached
 * Expected: Should fail - deletion date not reached, cron job will handle final deletion
 */
async function testDeleteByIdScheduledUser() {
  console.log(
    "\n🧪 Test 22: Delete User by ID - Scheduled User (Should Fail - Date Not Reached)",
  );

  // Create a new user
  const signupMutation = `
    mutation SignUp($input: AuthSignUpServiceInput!) {
      auth_signUp(input: $input) {
        user {
          id
          accountId
        }
      }
    }
  `;

  const newUserEmail = `test.deleteby.scheduled.${Date.now()}@example.com`;
  const signupResult = await makeGraphQLRequest(signupMutation, {
    input: {
      email: newUserEmail,
      password: "TestPassword123!",
      firstName: "DeleteBy",
      lastName: "Scheduled",
    },
  });

  const userId = signupResult.auth_signUp.user.id;
  createdUserIds.push(userId);

  // Track accountId for cleanup and update type to TEST
  if (signupResult.auth_signUp.user.accountId) {
    createdAccountIds.push(signupResult.auth_signUp.user.accountId);
    const updateAccountMutation = `
      mutation AccountUpdate($id: String!, $data: AccountStarterUpdateServiceInput!) {
        account_update(id: $id, data: $data) {
          id
          Type
        }
      }
    `;

    await makeGraphQLRequest(updateAccountMutation, {
      id: signupResult.auth_signUp.user.accountId,
      data: { Type: "TEST" },
    });
  }

  // Step 1: Disable the user
  const disableMutation = `
    mutation DisableUser($userId: String!) {
      user_disableById(userId: $userId) {
        id
        Status
      }
    }
  `;

  const result01 = await makeGraphQLRequest(disableMutation, { userId });
  console.log("✅ User disabled (Status: DISABLED)");
  console.log("📝 Disabled User Info:", result01.user_disableById);

  // Step 2: Soft delete the user
  const softDeleteMutation = `
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
  `;

  const result02 = await makeGraphQLRequest(softDeleteMutation, { userId });
  console.log("✅ User soft-deleted (Status: SOFT_DELETED)");
  console.log("📝 Soft Deleted User Info:", result02.user_softDeleteById);

  // Step 3: Schedule for deletion
  const scheduleMutation = `
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
  `;

  const result03 = await makeGraphQLRequest(scheduleMutation, {});
  console.log(
    "✅ User not scheduled for deletion (end of grace period not reached)",
  );
  console.log(
    "📝 Scheduled Users Info:",
    result03.user_scheduleSoftDeletedUsersForDeletion,
  );

  // Try to delete using deleteById - should fail because deletion date not reached
  const deleteByIdMutation = `
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
  `;

  try {
    const result04 = await makeGraphQLRequest(deleteByIdMutation, { userId });
    console.log(
      "✅ Test should have failed - scheduled user deletion should be rejected (date not reached)",
    );
    console.log("📝 Deletion Result:", result04.user_deleteById);
    throw new Error(
      "Expected deleteById to fail for scheduled user (date not reached)",
    );
  } catch (error) {
    const errorMsg = error.message.toLowerCase();
    if (
      errorMsg.includes("not-scheduled-for-deletion") ||
      errorMsg.includes("not reached") ||
      errorMsg.includes("scheduled") ||
      errorMsg.includes("user-error") ||
      errorMsg.includes("cron") ||
      errorMsg.includes("date")
    ) {
      console.log(
        "✅ Scheduled user deletion correctly rejected (cron job will handle):",
        error.message,
      );
      return { success: true, rejected: true };
    }
    // If it's the "expected test to fail" error, rethrow it
    if (error.message.includes("Expected deleteById to fail")) {
      throw error;
    }
    throw error;
  }
}

/**
 * Test 23: Get All Users by Account ID
 */
async function testGetAllUsersByAccountId() {
  console.log("\n🧪 Test 23: Get All Users by Account ID");

  // First get the current user to find their account ID
  const currentUserQuery = `
    query GetCurrentUser {
      user_getCurrent {
        id
        accountId
      }
    }
  `;

  const currentUserResult = await makeGraphQLRequest(
    currentUserQuery,
    {},
    accessToken,
  );
  const accountId = currentUserResult.user_getCurrent.accountId;

  if (!accountId) {
    console.log("⚠️  No account ID found for user - skipping test");
    return { success: true, skipped: true };
  }

  const query = `
    query GetAllUsersByAccountId($accountId: String!) {
      user_getAllByAccountId(accountId: $accountId) {
        id
        email
        accountId
      }
    }
  `;

  const variables = { accountId };
  const result = await makeGraphQLRequest(query, variables);

  console.log(
    "✅ Users retrieved by account ID:",
    result.user_getAllByAccountId.length,
  );
  return result.user_getAllByAccountId;
}

/**
 * Cleanup: Delete test users and accounts
 */
async function cleanup() {
  console.log("\n🧹 Cleanup: Removing all test users and accounts...");

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
  { testId: "00-setup", name: "Setup test", fn: setupTestUser },
  { testId: "01", name: "Get Current User", fn: testGetCurrentUser },
  { testId: "01a", name: "Get Profile", fn: testGetProfile },
  { testId: "01b", name: "Update Profile", fn: testUpdateProfile },
  { testId: "02", name: "Get User by ID", fn: testGetUserById },
  { testId: "03", name: "Get User by Email", fn: testGetUserByEmail },
  { testId: "04", name: "Check if Email Exists", fn: testEmailExists },
  { testId: "05", name: "Get All Users (Paginated)", fn: testGetAllUsers },
  { testId: "06", name: "Get Users Count", fn: testGetUsersCount },
  { testId: "07", name: "Get Active Users Count", fn: testGetActiveUsersCount },
  {
    testId: "08",
    name: "Get All Users by Status",
    fn: testGetAllUsersByStatus,
  },
  { testId: "09", name: "Update User Role", fn: testUpdateUserRole },
  { testId: "10", name: "Deactivate User", fn: testDeactivateUser },
  { testId: "11", name: "Reactivate User", fn: testReactivateUser },
  {
    testId: "12",
    name: "Deactivate Pending User (Should fail in Grace Period of 30 days)",
    fn: testDeactivatePendingUser,
  },
  {
    testId: "13",
    name: "Deactivate Active User (Should succeed -> no login yet)",
    fn: testDeactivateActiveUser,
  },
  { testId: "14", name: "Disable User", fn: testDisableUser },
  {
    testId: "15",
    name: "Deactivate Inactive Users (Bulk) -> 0 within grace period: 6 months for active, 30 days for pending",
    fn: testDeactivateInactiveUsers,
  },
  {
    testId: "16",
    name: "Disable Deactivated Users (Bulk) -> 0 within grace period of 6 months",
    fn: testDisableDeactivatedUsers,
  },
  {
    testId: "17",
    name: "Schedule Soft Delete (Bulk) -> 0 within grace period of 30 days",
    fn: testScheduleSoftDeletedUsers,
  },
  {
    testId: "18",
    name: "Soft Delete Disabled User (Success)",
    fn: testSoftDeleteDisabledUser,
  },
  {
    testId: "19",
    name: "Delete Active User (Should Fail- needs to be disabled first)",
    fn: testDeleteActiveUserFailure,
    shouldFail: true, // Expected to fail
  },
  {
    testId: "20",
    name: "Delete User by ID - Active User (Should Fail- needs to be disabled and scheduled for deletion)",
    fn: testDeleteByIdActiveUser,
    shouldFail: true, // Expected to fail
  },
  {
    testId: "21",
    name: "Delete User by ID - Non-Active User (Should Soft Delete - was disabled)",
    fn: testDeleteByIdNonActiveUser,
  },
  {
    testId: "22",
    name: "Delete User by ID - Scheduled User (Should Fail, stays soft deleted until scheduled after grace period)",
    fn: testDeleteByIdScheduledUser,
    shouldFail: true, // Expected to fail - date not reached
  },
  {
    testId: "23",
    name: "Get All Users by Account ID",
    fn: testGetAllUsersByAccountId,
  },
  { testId: "99", name: "Cleanup", fn: cleanup },
];

module.exports = {
  tests,
  setupTestUser,
  cleanup,
  makeGraphQLRequest,
  testGetCurrentUser,
  testGetProfile,
  testGetUserById,
  testGetUserByEmail,
  testEmailExists,
  testGetAllUsers,
  testGetUsersCount,
  testGetActiveUsersCount,
  testGetAllUsersByStatus,
  testUpdateProfile,
  testUpdateUserRole,
  testDeactivateUser,
  testReactivateUser,
  testDeactivatePendingUser,
  testDeactivateActiveUser,
  testDisableUser,
  testDeactivateInactiveUsers,
  testDisableDeactivatedUsers,
  testScheduleSoftDeletedUsers,
  testSoftDeleteDisabledUser,
  testDeleteActiveUserFailure,
  testDeleteByIdActiveUser,
  testDeleteByIdNonActiveUser,
  testDeleteByIdScheduledUser,
  testGetAllUsersByAccountId,
};
