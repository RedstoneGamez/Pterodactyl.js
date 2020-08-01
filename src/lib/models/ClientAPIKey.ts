interface ClientAPIKeyOptions {
    identifier: string;
    description: string;
    allowedIps: string[];
    lastUsedAt: Date;
    createdAt: Date;
}

interface ClientAPIKeyOptionsRaw {
    identifier: string;
    description: string;
    allowed_ips: string[];
    last_used_at: string;
    created_at: string;
}

interface NewClientAPIKeyOptions {
    description: string;
    allowedIps?: string[];
}

export { ClientAPIKeyOptions, ClientAPIKeyOptionsRaw, NewClientAPIKeyOptions };

class ClientAPIKey implements ClientAPIKeyOptions {
    public raw: ClientAPIKeyOptionsRaw;
    public identifier: string;
    public description: string;
    public allowedIps: string[];
    public lastUsedAt: Date;
    public createdAt: Date;

    constructor(data: ClientAPIKeyOptionsRaw) {
        this.raw = data;
        this.identifier = data.identifier;
        this.description = data.description;
        this.allowedIps = data.allowed_ips;
        this.lastUsedAt = new Date(data.last_used_at);
        this.createdAt = new Date(data.created_at);
    }

    public toJSON(): any {
        return {
            identifier: this.identifier,
            description: this.description,
            allowedIps: this.allowedIps,
            lastUsedAt: this.lastUsedAt,
            createdAt: this.createdAt,
        };
    }

    public toRaw(): ClientAPIKeyOptionsRaw {
        return this.raw;
    }
}

export default ClientAPIKey;