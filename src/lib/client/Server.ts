import AdminAPI from '../AdminAPI';

import ServerModel, { ServerOptionsRaw, ServerDetailsRequestOptions, ServerBuildConfigRequestOptions, ServerStartupRequestOptions, NewServerOptions } from '../models/Server';
import ServerDatabase from './ServerDatabase';
import Pagination, { PaginationOptionsRaw } from '../models/Pagination';

class Server extends ServerModel {
    private api: AdminAPI;
    public pagination?: Pagination;

    constructor(api: AdminAPI, data: ServerOptionsRaw, paginationOptions?: PaginationOptionsRaw) {
        super(data);
        this.api = api;
        if (paginationOptions) this.pagination = new Pagination(paginationOptions);
    }

    public static create(api: AdminAPI, options: NewServerOptions): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/servers`, 'POST', this.getCreateOptions(options));
                resolve(new Server(api, res.data.attributes))
            } catch (error) {
                reject(error)
            }
        });
    }

    public static getAll(api: AdminAPI, page: number = 1): Promise<Server[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/servers?page=${page}`);
                resolve(res.data.map((value: any) => new Server(api, value.attributes, res.pagination)));
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
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/details`, 'PATCH', this.getDetailsRequestObject(options));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public updateBuild(options: ServerBuildConfigRequestOptions): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/build`, 'PATCH', this.getBuildRequestObject(options));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public updateStartup(options: ServerStartupRequestOptions): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/startup`, 'PATCH', this.getStartupRequestObject(options));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public suspend(): Promise<void> {
        this.suspended = true;

        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/application/servers/${this.id}/suspend`, 'POST', null, true);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public unsuspend(): Promise<void> {
        this.suspended = false;

        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/application/servers/${this.id}/unsuspend`, 'POST', null, true);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public reinstall(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/application/servers/${this.id}/reinstall`, 'POST');
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
    public rebuild(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/application/servers/${this.id}/rebuild`, 'POST');
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public isSuspended(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(this.suspended);
        });
    }

    public setName(name: string): Promise<Server> {
        this.name = name;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/details`, 'PATCH', this.getDetailsRequestObject({ name }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDescription(description: string): Promise<Server> {
        this.description = description;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/details`, 'PATCH', this.getDetailsRequestObject({ description }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setUser(user: number): Promise<Server> {
        this.user = user;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/details`, 'PATCH', this.getDetailsRequestObject({ user }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });

    }

    public setMemory(memory: number): Promise<Server> {
        this.limits.memory = memory;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/details`, 'PATCH', this.getDetailsRequestObject({ limits: { memory } }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });

    }

    public setCPU(cpu: number): Promise<Server> {
        this.limits.cpu = cpu;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/build`, 'PATCH', this.getBuildRequestObject({ limits: { cpu } }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDisk(disk: number): Promise<Server> {
        this.limits.disk = disk;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/build`, 'PATCH', this.getBuildRequestObject({ limits: { disk } }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setIO(io: number): Promise<Server> {
        this.limits.io = io;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/build`, 'PATCH', this.getBuildRequestObject({ limits: { io } }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setSwap(swap: number): Promise<Server> {
        this.limits.swap = swap;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/build`, 'PATCH', this.getBuildRequestObject({ limits: { swap } }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setDatabaseAmount(amount: number): Promise<Server> {
        this.featureLimits.databases = amount;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/build`, 'PATCH', this.getBuildRequestObject({ feature_limits: { databases: amount } }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setAllocationAmount(amount: number): Promise<Server> {
        this.featureLimits.allocations = amount;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/build`, 'PATCH', this.getBuildRequestObject({ feature_limits: { allocations: amount } }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setStartupCommand(command: string): Promise<Server> {
        this.container.startupCommand = command;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/startup`, 'PATCH', this.getStartupRequestObject({ startup: command }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setEgg(egg: number): Promise<Server> {
        this.egg = egg;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/startup`, 'PATCH', this.getStartupRequestObject({ egg }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setPack(pack: number): Promise<Server> {
        this.pack = pack;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/startup`, 'PATCH', this.getStartupRequestObject({ pack }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });

    }

    public setImage(image: string): Promise<Server> {
        this.container.image = image;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/startup`, 'PATCH', this.getStartupRequestObject({ image }));
                resolve(new Server(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public createDatabase(name: string, remote: string, host: number): Promise<ServerDatabase> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/application/servers/${this.id}/databases`, 'POST', { database: name, remote, host });
                resolve(new ServerDatabase(this.api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public databases(): Promise<ServerDatabase[]> {
        return ServerDatabase.getAll(this.api, this.id);
    }

    public getDatabase(database: number): Promise<ServerDatabase> {
        return ServerDatabase.getById(this.api, this.id, database);
    }

    public delete(force?: boolean): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/application/servers/${this.id}${force ? '/force' : ''}`, 'DELETE');
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default Server;