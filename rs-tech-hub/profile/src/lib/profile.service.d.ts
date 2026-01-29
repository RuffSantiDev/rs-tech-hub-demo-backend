import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { ProfileUpdateServiceInput } from './dto/profile-update.service.input';
import { ProfileServiceOutput } from './dto/profile.service.output';
import { ProfileRepository } from './profile.repository';
export declare class ProfileService {
    private readonly profileRepository;
    private readonly serviceFacilitatorService;
    constructor(profileRepository: ProfileRepository, serviceFacilitatorService: ServiceFacilitatorService);
    getProfile(userId: string): Promise<ProfileServiceOutput>;
    updateProfile(data: {
        userId: string;
        updateProfileInput: ProfileUpdateServiceInput;
    }): Promise<ProfileServiceOutput>;
}
//# sourceMappingURL=profile.service.d.ts.map