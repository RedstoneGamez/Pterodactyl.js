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
                resolve(res.data.data.map((value: any) => new ServerDatabase(api, value.attributes)));
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

    public resetPassword(): Promise<ServerDatabase> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.server}/databases/${this.id}/reset-password`, 'POST').then(res => resolve(new ServerDatabase(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/servers/${this.server}/databases/${this.id}`, 'DELETE').then(res => resolve()).catch(error => reject(error));
        });
    }
}

export default ServerDatabase;