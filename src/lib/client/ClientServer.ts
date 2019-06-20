import PterodactylAPI from '../index';

import ClientServerModel from '../models/ClientServer';

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

interface ClientServerOptions {
    serverOwner: boolean;
    identifier: string;
    internalId: string;
    uuid: string;
    name: string;
    description: string;
    limits: ServerLimits;
    featureLimits: ServerFeatureLimits;
}

/**
 * @todo
 * - Update Server Details //
 * - Update Startup Config //
 * 
 * - GET Databases
 * - GET Database
 * - DELETE Database
 * 
 */

class ClientServer {
    private api: PterodactylAPI;
    private serverId: string;

    constructor(api: PterodactylAPI, serverId: string) {
        this.api = api;
        this.serverId = serverId;
    }

    public getInfo(): Promise<ClientServerOptions> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}`).then(res => resolve(new ClientServerModel(res.data.attributes))).catch(error => reject(error));
        });
    }

    public cpuUsage(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/utilization`).then(res => resolve({ used: res.data.attributes.cpu.current, total: res.data.attributes.cpu.limit })).catch(error => reject(error));
        });
    }

    public diskUsage(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/utilization`).then(res => resolve({ used: res.data.attributes.disk.current, total: res.data.attributes.disk.limit })).catch(error => reject(error));
        });
    }

    public memoryUsage(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/utilization`).then(res => resolve({ used: res.data.attributes.memory.current, total: res.data.attributes.memory.limit })).catch(error => reject(error));
        });
    }

    public powerState(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/utilization`).then(res => resolve(res.data.attributes.state)).catch(error => reject(error));
        });
    }

    public start(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/power`, 'POST', { signal: 'start' }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public stop(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/power`, 'POST', { signal: 'stop' }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public restart(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/power`, 'POST', { signal: 'restart' }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public kill(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/power`, 'POST', { signal: 'kill' }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public databaseAmount(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.getInfo().then(info => resolve(info.featureLimits.databases)).catch(error => reject(error));
        });
    }

    public allocationsAmount(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.getInfo().then(info => resolve(info.featureLimits.allocations)).catch(error => reject(error));
        });
    }

    public sendCommand(command: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}/command`, 'POST', { command }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }
}

export default ClientServer;