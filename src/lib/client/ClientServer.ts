import UserAPI from '../UserAPI';

import ClientServerModel, { ServerOptionsRaw, } from '../models/ClientServer';
import Pagination, { PaginationOptionsRaw, } from '../models/Pagination';

import WebSocket from '../utils/WebSocket';

interface UtilizationData {
    used: number;
    total: number;
}

interface WebSocketInfo {
    token: string;
    socket: string;
}

class ClientServer extends ClientServerModel {
    private api: UserAPI;
    public pagination?: Pagination;

    constructor(api: UserAPI, data: ServerOptionsRaw, paginationOptions?: PaginationOptionsRaw) {
        super(data);
        this.api = api;
        if (paginationOptions) this.pagination = new Pagination(paginationOptions);
    }

    public static getAll(api: UserAPI, page: number = 1): Promise<ClientServer[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/client?page=${page}`);
                resolve(res.data.map((value: any) => new ClientServer(api, value.attributes, res.pagination)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getById(api: UserAPI, id: string): Promise<ClientServer> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/client/servers/${id}`);
                resolve(new ClientServer(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public cpuUsage(): Promise<UtilizationData> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/servers/${this.identifier}/utilization`);
                resolve({ used: res.data.attributes.cpu.current, total: res.data.attributes.cpu.limit });
            } catch (error) {
                reject(error);
            }
        });
    }

    public diskUsage(): Promise<UtilizationData> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/servers/${this.identifier}/utilization`);
                resolve({ used: res.data.attributes.disk.current, total: res.data.attributes.disk.limit });
            } catch (error) {
                reject(error);
            }
        });
    }

    public memoryUsage(): Promise<UtilizationData> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/servers/${this.identifier}/utilization`);
                resolve({ used: res.data.attributes.memory.current, total: res.data.attributes.memory.limit });
            } catch (error) {
                reject(error);
            }
        });
    }

    public powerState(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/servers/${this.identifier}/utilization`);
                resolve(res.data.attributes.state);
            } catch (error) {
                reject(error);
            }
        });
    }

    public powerAction(signal: 'start' | 'stop' | 'restart' | 'kill'): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/client/servers/${this.identifier}/power`, 'POST', { signal });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public start(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/client/servers/${this.identifier}/power`, 'POST', { signal: 'start' });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public stop(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/client/servers/${this.identifier}/power`, 'POST', { signal: 'stop' });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public restart(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/client/servers/${this.identifier}/power`, 'POST', { signal: 'restart' });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public kill(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/client/servers/${this.identifier}/power`, 'POST', { signal: 'kill' });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public databases(): Promise<number> {
        return Promise.resolve(this.featureLimits.databases);
    }

    public allocations(): Promise<number> {
        return Promise.resolve(this.featureLimits.allocations);
    }

    public getDatabases(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/servers/${this.identifier}/databases`);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    public sendCommand(command: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/client/servers/${this.identifier}/command`, 'POST', { command });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public getWebsocketToken(): Promise<WebSocketInfo> {
        if (!this.api.beta) throw new Error('You did not set beta to true so this function cannot be used. It can only be used with panel versions 1.x and up.');

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/servers/${this.identifier}/websocket`);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    public websocket(): Promise<WebSocket> {
        if (!this.api.beta) throw new Error('You did not set beta to true so this function cannot be used. It can only be used with panel versions 1.x and up.');

        return new Promise(async (resolve, reject) => {
            const socket = new WebSocket();

            const updateToken = () => {
                this.getWebsocketToken()
                    .then(data => socket.setToken(data.token, true))
                    .catch(error => {
                        throw error;
                    });
            };

            this.getWebsocketToken()
                .then(data => {
                    console.log(data); // encountered HTTP/500 error while handling request error=websocket: request origin not allowed by Upgrader.CheckOrigin

                    socket.setToken(data.token).connect(this.api, data.socket);

                    socket.on('token expiring', () => updateToken());
                    socket.on('token expired', () => updateToken());

                    resolve(socket);
                })
                .catch(error => reject(error));
        });
    }
}

export default ClientServer;