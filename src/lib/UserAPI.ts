import PterodactylAPI from './index';

import ClientServer from './client/ClientServer';

class UserClient extends PterodactylAPI {
    constructor(url: string, apiKey: string) {
        super(url, apiKey);

        this.testConnection()
            .catch(error => {
                throw error;
            });
    }

    public testConnection(): Promise<void> {
        let solutions: any = {
            0: 'Most likely hostname is configured wrong causing the request never get executed.',
            401: 'Authorization header either missing or not provided.',
            403: 'Double check the password (which should be the Application Key).',
            404: 'Result not found.',
            422: 'Validation error.',
            500: 'Panel errored, check panel logs.',
        };

        return new Promise((resolve, reject) => {
            this.call('/client').then(res => {
                let error = null;

                if (res.statusCode !== 200) {
                    let { statusCode } = res;
                    error = `Non success status code received: ${statusCode}.\nPossible sulutions: ${solutions[statusCode] !== undefined ? solutions[statusCode] : 'None.'}`
                }

                if (error !== null) return reject(new Error(error));
                resolve();
            }).catch(error => reject(error));
        });
    }

    public getClientServers(page?: number): Promise<ClientServer[]> {
        return ClientServer.getAll(this, page);
    }

    public getClientServer(serverId: string): Promise<ClientServer> {
        return ClientServer.getById(this, serverId);
    }
}

export default UserClient;