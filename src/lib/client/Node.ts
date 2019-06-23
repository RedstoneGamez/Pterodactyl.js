import PterodactylAPI from '../index';

import NodeModel from '../models/Node';

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

/**
 * @todo
 * 
 * - GET/POST/DELETE Allocations
 */

class Node {
    private api: PterodactylAPI;
    private nodeId: string;

    constructor(api: PterodactylAPI, nodeId: string) {
        this.api = api;
        this.nodeId = nodeId;
    }

    public getInfo(): Promise<NodeOptions> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.nodeId}`).then(res => resolve(new NodeModel(res.data.attributes))).catch(error => reject(error));
        });
    }

    // public setPublic(bool: boolean): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { public: bool }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setName(name: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { name }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setDescription(description: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { description }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setLocation(locationId: number): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { location_id: locationId }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setFQDN(fqdn: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { fqdn }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setScheme(scheme: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { scheme }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setBehindProxy(behindProxy: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { behind_proxy: behindProxy }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setMaintenanceMode(maintenanceMode: boolean): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { maintenance_mode: maintenanceMode }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setMemory(memory: number): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { memory }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setMemoryOverAllocate(memoryOverAllocate: number): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { memory_overallocate: memoryOverAllocate }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setDisk(disk: number): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { disk }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setDiskOverAllocate(diskOverAllocate: number): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { disk_overallocate: diskOverAllocate }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setDaemonListen(port: number): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { daemon_listen: port }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setDaemonSftp(port: number): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { daemon_sftp: port }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setDaemonBase(daemonBase: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/nodes/${this.nodeId}`, 'PATCH', { daemon_base: daemonBase }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    public delete(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nodes/${this.nodeId}`, 'DELETE').then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }
}

export default Node;