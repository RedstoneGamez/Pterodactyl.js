import PterodactylAPI from './index';
import ClientServerController from './controllers/ClientServers';

// import ClientServer from './client/ClientServer';
// import ClientAccount from './client/ClientAccount';

class UserClient extends PterodactylAPI {
    public servers: ClientServerController;

    constructor(url: string, apiKey: string, beta: boolean) {
        super(url, apiKey, beta);

        this.servers = new ClientServerController(this);

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

    public getAccount(): Promise<ClientAccount> {
        return ClientAccount.get(this);
    }
}

export default UserClient;