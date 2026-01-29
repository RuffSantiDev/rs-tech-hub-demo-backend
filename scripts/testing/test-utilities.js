/**
 * Test Utilities
 * Shared utility functions for test reporting and logging
 */

const fs = require("fs");
const path = require("path");

// Report file configuration
let reportFilePath = null;
let reportStartTime = null;

/**
 * Generate report filename with YYMMDD format
 */
function getReportFilePath() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2); // Last 2 digits of year
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const filename = `${year}${month}${day}_testReport.md`;

  const reportsDir = path.join(__dirname, "reports");

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  return path.join(reportsDir, filename);
}

/**
 * Get formatted timestamp
 */
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ").substring(0, 19);
}

/**
 * Clean absolute paths from text, keeping only from rs-tech-hub-demo-backend onwards
 */
function cleanPaths(text) {
  if (typeof text !== "string") {
    return text;
  }

  // Get the current working directory and extract the path prefix to remove
  const cwd = process.cwd();
  const projectFolderName = "rs-tech-hub-demo-backend";
  const projectIndex = cwd.indexOf(projectFolderName);

  if (projectIndex === -1) {
    return text; // Project folder not found in cwd, return unchanged
  }

  // Get the path prefix to remove (everything before rs-tech-hub-demo-backend)
  const pathPrefix = cwd.substring(0, projectIndex);

  // Escape special regex characters and handle both escaped and unescaped backslashes
  const escapedPrefix = pathPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(escapedPrefix.replace(/\\\\/g, "\\\\\\\\?"), "g");

  return text.replace(pattern, "");
}

/**
 * Initialize test report file
 */
function initializeReport(flags, endpoint) {
  reportFilePath = getReportFilePath();
  reportStartTime = new Date();

  const header =
    `# Test Report - ${getTimestamp()}\n\n` +
    `**Endpoint:** ${endpoint}\n` +
    `**Flags:** ${JSON.stringify(flags)}\n` +
    `**Start Time:** ${getTimestamp()}\n\n` +
    `---\n\n`;

  fs.writeFileSync(reportFilePath, header, "utf8");
  console.log(`📝 Test report initialized: ${reportFilePath}\n`);
}

/**
 * Append log entry to test report
 */
function appendToReport(message, level = "INFO") {
  if (!reportFilePath) return;

  const timestamp = getTimestamp();
  const logEntry = `**[${timestamp}]** [${level}] ${message}\n\n`;

  fs.appendFileSync(reportFilePath, logEntry, "utf8");
}

/**
 * Log GraphQL request details to report
 */
function logGraphQLRequest(query, variables, isError = false) {
  if (!reportFilePath) return;

  const level = isError ? "ERROR" : "DEBUG";
  let message = `#### GraphQL Request\n\n`;
  message += `**Query:**\n\`\`\`graphql\n${query.trim()}\n\`\`\`\n\n`;

  if (variables && Object.keys(variables).length > 0) {
    message += `**Variables:**\n\`\`\`json\n${JSON.stringify(
      variables,
      null,
      2,
    )}\n\`\`\`\n\n`;
  }

  fs.appendFileSync(reportFilePath, message, "utf8");
}

/**
 * Log GraphQL response details to report
 */
function logGraphQLResponse(data, isError = false) {
  if (!reportFilePath) return;

  const level = isError ? "ERROR" : "DEBUG";
  const jsonString = JSON.stringify(data, null, 2);
  const cleanedJson = cleanPaths(jsonString);
  const message = `**Response:**\n\`\`\`json\n${cleanedJson}\n\`\`\`\n\n`;

  fs.appendFileSync(reportFilePath, message, "utf8");
}

/**
 * Log test suite start
 */
function logSuiteStart(suiteName) {
  const message = `## ${suiteName}\n\n`;
  fs.appendFileSync(reportFilePath, message, "utf8");
  appendToReport(`Starting test suite: ${suiteName}`, "SUITE");
}

/**
 * Log test start - writes test header
 */
function logTestStart(testName, testId = null) {
  const icon = "🧪"; // Test tube icon for in-progress
  const testIdPrefix = testId ? `[${testId}] ` : "";
  const message = `### ${testIdPrefix}${testName}\n\n`;
  fs.appendFileSync(reportFilePath, message, "utf8");
}

/**
 * Log test end - writes test metadata and result
 */
function logTestEnd(status, error = null, testId = null) {
  const icon = status === "PASS" ? "✅" : "❌";
  let message = "";

  if (testId) {
    message += `- **Test ID:** ${testId}\n`;
  }
  message += `- **Status:** ${status} ${icon}\n`;
  message += `- **Timestamp:** ${getTimestamp()}\n`;

  if (error) {
    message += `- **Error:**\n\`\`\`\n${error}\n\`\`\`\n`;
  }

  message += "\n";
  fs.appendFileSync(reportFilePath, message, "utf8");
}

/**
 * Log setup/cleanup operations
 */
function logOperation(operationType, name, status, error = null) {
  const icon = status === "SUCCESS" ? "✅" : "❌";
  let message = `### ${icon} ${operationType}: ${name}\n\n`;
  message += `- **Status:** ${status}\n`;
  message += `- **Timestamp:** ${getTimestamp()}\n`;

  if (error) {
    message += `- **Error:**\n\`\`\`\n${error}\n\`\`\`\n`;
  }

  message += "\n";
  fs.appendFileSync(reportFilePath, message, "utf8");
}

/**
 * Finalize test report with summary
 */
function finalizeReport(results, totalTests, totalPassed, totalFailed) {
  if (!reportFilePath) return;

  const endTime = new Date();
  const duration = ((endTime - reportStartTime) / 1000).toFixed(2);

  let summary = `\n---\n\n## Final Summary\n\n`;
  summary += `**End Time:** ${getTimestamp()}\n`;
  summary += `**Duration:** ${duration}s\n`;
  summary += `**Total Tests:** ${totalTests}\n`;
  summary += `**Passed:** ${totalPassed} ✅\n`;
  summary += `**Failed:** ${totalFailed} ❌\n`;
  summary += `**Success Rate:** ${
    totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(2) : 0
  }%\n\n`;

  summary += `### Test Suite Results\n\n`;
  results.forEach((suiteResult) => {
    summary += `#### ${suiteResult.name}\n\n`;
    summary += `- Total: ${suiteResult.total}\n`;
    summary += `- Passed: ${suiteResult.passed}\n`;
    summary += `- Failed: ${suiteResult.failed}\n\n`;
  });

  fs.appendFileSync(reportFilePath, summary, "utf8");
  console.log(`\n📝 Test report finalized: ${reportFilePath}\n`);
}

/**
 * Get the current report file path
 */
function getActiveReportPath() {
  return reportFilePath;
}

module.exports = {
  initializeReport,
  appendToReport,
  logGraphQLRequest,
  logGraphQLResponse,
  logSuiteStart,
  logTestStart,
  logTestEnd,
  logOperation,
  finalizeReport,
  getActiveReportPath,
};
