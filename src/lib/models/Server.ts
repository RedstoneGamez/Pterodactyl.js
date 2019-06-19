interface ServerOptions {
    id: number;
    externalId: any;
    internalId: string;
    uuid: string;
    identifier: string;
    name: string;
    description: string;
    suspended: boolean;
    limits: ServerLimits;
    featureLimits: ServerFeatureLimits;
    user: number;
    node: number;
    allocation: number;
    nest: number;
    egg: number;
    pack: any;
    container: ServerContainer;
    updatedAt: Date;
    createdAt: Date;
}

interface ServerOptionsRaw {
    id: number;
    external_id: any;
    uuid: string;
    identifier: string;
    name: string;
    description: string;
    suspended: boolean;
    limits: ServerLimits;
    feature_limits: ServerFeatureLimits;
    user: number;
    node: number;
    allocation: number;
    nest: number;
    egg: number;
    pack: any;
    container: ServerContainerRaw;
    updated_at: string;
    created_at: string;
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

interface ServerContainer {
    startupCommand: string;
    image: string;
    installed: boolean;
    environment: any;
}

interface ServerContainerRaw {
    startup_command: string;
    image: string;
    installed: boolean;
    environment: any;
}

class Server implements ServerOptions {
    public id: number;
    public externalId: any;
    public internalId: string;
    public uuid: string;
    public identifier: string;
    public name: string;
    public description: string;
    public suspended: boolean;
    public limits: ServerLimits;
    public featureLimits: ServerFeatureLimits;
    public user: number;
    public node: number;
    public allocation: number;
    public nest: number;
    public egg: number;
    public pack: any;
    public container: ServerContainer;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(data: ServerOptionsRaw) {
        this.id = data.id;
        this.externalId = data.external_id;
        this.internalId = data.uuid;
        this.uuid = data.uuid;
        this.identifier = data.identifier;
        this.name = data.name;
        this.description = data.description;
        this.suspended = data.suspended;
        this.limits = data.limits;
        this.featureLimits = data.feature_limits;
        this.user = data.user;
        this.node = data.node;
        this.allocation = data.allocation;
        this.nest = data.nest;
        this.egg = data.egg;
        this.pack = data.pack;
        this.container = {
            startupCommand: data.container.startup_command,
            image: data.container.image,
            installed: data.container.installed,
            environment: data.container.environment,
        };
        this.updatedAt = new Date(data.updated_at);
        this.createdAt = new Date(data.created_at);

    }
}

export default Server;