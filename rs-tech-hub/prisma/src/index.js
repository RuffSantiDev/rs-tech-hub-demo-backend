"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepository = exports.PrismaService = exports.PrismaModule = exports.PrismaClient = exports.Prisma = void 0;
const tslib_1 = require("tslib");
// ============================================================================
// Prisma Client Exports
// ============================================================================
// Re-export everything from the generated Prisma Client
// The .prisma/client is generated during postinstall and contains all types
tslib_1.__exportStar(require("./lib/generated/client/client"), exports);
// Export Prisma namespace explicitly (includes types, enums, etc.)
var client_1 = require("./lib/generated/client/client");
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
Object.defineProperty(exports, "PrismaClient", { enumerable: true, get: function () { return client_1.PrismaClient; } });
// ============================================================================
// NestJS Module Exports
// ============================================================================
var prisma_module_1 = require("./lib/prisma.module");
Object.defineProperty(exports, "PrismaModule", { enumerable: true, get: function () { return prisma_module_1.PrismaModule; } });
var prisma_service_1 = require("./lib/prisma.service");
Object.defineProperty(exports, "PrismaService", { enumerable: true, get: function () { return prisma_service_1.PrismaService; } });
// ============================================================================
// Repository Factory Export
// ============================================================================
var repository_factory_1 = require("./lib/repository/repository.factory");
Object.defineProperty(exports, "createRepository", { enumerable: true, get: function () { return repository_factory_1.createRepository; } });
