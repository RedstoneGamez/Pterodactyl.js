import UserClient from '../UserAPI';
import ClientAPIKey from '../client/ClientAPIKey';

class ClientAPIKeys {
    private api: UserClient;

    constructor(api: UserClient) {
        this.api = api;
    }

    public get() {
        return ClientAPIKey.getAll(this.api);
    }

    public create(description: string, allowedIps?: string[]) {
        return ClientAPIKey.create(this.api, { description, allowedIps });
    }
}

export default ClientAPIKeys;