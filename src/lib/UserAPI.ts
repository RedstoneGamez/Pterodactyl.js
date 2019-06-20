import PterodactylJS from './index';

import ClientServer from './client/ClientServer';

import ClientServerModel from './models/ClientServer';

// const packageJson = require('./package.json');

class UserPterodactylAPI extends PterodactylJS {
    constructor(url: string, apiKey: string) {
        super(url, apiKey);
    }

    public testConnection(): Promise<any> {
        let solutions: any = {
            0: 'Most likely hostname is configured wrong causing the request never get executed.',
            401: 'Authorization header either missing or not provided.',
            403: 'Double check the password (which should be the Application Key).',
            404: 'Result not found.',
            422: 'Validation error.',
            500: 'Panel errored, check panel logs.',
        };

        return new Promise((resolve, reject) => {
            this.call('/client/servers').then(res => {
                let error = null;

                if (res.status !== 200) {
                    let statusCode = res.status;

                    error = `Non success status code received: ${statusCode}.\nPossible sulutions: ${solutions[statusCode] !== undefined ? solutions[statusCode] : 'None.'}`
                } else {
                    error = 'Authentication successful, you\'re good to go!';
                }

                resolve(error);
            }).catch(error => reject(error));
        });
    }

    public getClientServers(): Promise<ClientServerModel[]> {
        return new Promise((resolve, reject) => {
            this.call(`/application/users`).then(res => {
                let data: ClientServerModel[] = [];

                res.data.data.forEach((element: any) => {
                    data.push(new ClientServerModel(element.attributes));
                });

                resolve(data);
            }).catch(error => reject(error));
        });
    }

    public getClientServer(serverId: string): Promise<ClientServer> {
        return new Promise((resolve, reject) => {
            resolve(new ClientServer(this, serverId));
        });
    }
}

export default UserPterodactylAPI;