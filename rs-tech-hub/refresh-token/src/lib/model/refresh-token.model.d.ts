import { UserModel } from '@rs-tech-hub/nestjs-user';
export declare class RefreshTokenModel {
    id: string;
    token: string;
    userId: string;
    user: UserModel;
    revoked: boolean;
    replacedByToken?: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=refresh-token.model.d.ts.map