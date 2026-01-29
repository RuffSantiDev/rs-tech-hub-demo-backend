"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializerInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const operators_1 = require("rxjs/operators");
/**
 * Serializer interceptor for data transformation using DTOs
 * Transforms response data using class-transformer with exclusion rules
 *
 * @example
 * @UseInterceptors(new SerializerInterceptor(UserDto))
 * @Controller('users')
 * export class UsersController {}
 */
let SerializerInterceptor = class SerializerInterceptor {
    dto;
    constructor(dto) {
        this.dto = dto;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data === null || data === undefined) {
                return data;
            }
            if (Array.isArray(data)) {
                return data.map((item) => (0, class_transformer_1.plainToInstance)(this.dto, item, {
                    excludeExtraneousValues: true,
                    enableImplicitConversion: true,
                }));
            }
            return (0, class_transformer_1.plainToInstance)(this.dto, data, {
                excludeExtraneousValues: true,
                enableImplicitConversion: true,
            });
        }));
    }
};
exports.SerializerInterceptor = SerializerInterceptor;
exports.SerializerInterceptor = SerializerInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], SerializerInterceptor);
