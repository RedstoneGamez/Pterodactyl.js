import UserAPI from '../UserAPI';

import ClientAPIKeyModel, { ClientAPIKeyOptionsRaw, NewClientAPIKeyOptions, } from '../models/ClientAPIKey';

interface NewClientAPIKeyData {
    identifier: string;
    key: string;
}

class ClientAPIKey extends ClientAPIKeyModel {
    private api: UserAPI;

    constructor(api: UserAPI, data: ClientAPIKeyOptionsRaw) {
        super(data);
        this.api = api;
    }

    public static create(api: UserAPI, data: NewClientAPIKeyOptions): Promise<NewClientAPIKeyData> {
        return new Promise(async (resolve, reject) => {
            try {
                let options: any = { description: data.description };
                if (data.allowedIps) options['allowed_ips'] = data.allowedIps;

                let res = await api.call(`/client/account/api-keys`, 'POST', options);
                resolve({ identifier: res.data.attributes.identifier, key: res.data.meta.secret_token });
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getAll(api: UserAPI): Promise<ClientAPIKey[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/client/account/api-keys`);
                resolve(res.data.map((value: any) => new ClientAPIKey(api, value.attributes)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public delete(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/account/api-keys/${this.identifier}`, 'DELETE', null, true);
                resolve(res.statusCode === 204);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default ClientAPIKey;