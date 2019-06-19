import PterodactylAPI from '../index';

import ServerModel from '../models/Server';
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

interface ServerContainer {
    startupCommand: string;
    image: string;
    installed: boolean;
    environment: any;
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

class Server {
    private api: PterodactylAPI;
    private serverId: string;
    private internalId: string;

    constructor(api: PterodactylAPI, serverId: string) {
        this.api = api;
        this.serverId = serverId;

        this.getInfo().then(info => {
            this.internalId = info.internalId;
        });
    }

    public getInfo(): Promise<ClientServerOptions> {
        return new Promise((resolve, reject) => {
            this.api.call(`/client/servers/${this.serverId}`).then(res => resolve(new ClientServerModel(res.data.attributes))).catch(error => reject(error));
        });
    }

    public getApplicationInfo(): Promise<ServerOptions> {
        return new Promise((resolve, reject) => {
            this.api.call(`/applcation/servers/${this.internalId}`).then(res => resolve(new ServerModel(res.data.attributes))).catch(error => reject(error));
        });
    }

    public suspend(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/suspend`, 'POST').then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public unsuspend(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/unsuspend`, 'POST').then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public updateServerDetails() {
        console.warn(`Warning: Function 'updateServerDetails' has not been completed yet.`);
    }

    public updateBuildConfig() {
        console.warn(`Warning: Function 'updateBuildConfig' has not been completed yet.`);
    }

    public updateStartupParameters() {
        console.warn(`Warning: Function 'updateStartupParameters' has not been completed yet.`);
    }

    public reinstall(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/reinstall`, 'POST').then(res => resolve(res.data)).catch(error => reject(error));
        });
    }
    public rebuild(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/rebuild`, 'POST').then(res => resolve(res.data)).catch(error => reject(error));
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

    public isSuspended(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/details`).then(res => resolve(res.data.attributes.suspended)).catch(error => reject(error));
        });
    }

    public setName(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/details`, 'POST', { name }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setDescription(description: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/details`, 'POST', { description }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setOwner(user: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/details`, 'POST', { user }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setMemory(memory: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'POST', { memory }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setCPU(cpu: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'POST', { cpu }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setDisk(disk: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'POST', { disk }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setIO(io: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'POST', { io }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setSwap(swap: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'POST', { swap }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setDatabaseAmount(amount: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'POST', { feature_limits: { databases: amount } }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public setAllocationAmount(amount: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'POST', { feature_limits: { allocations: amount } }).then(res => resolve(res.data)).catch(error => reject(error));
        });
    }

    public delete(force?: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            if (force) {
                this.api.call(`/application/servers/${this.internalId}/force`, 'DELETE').then(res => resolve(res.data)).catch(error => reject(error));
            } else {
                this.api.call(`/application/servers/${this.internalId}`, 'DELETE').then(res => resolve(res.data)).catch(error => reject(error));
            }
        });
    }
}

export default Server;