interface NodeAllocationOptions {
    id: number;
    ip: string;
    alias: string;
    port: number;
    assigned: boolean;
    node: number;
}

export { NodeAllocationOptions };

class NodeAllocation implements NodeAllocationOptions {
    public id: number;
    public ip: string;
    public alias: string;
    public port: number;
    public assigned: boolean;
    public node: number;

    constructor(data: NodeAllocationOptions, node: number) {
        this.id = data.id;
        this.ip = data.ip;
        this.alias = data.alias;
        this.port = data.port;
        this.assigned = data.assigned;
        this.node = node;
    }

    public toJSON(): any {
        return {
            id: this.id,
            ip: this.ip,
            alias: this.alias,
            port: this.port,
            assigned: this.assigned,
        };
    }
}

export default NodeAllocation;