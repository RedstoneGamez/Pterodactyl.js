import UserClient from '../UserAPI';
import ClientServer from '../client/ClientServer';

class ClientServers {
    private api: UserClient;

    constructor(api: UserClient) {
        this.api = api;
    }

    public get(page?: number) {
        return ClientServer.getAll(this.api, page);
    }

    public getAll(id: string) {
        return ClientServer.getById(this.api, id);
    }
}

export default ClientServers;