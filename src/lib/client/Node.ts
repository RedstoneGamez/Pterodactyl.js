import AdminAPI from '../AdminAPI';

import NodeModel, { NodeOptionsRaw, NewNodeOptions } from '../models/Node';
import NodeAllocation from './NodeAllocation';
import Pagination, { PaginationOptionsRaw } from '../models/Pagination';

class Node extends NodeModel {
    private api: AdminAPI;
    public pagination?: Pagination;

    constructor(api: AdminAPI, data: NodeOptionsRaw, paginationOptions?: PaginationOptionsRaw) {
        super(data);
        this.api = api;
        if (paginationOptions) this.pagination = new Pagination(paginationOptions);
    }

    public static create(api: AdminAPI, options: NewNodeOptions): Promise<Node> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/nodes`, 'POST', this.getCreateOptions(options));
                resolve(new Node(api, res.data.attributes))
            } catch (error) {
                reject(error)
            }
        });
    }

    public static getAll(api: AdminAPI, page: number = 1): Promise<Node[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/nodes?page=${page}`);
                resolve(res.data.map((value: any) => new Node(api, value.attributes, res.pagination)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getById(api: AdminAPI, id: number): Promise<Node> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/nodes/${id}`);
                resolve(new Node(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    private static getCreateOptions(options: NewNodeOptions) {
        let opts: any = {
            name: options.name,
            description: options.description,
            location_id: options.locationId,
            public: options.public,
            fqdn: options.fqdn,
            scheme: options.scheme,
            behind_proxy: options.behindProxy,
            memory: options.memory,
            memory_overallocate: options.memoryOverAllocate,
            disk: options.disk,
            disk_overallocate: options.diskOverAllocate,
            daemon_base: options.daemonBase,
            daemon_listen: options.daemonPort,
            daemon_sftp: options.daemonSftpPort,
            maintenance_mode: options.maintenanceMode,
            upload_size: options.uploadSize,
        };

        return opts;
    }

    private getRequestObject(data: any) {
        let request = {
            name: this.name,
            location_id: this.locationId,
            fqdn: this.fqdn,
            scheme: this.scheme,
            memory: this.memory,
            memory_overallocate: this.memoryOverAllocate,
            disk: this.disk,
            disk_overallocate: this.diskOverAllocate,
            daemon_sftp: this.daemonSftp,
            daemon_listen: this.daemonListen,
        };

        return Object.assign(request, data);
    }

    public setPublic(isPublic: boolean): Promise<Node> {
        this.public = isPublic;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ public: isPublic }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setName(name: string): Promise<Node> {
        this.name = name;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ name }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDescription(description: string): Promise<Node> {
        this.description = description;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ description }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setLocation(locationId: number): Promise<Node> {
        this.locationId = locationId;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ location_id: locationId }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setFQDN(fqdn: string): Promise<Node> {
        this.fqdn = fqdn;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ fqdn }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setScheme(scheme: string): Promise<Node> {
        this.scheme = scheme;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ scheme }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setBehindProxy(behindProxy: string): Promise<Node> {
        this.behindProxy = behindProxy;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ behind_proxy: behindProxy }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setMaintenanceMode(maintenanceMode: boolean): Promise<Node> {
        this.maintenanceMode = maintenanceMode;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ maintenance_mode: maintenanceMode }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setUploadSize(size: number): Promise<Node> {
        this.uploadSize = size;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ upload_size: size }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setMemory(memory: number): Promise<Node> {
        this.memory = memory;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ memory }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setMemoryOverAllocate(memoryOverAllocate: number): Promise<Node> {
        this.memoryOverAllocate = memoryOverAllocate;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ memory_overallocate: memoryOverAllocate }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDisk(disk: number): Promise<Node> {
        this.disk = disk;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ disk }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDiskOverAllocate(diskOverAllocate: number): Promise<Node> {
        this.diskOverAllocate = diskOverAllocate;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ disk_overallocate: diskOverAllocate }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDaemonPort(port: number): Promise<Node> {
        this.daemonListen = port;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ daemon_listen: port }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDaemonSftpPort(port: number): Promise<Node> {
        this.daemonSftp = port;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ daemon_sftp: port }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDaemonBase(baseDirectory: string): Promise<Node> {
        this.daemonBase = baseDirectory;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ daemon_base: baseDirectory }));
                resolve(new Node(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public getAllocations(page?: number): Promise<NodeAllocation[]> {
        return NodeAllocation.getAll(this.api, this.id, page);
    }

    public createAllocations(ip: string, alias: string, ports: string[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/application/nodes/${this.id}/allocations`, 'POST', { ip, alias, ports });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public delete(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/application/nodes/${this.id}`, 'DELETE');
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default Node;