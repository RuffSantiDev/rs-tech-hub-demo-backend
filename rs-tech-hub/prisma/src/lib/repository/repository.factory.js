"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepository = createRepository;
// Generic repository factory with automatic type inference
function createRepository(getDelegateFromPrisma, repositoryName) {
    return class BaseRepository {
        delegate;
        serviceFacilitator;
        prisma;
        constructor(prisma, serviceFacilitator) {
            this.delegate = getDelegateFromPrisma(prisma);
            this.serviceFacilitator = serviceFacilitator;
            this.prisma = prisma;
        }
        getOperationName(operation) {
            return `${repositoryName}-repository-${operation}`;
        }
        // Find methods with select - return types automatically inferred
        async findWithSelect(where, select) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-with-select'), async () => {
                const result = await this.delegate.findFirst({
                    where,
                    select,
                });
                return result;
            }, { where, select }, `${this.getOperationName('find-with-select')} failed.`);
        }
        async findMany(where, options) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-many'), async () => {
                const result = await this.delegate.findMany({
                    where,
                    ...options,
                });
                return result;
            }, { where, options }, `${this.getOperationName('find-many')} failed.`);
        }
        async findManyWithSelect(where, select, options) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-many-with-select'), async () => {
                const results = await this.delegate.findMany({
                    where,
                    select,
                    ...options,
                });
                return results;
            }, { where, select, options }, `${this.getOperationName('find-many-with-select')} failed.`);
        }
        // Variant that returns a single item (first one) instead of an array
        async findOneWithSelect(where, select) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-one-with-select'), async () => {
                const results = await this.delegate.findMany({
                    where,
                    select,
                    take: 1,
                });
                const resultArray = results;
                return resultArray.length > 0
                    ? resultArray[0]
                    : null;
            }, { where, select }, `${this.getOperationName('find-one-with-select')} failed.`);
        }
        async findUnique(where, options) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-unique'), async () => {
                return await this.delegate.findUnique({
                    where,
                    ...options,
                });
            }, { where, options }, `${this.getOperationName('find-unique')} failed.`);
        }
        async findUniqueWithSelect(where, select) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-unique-with-select'), async () => {
                const result = await this.delegate.findUnique({
                    where,
                    select,
                });
                return result;
            }, { where, select }, `${this.getOperationName('find-unique-with-select')} failed.`);
        }
        // Find methods with include
        async findWithInclude(where, include) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-with-include'), async () => {
                const result = await this.delegate.findFirst({
                    where,
                    include,
                });
                return result;
            }, { where, include }, `${this.getOperationName('find-with-include')} failed.`);
        }
        async findManyWithInclude(where, include, options) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-many-with-include'), async () => {
                const result = await this.delegate.findMany({
                    where,
                    include,
                    ...options,
                });
                return result;
            }, { where, include, options }, `${this.getOperationName('find-many-with-include')} failed.`);
        }
        // Simple field selection
        async findWithFields(where, fields) {
            const select = fields?.reduce((acc, field) => {
                acc[field] = true;
                return acc;
            }, {});
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-with-fields'), async () => {
                const result = await this.delegate.findFirst({
                    where,
                    select,
                });
                return result;
            }, { where, fields }, `${this.getOperationName('find-with-fields')} failed.`);
        }
        async findManyWithFields(where, fields) {
            const select = fields?.reduce((acc, field) => {
                acc[field] = true;
                return acc;
            }, {});
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('find-many-with-fields'), async () => {
                const result = await this.delegate.findMany({
                    where,
                    select,
                });
                return result;
            }, { where, fields }, `${this.getOperationName('find-many-with-fields')} failed.`);
        }
        // CRUD operations
        async create(data, select) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('create'), async () => {
                const result = await this.delegate.create({
                    data,
                    ...(select && { select }),
                });
                return result;
            }, { data, select }, `${this.getOperationName('create')} failed.`);
        }
        async update(where, data, select) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('update'), async () => {
                const result = await this.delegate.update({
                    where,
                    data,
                    ...(select && { select }),
                });
                return result;
            }, {
                where,
                data,
                select,
            }, `${this.getOperationName('update')} failed.`);
        }
        async upsert(where, create, update, select) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('upsert'), async () => {
                const result = await this.delegate.upsert({
                    where,
                    create,
                    update,
                    ...(select && { select }),
                });
                return result;
            }, { where, create, update, select }, `${this.getOperationName('upsert')} failed.`);
        }
        async delete(where) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('delete'), async () => {
                const result = await this.delegate.delete({ where });
                return result;
            }, { where }, `${this.getOperationName('delete')} failed.`);
        }
        async deleteMany(where) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('delete-many'), async () => {
                const result = await this.delegate.deleteMany({ where });
                return result;
            }, { where }, `${this.getOperationName('delete-many')} failed.`);
        }
        // Utility methods
        async count(where) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('count'), async () => {
                const result = await this.delegate.count({ where });
                return result;
            }, { where }, `${this.getOperationName('count')} failed.`);
        }
        async exists(where) {
            return await this.serviceFacilitator.executeAndExtract(this.getOperationName('exists'), async () => {
                const count = await this.delegate.count({
                    where,
                    take: 1,
                });
                return count > 0;
            }, { where }, `${this.getOperationName('exists')} failed.`);
        }
    };
}
