# @rs-tech-hub/nestjs-license-validator

Internal license validation and monitoring module for RS-Tech-Hub packages. Handles license verification, environment-based validation, and production usage tracking with GraphQL endpoints for license management.

## 📄 License

This package is part of the RS-Tech-Hub ecosystem and is required for using any licensed RS-Tech-Hub module. By using this software, you agree to the terms outlined in the [Software License Agreement](../../SLA.md).

## ✨ Features

- 🔐 Automatic license validation for RS-Tech-Hub packages
- 🌍 Environment-aware validation (development, staging, production)
- 📊 Production usage tracking and limits
- 🎯 Tier-based feature access control (starter, professional, enterprise)
- ⏰ License expiration tracking
- 🔄 GraphQL API for license status and management
- 🛡️ Secure license key verification

## 📋 Prerequisites

- Node.js >= 18
- TypeScript >= 5.1.0
- NestJS >= 11.1.6
- GraphQL support configured in your NestJS application

## � Package Availability

This package is included and showcased in the **RS-Tech-Hub Demo App** on GitHub: https://github.com/RuffSantiDev

Visit the demo repository to see implementation examples and usage patterns.

## 🚀 Quick Start

### Environment Configuration

Configure your environment variables:

```bash
# Required: Your RS-Tech-Hub license key
RSTECHHUB_LICENSE_KEY=your-license-key-here

# Optional: Environment (default: development)
NODE_ENV=development  # or staging, production

```

## 📖 GraphQL API

### Queries

#### Get Licenses

Retrieve all license information including status, usage, and product details. Protected with `ServiceAuthGuard`.

```graphql
query {
  license_getLicenses {
    success
    licenses {
      identifier
      environment
      isDemoMode
      isProductionInstance
      productionInstanceIsRunning
      provider
      status {
        isVerified
        isValidated
        isActivated
        isExpired
        validatedAt
        activatedAt
        expiredAt
      }
      usage {
        activationUsage
        activationLimit
        hasReachedUsageLimit
      }
      product {
        id
        name
        marketplace
        providerId
        licensedModules
      }
      heartbeat {
        maxFailedAttempts
        currentFailedAttempts
        lastHeartbeatAt
        intervalInMinutes
      }
      gracePeriod {
        isAllowed
        isInGracePeriod
        gracePeriodStartedAt
        gracePeriodEndsAt
        gracePeriodInDays
      }
    }
  }
}
```

### Mutations

#### Reset Production Usage Count

Reset license activation usage counter. **Only available in staging environment.** Protected with `ServiceAuthGuard`.

```graphql
mutation {
  license_resetProductionUsageCount {
    success
    licenses {
      identifier
      usage {
        activationUsage
        activationLimit
        hasReachedUsageLimit
      }
    }
  }
}
```

**Note:** This mutation will throw an error if called outside of staging environment.

## 🌍 Environment Handling

The validator automatically detects and handles different environments:

### Development Environment

- ✅ Demo mode enabled
- ✅ No license validation
- ✅ Full feature access for testing
- ✅ All RS-Tech-Hub modules available
- ⚠️ Usage limits apply

### Staging Environment

- ⚠️ License validation required
- ✅ No license activation (instances not tracked)
- ✅ Usage counter can be reset
- ⚠️ Heartbeat validation active
- ⚠️ Usage limits apply

### Production Environment

- ⚠️ License validation required
- ⚠️ License activation enforced
- ⚠️ Activation limits tracked
- ⚠️ Heartbeat validation with grace period
- ✅ No Usage limits apply

## ⚠️ Common Issues

### License Validation Failed

- No valid license key found in environment
- License key is invalid or expired
- License does not cover required modules

### License Activation Failed

- Activation limit reached for license
- License instance already activated elsewhere
- Network connection to license server failed

### Heartbeat Validation Issues

- Failed heartbeat attempts exceeding limit
- License entering grace period (production)
- License expired after grace period

## 🔒 Best Practices

### Development

```bash
# No license required - all features available
NODE_ENV=development
```

### Staging

```bash
# Requires valid license but no activation tracking
NODE_ENV=staging
RSTECHHUB_LICENSE_KEY=your-license-key
```

### Production

```bash
# Requires valid license with activation and heartbeat
NODE_ENV=production
RSTECHHUB_LICENSE_KEY=your-license-key
```

### Monitoring Licenses

```typescript
// Check license health
async monitorLicenses() {
  const licenses = await this.licenseValidator.getLicenseData();

  for (const license of licenses) {
    if (license.status.isExpired) {
      await this.alertExpiredLicense(license.identifier);
    }

    if (license.gracePeriod.isInGracePeriod) {
      await this.alertGracePeriod(license.identifier);
    }

    if (license.usage.hasReachedUsageLimit) {
      await this.alertUsageLimit(license.identifier);
    }
  }
}
```

## 🛠️ Common Workflows

### Check All Licenses via GraphQL

```graphql
query GetAllLicenses {
  license_getLicenses {
    success
    licenses {
      identifier
      environment
      status {
        isValidated
        isActivated
        isExpired
      }
      product {
        name
        licensedModules
      }
    }
  }
}
```

### Reset Usage Counter (Staging Only)

```graphql
mutation ResetUsage {
  license_resetProductionUsageCount {
    success
    licenses {
      identifier
      usage {
        activationUsage
        activationLimit
      }
    }
  }
}
```

## 📦 Obtaining a License

To purchase or upgrade your RS-Tech-Hub license:

1. Visit [https://rstechhub.gumroad.com](https://rstechhub.gumroad.com)
2. Select the appropriate tier for your needs
3. Complete the purchase
4. Receive your license key via email
5. Configure in your environment variables

## Release Notes

### 1.0.1

- fixes typo in license validator service log^
- updates attribute delcarations in DTOs

### 1.0.0

- initial release

## 📧 Support

For license-related issues or questions:

- Email: insights@rstechhub.com

---

**Note**: This package is automatically managed by licensed RS-Tech-Hub modules. License validation runs on startup and via heartbeat checks. In production, license instances are activated and tracked against activation limits. Use the GraphQL `license_getLicenses` query to monitor your license status.
