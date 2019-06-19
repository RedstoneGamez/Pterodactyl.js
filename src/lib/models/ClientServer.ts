interface ServerOptions {
    serverOwner: boolean;
    identifier: string;
    internalId: string;
    uuid: string;
    name: string;
    description: string;
    limits: ServerLimits;
    featureLimits: ServerFeatureLimits;
}

interface ServerOptionsRaw {
    server_owner: boolean;
    identifier: string;
    uuid: string;
    name: string;
    description: string;
    limits: ServerLimits;
    feature_limits: ServerFeatureLimits;
}

interface ServerLimits {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
}

interface ServerFeatureLimits {
    databases: number;
    allocations: number;
}

class ClientServer implements ServerOptions {
    public serverOwner: boolean;
    public identifier: string;
    public internalId: string;
    public uuid: string;
    public name: string;
    public description: string;
    public limits: ServerLimits;
    public featureLimits: ServerFeatureLimits;

    constructor(data: ServerOptionsRaw) {
        this.serverOwner = data.server_owner;
        this.identifier = data.identifier;
        this.internalId = data.uuid;
        this.uuid = data.uuid;
        this.name = data.name;
        this.description = data.description;
        this.limits = data.limits;
        this.featureLimits = data.feature_limits;
    }
}

export default ClientServer;