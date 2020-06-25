import AdminAPI from '../AdminAPI';

import NodeAllocationModel, { NodeAllocationOptions } from '../models/NodeAllocation';
import Pagination, { PaginationOptionsRaw } from '../models/Pagination';

class NodeAllocation extends NodeAllocationModel {
    private api: AdminAPI;
    public pagination?: Pagination;

    constructor(api: AdminAPI, node: number, data: NodeAllocationOptions, paginationOptions?: PaginationOptionsRaw) {
        super(data, node);
        this.api = api;
        this.pagination = new Pagination(paginationOptions);
    }

    public static getAll(api: AdminAPI, node: number, page: number = 1): Promise<NodeAllocation[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/nodes/${node}/allocations?page=${page}`);
                resolve(res.data.data.map((value: any) => new NodeAllocation(api, node, value.attributes, res.data.meta)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.node}/allocations/${this.id}`, 'DELETE').then(res => resolve()).catch(error => reject(error));
        });
    }
}

export default NodeAllocation;