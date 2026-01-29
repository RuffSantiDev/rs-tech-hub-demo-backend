/**
 * Centralized Test Runner for API Starter Tests
 * Runs all test suites sequentially
 *
 * Usage:
 *   node test-runner.js --all      # Run all test suites
 *   node test-runner.js --auth     # Run only auth tests
 *   node test-runner.js --user     # Run only user tests
 */

const {
  initializeReport,
  appendToReport,
  logSuiteStart,
  logTestStart,
  logTestEnd,
  logOperation,
  finalizeReport,
} = require('./test-utilities');

const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';
const TEST_DELAY = 6000; // 6 seconds delay between tests (20 req/min limit)

/**
 * Delay utility to prevent rate limiting
 */
const delay = (ms) => {
  console.log(`⏳ Delaying for ${ms} ms to avoid rate limiting...`);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const flags = {
    all: false,
    auth: false,
    user: false,
  };

  for (const arg of args) {
    if (arg === '--all') flags.all = true;
    else if (arg === '--auth') flags.auth = true;
    else if (arg === '--user') flags.user = true;
  }

  // Default to all if no flags specified
  if (!flags.all && !flags.auth && !flags.user) {
    flags.all = true;
  }

  return flags;
}

/**
 * Main test runner - runs all test suites sequentially
 */
async function runAllTests(flags = { all: true, auth: false, user: false }) {
  console.log('🚀 Starting API Starter Test Suite');
  console.log('📍 Target:', GRAPHQL_ENDPOINT);
  console.log('═══════════════════════════════════════════════════════\n');

  // Initialize test report
  initializeReport(flags, GRAPHQL_ENDPOINT);
  appendToReport('Test suite execution started', 'INFO');

  // Lazy-load test modules to avoid circular dependency
  const authTests = require('./api-starter/auth.api-starter.test');
  const userTests = require('./api-starter/user.api-starter.test');

  const results = [];
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  try {
    // Test Suite 1: Auth Tests
    if (flags.all || flags.auth) {
      console.log('\n┌─────────────────────────────────────────────────────┐');
      console.log('│           AUTH STARTER TEST SUITE                   │');
      console.log('└─────────────────────────────────────────────────────┘\n');

      logSuiteStart('Auth Starter Test Suite');
      const authResult = await runTestSuite('Auth Starter', authTests.tests);
      results.push(authResult);
      totalTests += authResult.total;
      totalPassed += authResult.passed;
      totalFailed += authResult.failed;
    }

    // Test Suite 2: User Tests
    if (flags.all || flags.user) {
      console.log('\n┌─────────────────────────────────────────────────────┐');
      console.log('│           USER API TEST SUITE                       │');
      console.log('└─────────────────────────────────────────────────────┘\n');

      logSuiteStart('User API Test Suite');
      const userResult = await runTestSuite('User API', userTests.tests);
      results.push(userResult);
      totalTests += userResult.total;
      totalPassed += userResult.passed;
      totalFailed += userResult.failed;
    }
  } catch (error) {
    console.error('\n💥 Test suite execution failed:', error.message);
    appendToReport(`Test suite execution failed: ${error.message}`, 'ERROR');
  }

  // Print final summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📊 FINAL TEST SUMMARY');
  console.log('═══════════════════════════════════════════════════════\n');

  results.forEach((suiteResult) => {
    console.log(`\n${suiteResult.name}:`);
    suiteResult.tests.forEach((result) => {
      const icon = result.status === 'PASS' ? '✅' : '❌';
      const testIdPrefix = result.testId ? `[${result.testId}] ` : '';
      console.log(`  ${icon} ${testIdPrefix}${result.test}: ${result.status}`);
      if (result.error) {
        console.log(`     └─ ${result.error}`);
      }
    });
  });

  console.log('\n═══════════════════════════════════════════════════════');
  console.log(
    `Total: ${totalTests} | Passed: ${totalPassed} | Failed: ${totalFailed}`
  );
  console.log('═══════════════════════════════════════════════════════\n');

  // Finalize test report
  finalizeReport(results, totalTests, totalPassed, totalFailed);
  appendToReport('Test suite execution completed', 'INFO');

  // Exit with appropriate code
  process.exit(totalFailed > 0 ? 1 : 0);
}

/**
 * Run a test suite with setup and cleanup
 */
async function runTestSuite(suiteName, tests) {
  const suiteResults = [];
  let passed = 0;
  let failed = 0;
  let setupTest = null;
  let cleanupTest = null;
  const regularTests = [];

  // Separate setup, cleanup, and regular tests
  for (const test of tests) {
    if (test.name.toLowerCase().includes('setup')) {
      setupTest = test;
    } else if (test.name.toLowerCase().includes('cleanup')) {
      cleanupTest = test;
    } else {
      regularTests.push(test);
    }
  }

  try {
    // Run setup if exists
    if (setupTest) {
      console.log(`\n🔧 Running Setup: ${setupTest.name}\n`);
      appendToReport(`Running setup: ${setupTest.name}`, 'SETUP');
      let retryCount = 0;
      const maxRetries = 3;
      let setupComplete = false;

      while (retryCount <= maxRetries && !setupComplete) {
        try {
          await setupTest.fn();
          console.log(`   ✅ Setup completed successfully\n`);
          logOperation('SETUP', setupTest.name, 'SUCCESS');
          setupComplete = true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);

          if (
            errorMessage.includes('Too many requests') &&
            retryCount < maxRetries
          ) {
            retryCount++;
            const retryDelay = TEST_DELAY * Math.pow(2, retryCount);
            console.log(
              `   ⏳ Setup rate limited - waiting ${
                retryDelay / 1000
              }s before retry ${retryCount}/${maxRetries}`
            );
            appendToReport(
              `Setup rate limited - retry ${retryCount}/${maxRetries} after ${
                retryDelay / 1000
              }s`,
              'WARN'
            );
            await delay(retryDelay);
            continue;
          }

          console.error(`   ❌ Setup failed: ${errorMessage}\n`);
          console.error('🛑 Test suite aborted due to setup failure\n');
          logOperation('SETUP', setupTest.name, 'FAILED', errorMessage);
          appendToReport(`Test suite aborted due to setup failure`, 'ERROR');
          return {
            name: suiteName,
            tests: suiteResults,
            total: regularTests.length,
            passed: 0,
            failed: regularTests.length,
          };
        }
      }
      await delay(TEST_DELAY);
    }

    // Run all regular tests in the suite
    for (const test of regularTests) {
      const testIdLog = test.testId ? `[${test.testId}] ` : '';
      appendToReport(`Running test: ${testIdLog}${test.name}`, 'TEST');

      // Log test start (header) before running the test
      logTestStart(test.name, test.testId);

      let retryCount = 0;
      const maxRetries = 3;
      let testPassed = false;

      while (retryCount <= maxRetries && !testPassed) {
        try {
          await test.fn();
          if (test.shouldFail) {
            console.log(
              `✅ ${testIdLog}${test.name} - correctly validated failure condition`
            );
          }
          suiteResults.push({
            test: test.name,
            status: 'PASS',
            testId: test.testId,
          });

          // Log test end (metadata) after test completes
          logTestEnd('PASS', null, test.testId);
          passed++;
          testPassed = true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);

          // Check if it's a rate limit error
          if (
            errorMessage.includes('Too many requests') &&
            retryCount < maxRetries
          ) {
            retryCount++;
            const retryDelay = TEST_DELAY * Math.pow(2, retryCount); // Exponential backoff
            console.log(
              `⏳ Rate limited - waiting ${
                retryDelay / 1000
              }s before retry ${retryCount}/${maxRetries} for: ${test.name}`
            );
            appendToReport(
              `Rate limited - retry ${retryCount}/${maxRetries} after ${
                retryDelay / 1000
              }s for: ${test.name}`,
              'WARN'
            );
            await delay(retryDelay);
            continue; // Retry the test
          }

          // Test failed with non-rate-limit error or max retries exceeded
          console.error(`❌ ${testIdLog}${test.name} failed:`, errorMessage);
          suiteResults.push({
            test: test.name,
            status: 'FAIL',
            error: errorMessage,
            testId: test.testId,
          });

          // Log test end with error
          logTestEnd('FAIL', errorMessage, test.testId);
          failed++;
          testPassed = true; // Stop retrying

          // If this test was not expected to fail, stop the entire test suite
          // Exception: Don't stop for rate limit failures (just skip those tests)
          if (!test.shouldFail && !errorMessage.includes('Too many requests')) {
            console.error(
              '\n🛑 CRITICAL FAILURE: Test suite stopped due to unexpected failure\n'
            );
            appendToReport(
              `CRITICAL FAILURE: Test suite stopped - ${test.name} failed unexpectedly`,
              'ERROR'
            );
            throw new Error(
              `Test suite aborted: ${test.name} failed unexpectedly`
            );
          } else if (errorMessage.includes('Too many requests')) {
            console.log(
              `⚠️  ${test.name} skipped after ${maxRetries} retries due to rate limiting`
            );
            appendToReport(
              `Test skipped after ${maxRetries} retries due to rate limiting: ${test.name}`,
              'WARN'
            );
          }
        }
      }

      // Add delay between tests to prevent rate limiting
      await delay(TEST_DELAY);
    }
  } finally {
    // Run cleanup if exists with retry logic for rate limiting
    if (cleanupTest) {
      console.log(`\n🧹 Running Cleanup: ${cleanupTest.name}\n`);
      appendToReport(`Running cleanup: ${cleanupTest.name}`, 'CLEANUP');
      let cleanupRetryCount = 0;
      const maxCleanupRetries = 3;
      let cleanupComplete = false;

      while (cleanupRetryCount <= maxCleanupRetries && !cleanupComplete) {
        try {
          await cleanupTest.fn();
          console.log(`   ✅ Cleanup completed successfully\n`);
          logOperation('CLEANUP', cleanupTest.name, 'SUCCESS');
          cleanupComplete = true;
          await delay(TEST_DELAY);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);

          // Check if it's a rate limit error
          if (
            errorMessage.includes('Too many requests') &&
            cleanupRetryCount < maxCleanupRetries
          ) {
            cleanupRetryCount++;
            const retryDelay = TEST_DELAY * Math.pow(2, cleanupRetryCount);
            console.log(
              `   ⏳ Cleanup rate limited - waiting ${
                retryDelay / 1000
              }s before retry ${cleanupRetryCount}/${maxCleanupRetries}`
            );
            appendToReport(
              `Cleanup rate limited - retry ${cleanupRetryCount}/${maxCleanupRetries} after ${
                retryDelay / 1000
              }s`,
              'WARN'
            );
            await delay(retryDelay);
            continue;
          }

          // Cleanup failed - log but don't throw (cleanup is best effort)
          console.error(`   ⚠️  Cleanup failed: ${errorMessage}\n`);
          logOperation('CLEANUP', cleanupTest.name, 'FAILED', errorMessage);
          break;
        }
      }
    }
  }

  return {
    name: suiteName,
    tests: suiteResults,
    total: regularTests.length, // Only count regular tests, not setup/cleanup
    passed,
    failed,
  };
}

// Run tests if this script is executed directly
if (require.main === module) {
  const flags = parseArgs();
  console.log(`\n🎯 Running tests with flags:`, flags);

  runAllTests(flags).catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  runAllTests,
  runTestSuite,
};
