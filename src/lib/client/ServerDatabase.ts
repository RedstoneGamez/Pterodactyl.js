import AdminAPI from '../AdminAPI';

import ServerDatabaseModel, { ServerDatabaseOptionsRaw } from '../models/ServerDatabase';

class ServerDatabase extends ServerDatabaseModel {
    private api: AdminAPI;

    constructor(api: AdminAPI, data: ServerDatabaseOptionsRaw) {
        super(data);
        this.api = api;
    }

    public static getAll(api: AdminAPI, server: number): Promise<ServerDatabase[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/servers/${server}/databases`);
                resolve(res.data.map((value: any) => new ServerDatabase(api, value.attributes)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getById(api: AdminAPI, server: number, id: number): Promise<ServerDatabase> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/servers/${server}/databases/${id}`);
                resolve(new ServerDatabase(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public resetPassword(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.call(`/application/servers/${this.server}/databases/${this.id}/reset-password`, 'POST');
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            return new Promise(async (resolve, reject) => {
                try {
                    await this.api.call(`/application/servers/${this.server}/databases/${this.id}`, 'DELETE');
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}

export default ServerDatabase;