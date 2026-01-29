"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const nestjs_prisma_1 = require("@rs-tech-hub/nestjs-prisma");
const passport_jwt_1 = require("passport-jwt");
const errors_1 = require("../errors");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    prisma;
    constructor(prisma, configService) {
        const jwtSecret = configService.get('JWT_SECRET');
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        const { sub: userId } = payload;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                Status: true,
            },
        });
        if (!user || user.Status !== 'ACTIVE') {
            throw new common_1.UnauthorizedException(errors_1.AUTH_ERROR_USER_NOT_FOUND_OR_INACTIVE);
        }
        return {
            userId: user.id,
            email: user.email,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [nestjs_prisma_1.PrismaService, config_1.ConfigService])
], JwtStrategy);
