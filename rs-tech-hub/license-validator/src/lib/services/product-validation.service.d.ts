import { ServiceFacilitatorService } from '@rs-tech-hub/nestjs-service-operation';
import { License } from '../classes/license.class';
import { ProductConfig } from './license-product.service';
export declare class ProductValidationService {
    private readonly serviceFacilitator;
    private readonly logger;
    private registeredModuleIds;
    private registeredProducts;
    private licensedProducts;
    private unlicensedProducts;
    constructor(serviceFacilitator: ServiceFacilitatorService);
    validateRegisteredProducts(licenses: License[]): Promise<{
        licensedProducts: ProductConfig[];
        unlicensedProducts: ProductConfig[];
    }>;
    setregisteredModuleIds(moduleIds: string[]): Promise<void>;
    setLicenseCandidates(licenses: License[]): Promise<License[]>;
    private setRegisteredProductsFromModuleIds;
    private addLicensedProduct;
    private addUnlicensedProduct;
    private clearregisteredModuleIds;
}
//# sourceMappingURL=product-validation.service.d.ts.map