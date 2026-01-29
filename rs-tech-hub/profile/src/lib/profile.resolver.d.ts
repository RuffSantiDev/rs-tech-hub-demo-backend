import { AuthenticatedUser } from '@rs-tech-hub/nestjs-auth-core';
import { ProfileServiceOutput } from './dto/profile.service.output';
import { ProfileUpdateServiceInput } from './dto/profile-update.service.input';
import { ProfileService } from './profile.service';
export declare class ProfileResolver {
    private readonly profileService;
    constructor(profileService: ProfileService);
    profile_get(user: AuthenticatedUser): Promise<ProfileServiceOutput>;
    profile_update(user: AuthenticatedUser, updateProfileInput: ProfileUpdateServiceInput): Promise<ProfileServiceOutput>;
}
//# sourceMappingURL=profile.resolver.d.ts.map