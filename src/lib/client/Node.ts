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
        this.pagination = new Pagination(paginationOptions);
    }

    public static create(api: AdminAPI, options: NewNodeOptions): Promise<Node> {
        return new Promise((resolve, reject) => {
            api.call(`/application/nodes`, 'POST', this.getCreateOptions(options)).then(res => resolve(new Node(api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public static getAll(api: AdminAPI, page: number = 1): Promise<Node[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/nodes?page=${page}`);
                resolve(res.data.data.map((value: any) => new Node(api, value.attributes, res.data.meta)));
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

    public setPublic(isPublic: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ public: isPublic })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setName(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ name })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setDescription(description: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ description })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });

    }

    public setLocation(locationId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ location_id: locationId })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setFQDN(fqdn: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ fqdn })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setScheme(scheme: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ scheme })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setBehindProxy(behindProxy: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ behind_proxy: behindProxy })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setMaintenanceMode(maintenanceMode: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ maintenance_mode: maintenanceMode })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setUploadSize(size: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ upload_size: size })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setMemory(memory: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ memory })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setMemoryOverAllocate(memoryOverAllocate: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ memory_overallocate: memoryOverAllocate })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setDisk(disk: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ disk })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setDiskOverAllocate(diskOverAllocate: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ disk_overallocate: diskOverAllocate })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setDaemonPort(port: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ daemon_listen: port })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setDaemonSftpPort(port: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ daemon_sftp: port })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public setDaemonBase(baseDirectory: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'PATCH', this.getRequestObject({ daemon_base: baseDirectory })).then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }

    public getAllocations(page?: number): Promise<NodeAllocation[]> {
        return NodeAllocation.getAll(this.api, this.id, page);
    }

    public createAllocations(ip: string, alias: string, ports: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}/allocations`, 'PATCH', { ip, alias, ports }).then(res => resolve()).catch(error => reject(error));
        });
    }

    public delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.id}`, 'DELETE').then(res => resolve()).catch(error => reject(error));
        });
    }
}

export default Node;