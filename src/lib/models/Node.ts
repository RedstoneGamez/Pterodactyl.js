interface NodeOptions {
    id: number;
    public: boolean;
    name: string;
    description: string;
    locationId: number;
    fqdn: string;
    scheme: string;
    behindProxy: string;
    maintenanceMode: string;
    memory: number;
    memoryOverAllocate: number;
    disk: number;
    diskOverAllocate: number;
    uploadSize: number;
    daemonListen: number;
    daemonSftp: number;
    daemonBase: string;
    updatedAt: Date;
    createdAt: Date;
}

interface NodeOptionsRaw {
    id: number;
    public: boolean;
    name: string;
    description: string;
    location_id: number;
    fqdn: string;
    scheme: string;
    behind_proxy: string;
    maintenance_mode: string;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: number;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_base: string;
    updated_at: string;
    created_at: string;
}

interface NewNodeOptions {
    name: string;
    description?: string;
    locationId: number;
    public?: boolean;
    fqdn: string;
    scheme: string;
    behindProxy: string;
    maintenanceMode: string;
    memory: number;
    memoryOverAllocate: number;
    disk: number;
    diskOverAllocate: number;
    uploadSize: number;
    daemonPort: number;
    daemonSftpPort: number;
    daemonBase: string;
}

export { NodeOptions, NodeOptionsRaw, NewNodeOptions };

class Node implements NodeOptions {
    public id: number;
    public public: boolean;
    public name: string;
    public description: string;
    public locationId: number;
    public fqdn: string;
    public scheme: string;
    public behindProxy: string;
    public maintenanceMode: string;
    public memory: number;
    public memoryOverAllocate: number;
    public disk: number;
    public diskOverAllocate: number;
    public uploadSize: number;
    public daemonListen: number;
    public daemonSftp: number;
    public daemonBase: string;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(data: NodeOptionsRaw) {
        this.id = data.id;
        this.public = data.public;
        this.name = data.name;
        this.description = data.description;
        this.locationId = data.location_id;
        this.fqdn = data.fqdn;
        this.scheme = data.scheme;
        this.behindProxy = data.behind_proxy;
        this.maintenanceMode = data.maintenance_mode;
        this.memory = data.memory;
        this.memoryOverAllocate = data.memory_overallocate;
        this.disk = data.disk;
        this.diskOverAllocate = data.disk_overallocate;
        this.uploadSize = data.upload_size;
        this.daemonListen = data.daemon_listen;
        this.daemonSftp = data.daemon_sftp;
        this.daemonBase = data.daemon_base;
        this.updatedAt = new Date(data.updated_at);
        this.createdAt = new Date(data.created_at);
    }

    public toJSON(): any {
        return {
            id: this.id,
            public: this.public,
            name: this.name,
            description: this.description,
            locationId: this.locationId,
            fqdn: this.fqdn,
            scheme: this.scheme,
            behindProxy: this.behindProxy,
            maintenanceMode: this.maintenanceMode,
            memory: this.memory,
            memoryOverAllocate: this.memoryOverAllocate,
            disk: this.disk,
            diskOverAllocate: this.diskOverAllocate,
            uploadSize: this.uploadSize,
            daemonListen: this.daemonListen,
            daemonSftp: this.daemonSftp,
            daemonBase: this.daemonBase,
            updatedAt: this.updatedAt,
            createdAt: this.createdAt
        };
    }
}

export default Node;