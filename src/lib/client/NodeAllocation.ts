import AdminAPI from '../AdminAPI';

import NodeAllocationModel, { NodeAllocationOptions } from '../models/NodeAllocation';

class NodeAllocation extends NodeAllocationModel {
    private api: AdminAPI;

    constructor(api: AdminAPI, node: number, data: NodeAllocationOptions) {
        super(data, node);
        this.api = api;
    }

    public static getAll(api: AdminAPI, node: number): Promise<NodeAllocation[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/nodes/${node}/allocations`);
                resolve(res.data.data.map((value: any) => new NodeAllocation(api, node, value.attributes)));
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