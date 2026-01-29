"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshStrategy = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
const passport_jwt_1 = require("passport-jwt");
const errors_1 = require("../errors");
let JwtRefreshStrategy = class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    prisma;
    constructor(prisma, configService) {
        const jwtSecret = configService.get('JWT_REFRESH_SECRET');
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    // First try to extract from cookie
                    if (request?.cookies?.refresh_token) {
                        return request.cookies.refresh_token;
                    }
                    // Then try header
                    return request?.headers['x-refresh-token'];
                },
            ]),
            secretOrKey: jwtSecret,
            passReqToCallback: true,
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        // Basic validation - we'll do the detailed validation in the service
        const userId = payload.sub;
        if (!userId) {
            throw new common_1.UnauthorizedException(errors_1.AUTH_ERROR_INVALID_TOKEN_PAYLOAD);
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                Status: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(errors_1.AUTH_ERROR_USER_NOT_FOUND);
        }
        if (user.Status !== 'ACTIVE') {
            throw new common_1.UnauthorizedException(errors_1.AUTH_ERROR_USER_INACTIVE);
        }
        return user;
    }
};
exports.JwtRefreshStrategy = JwtRefreshStrategy;
exports.JwtRefreshStrategy = JwtRefreshStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        config_1.ConfigService])
], JwtRefreshStrategy);
