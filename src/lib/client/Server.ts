import AdminAPI from '../AdminAPI';

import ServerModel, { ServerOptionsRaw, ServerDetailsRequestOptions, ServerBuildConfigRequestOptions, ServerStartupRequestOptions, NewServerOptions } from '../models/Server';
import ServerDatabase from './ServerDatabase';

// interface ServerLimits {
//     memory: number;
//     swap: number;
//     disk: number;
//     io: number;
//     cpu: number;
// }

// interface ServerFeatureLimits {
//     databases: number;
//     allocations: number;
// }

// interface ServerContainer {
//     startupCommand: string;
//     image: string;
//     installed: boolean;
//     environment: any;
// }

// interface ServerOptions {
//     id: number;
//     externalId: any;
//     internalId: string;
//     uuid: string;
//     identifier: string;
//     name: string;
//     description: string;
//     suspended: boolean;
//     limits: ServerLimits;
//     featureLimits: ServerFeatureLimits;
//     user: number;
//     node: number;
//     allocation: number;
//     nest: number;
//     egg: number;
//     pack: any;
//     container: ServerContainer;
//     updatedAt: Date;
//     createdAt: Date;
// }

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

class Server extends ServerModel {
    private api: AdminAPI;

    constructor(api: AdminAPI, data: ServerOptionsRaw) {
        super(data);
        this.api = api;
    }

    public static create(api: AdminAPI, options: NewServerOptions): Promise<Server> {
        return new Promise((resolve, reject) => {
            api.call(`/application/servers`, 'POST', this.getCreateOptions(options)).then(res => resolve(new Server(api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public static getAll(api: AdminAPI): Promise<Server[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/servers`);
                resolve(res.data.data.map((value: any) => new Server(api, value.attributes)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getById(api: AdminAPI, id: number): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/servers/${id}`);
                resolve(new Server(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getByExternalId(api: AdminAPI, externalId: string): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/servers/external/${externalId}`);
                resolve(new Server(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    private static getCreateOptions(options: NewServerOptions) {
        let opts: any = {
            external_id: options.externalId,
            name: options.name,
            user: options.user,
            description: options.description,
            egg: options.egg,
            pack: options.pack,
            docker_image: options.image,
            startup: options.startup,
            limits: options.limits,
            feature_limits: options.featureLimits,
            environment: options.environment,
            start_on_completion: options.startWhenInstalled,
            skip_scripts: options.skipScripts,
            oom_disabled: options.outOfMemoryKiller,
        };

        if (options.allocation) opts.allocation = options.allocation;
        if (options.deploy) opts.deploy = {
            locations: options.deploy.locations,
            dedicated_ip: options.deploy.dedicatedIp,
            port_range: options.deploy.portRange,
        };

        return opts;
    }

    private getDetailsRequestObject(data: any) {
        let request = {
            name: this.name,
            user: this.user,
        };

        return Object.assign(request, data);
    }

    private getBuildRequestObject(data: any) {
        let request: any = {
            allocation: this.allocation,
            limits: this.limits,
            feature_limits: this.featureLimits,
        };

        return Object.assign(request, data);
    }

    private getStartupRequestObject(data: any) {
        let request: any = {
            startup: this.container.startupCommand,
            egg: this.egg,
            image: this.container.image,
        };

        return Object.assign(request, data);
    }

    public updateDetails(options: ServerDetailsRequestOptions): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/details`, 'PATCH', this.getDetailsRequestObject(options)).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public updateBuild(options: ServerBuildConfigRequestOptions): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'PATCH', this.getBuildRequestObject(options)).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public updateStartup(options: ServerStartupRequestOptions): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/startup`, 'PATCH', this.getStartupRequestObject(options)).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
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

    public isSuspended(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(this.suspended);
        });
    }

    public setName(name: string): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/details`, 'PATCH', this.getDetailsRequestObject({ name })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setDescription(description: string): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/details`, 'PATCH', this.getDetailsRequestObject({ description })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setUser(user: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/details`, 'PATCH', this.getDetailsRequestObject({ user })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setMemory(memory: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'PATCH', this.getBuildRequestObject({ limits: { memory } })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setCPU(cpu: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'PATCH', this.getBuildRequestObject({ limits: { cpu } })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setDisk(disk: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'PATCH', this.getBuildRequestObject({ limits: { disk } })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setIO(io: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'PATCH', this.getBuildRequestObject({ limits: { io } })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });

    }

    public setSwap(swap: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'PATCH', this.getBuildRequestObject({ limits: { swap } })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });

    }

    public setDatabaseAmount(amount: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'PATCH', this.getBuildRequestObject({ feature_limits: { databases: amount } })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setAllocationAmount(amount: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/build`, 'PATCH', this.getBuildRequestObject({ feature_limits: { allocations: amount } })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setStartupCommand(command: string): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/startup`, 'PATCH', this.getStartupRequestObject({ startup: command })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setEgg(egg: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/startup`, 'PATCH', this.getStartupRequestObject({ egg })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setPack(pack: number): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/startup`, 'PATCH', this.getStartupRequestObject({ pack })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setImage(image: string): Promise<Server> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/startup`, 'PATCH', this.getStartupRequestObject({ image })).then(res => resolve(new Server(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public createDatabase(name: string, remote: string, host: number): Promise<ServerDatabase> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}/startup`, 'PATCH', { database: name, remote, host }).then(res => resolve(new ServerDatabase(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public databases(): Promise<ServerDatabase[]> {
        return ServerDatabase.getAll(this.api, this.id);
    }

    public getDatabase(database: number): Promise<ServerDatabase> {
        return ServerDatabase.getById(this.api, this.id, database);
    }

    public delete(force?: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.internalId}${force ? '/force' : ''}`, 'DELETE').then(res => resolve()).catch(error => reject(error));
        });
    }
}

export default Server;