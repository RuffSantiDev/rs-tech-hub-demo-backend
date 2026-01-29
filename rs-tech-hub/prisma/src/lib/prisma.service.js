"use strict";
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const tslib_1 = require("tslib");
// src/prisma.service.ts
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const client_1 = require("./generated/client/client");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    logger = new common_1.Logger(PrismaService_1.name);
    constructor(configService) {
        const databaseUrl = configService.get('DATABASE_URL');
        const pool = new pg_1.Pool({ connectionString: databaseUrl });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        super({
            adapter,
            log: ['error', 'warn'],
        });
    }
    async onModuleInit() {
        try {
            await this.$connect();
            // Test the connection by executing a simple query
            await this.testConnection();
            this.logger.log('Connected to the database successfully');
        }
        catch (error) {
            this.logger.error('Error connecting to the database');
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    // Helper method to clean up nested data in results
    cleanupData(data) {
        if (!data)
            return data;
        if (Array.isArray(data)) {
            return data.map((item) => this.cleanupData(item));
        }
        if (typeof data === 'object') {
            // Remove all keys that start with _
            // This is useful for removing Prisma's relation fields like _count
            const cleanedData = { ...data };
            Object.keys(cleanedData).forEach((key) => {
                if (key.startsWith('_')) {
                    delete cleanedData[key];
                }
                else if (typeof cleanedData[key] === 'object') {
                    cleanedData[key] = this.cleanupData(cleanedData[key]);
                }
            });
            return cleanedData;
        }
        return data;
    }
    async testConnection() {
        try {
            await this.$queryRaw `SELECT 1`;
            this.logger.log('Database connection test successful');
        }
        catch (error) {
            this.logger.error('Database connection test failed');
        }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], PrismaService);
