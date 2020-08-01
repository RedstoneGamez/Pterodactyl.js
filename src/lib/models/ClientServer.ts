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

interface AllocationOptions {
    ip: string;
    port: number;
}

interface ServerOptionsV1 {
    serverOwner: boolean;
    identifier: string;
    uuid: string;
    internalId: string;
    name: string;
    sftpDetails: AllocationOptions;
    description: string;
    allocation: AllocationOptions;
    limits: ServerLimits;
    featureLimits: ServerFeatureLimits;
    suspended: boolean;
    installing: boolean;
}

interface ServerOptionsRawV1 {
    server_owner: boolean;
    identifier: string;
    uuid: string;
    name: string;
    sftp_details: AllocationOptions;
    description: string;
    allocation: AllocationOptions;
    limits: ServerLimits;
    feature_limits: ServerFeatureLimits;
    is_suspended: boolean;
    is_installing: boolean;
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

export { ServerOptions, ServerOptionsRaw, ServerLimits, ServerFeatureLimits };

class ClientServer implements ServerOptions {
    public raw: ServerOptionsRaw;
    public serverOwner: boolean;
    public identifier: string;
    public internalId: string;
    public uuid: string;
    public name: string;
    public description: string;
    public limits: ServerLimits;
    public featureLimits: ServerFeatureLimits;

    constructor(data: ServerOptionsRaw) {
        this.raw = data;
        this.serverOwner = data.server_owner;
        this.identifier = data.identifier;
        this.internalId = data.uuid;
        this.uuid = data.uuid;
        this.name = data.name;
        this.description = data.description;
        this.limits = data.limits;
        this.featureLimits = data.feature_limits;
    }

    public toJSON(): any {
        return {
            serverOwner: this.serverOwner,
            identifier: this.identifier,
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            limits: this.limits,
            featureLimits: this.featureLimits
        };
    }

    public toRaw(): ServerOptionsRaw {
        return this.raw;
    }
}

class ClientServerV1 implements ServerOptionsV1 {
    public raw: ServerOptionsRaw;
    public serverOwner: boolean;
    public identifier: string;
    public uuid: string;
    public internalId: string;
    public name: string;
    public sftpDetails: AllocationOptions;
    public description: string;
    public allocation: AllocationOptions;
    public limits: ServerLimits;
    public featureLimits: ServerFeatureLimits;
    public suspended: boolean;
    public installing: boolean;

    constructor(data: ServerOptionsRawV1) {
        this.raw = data;
        this.serverOwner = data.server_owner;
        this.identifier = data.identifier;
        this.uuid = data.uuid;
        this.internalId = data.uuid;
        this.name = data.name;
        this.sftpDetails = data.sftp_details;
        this.description = data.description;
        this.allocation = data.allocation;
        this.limits = data.limits;
        this.featureLimits = data.feature_limits;
        this.suspended = data.is_suspended;
        this.installing = data.is_installing;
    }

    public toJSON(): any {
        return {
            serverOwner: this.serverOwner,
            identifier: this.identifier,
            uuid: this.uuid,
            name: this.name,
            sftpDetails: this.sftpDetails,
            description: this.description,
            allocation: this.allocation,
            limits: this.limits,
            featureLimits: this.featureLimits,
            suspended: this.suspended,
            installing: this.installing,
        };
    }

    public toRaw(): ServerOptionsRaw {
        return this.raw;
    }
}

export default ClientServer;
export { ClientServerV1 };