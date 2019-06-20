import PterodactylJS from './index';

import User from './client/User';
import Node from './client/Node';
import Location from './client/Location';
import Server from './client/Server';
import Nest from './client/Nest';
import Egg from './client/Egg';

import UserModel from './models/User';
import NodeModel from './models/Node';
import LocationModel from './models/Location';
import ServerModel from './models/Server';
import NestModel from './models/Nest';

// const packageJson = require('./package.json');

class AdminPterodactylAPI extends PterodactylJS {
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
            this.call('/application/servers').then(res => {
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

    public getUsers(): Promise<UserModel[]> {
        return new Promise((resolve, reject) => {
            this.call(`/application/users`).then(res => {
                let data: UserModel[] = [];

                res.data.data.forEach((element: any) => {
                    data.push(new UserModel(element.attributes));
                });

                resolve(data);
            }).catch(error => reject(error));
        });
    }

    public getNodes(): Promise<NodeModel[]> {
        return new Promise((resolve, reject) => {
            this.call(`/application/nodes`).then(res => {
                let data: NodeModel[] = [];

                res.data.data.forEach((element: any) => {
                    data.push(new NodeModel(element.attributes));
                });

                resolve(data);
            }).catch(error => reject(error));
        });
    }

    public getLocations(): Promise<LocationModel[]> {
        return new Promise((resolve, reject) => {
            this.call(`/application/locations`).then(res => {
                let data: LocationModel[] = [];

                res.data.data.forEach((element: any) => {
                    data.push(new LocationModel(element.attributes));
                });

                resolve(data);
            }).catch(error => reject(error));
        });
    }

    public getServers(): Promise<ServerModel[]> {
        return new Promise((resolve, reject) => {
            this.call(`/application/servers`).then(async res => {
                let data: ServerModel[] = [];

                await res.data.data.forEach(async (element: any) => {

                    await data.push(new ServerModel(element.attributes));
                });

                resolve(data);
            }).catch(error => reject(error));
        });
    }

    public getNests(): Promise<NestModel[]> {
        return new Promise((resolve, reject) => {
            this.call(`/application/nests`).then(res => {
                let data: NestModel[] = [];

                res.data.data.forEach((element: any) => {
                    data.push(new NestModel(element.attributes));
                });

                resolve(data);
            }).catch(error => reject(error));
        });
    }

    public getUser(userId: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(new User(this, userId));
        });
    }

    public getNode(nodeId: string): Promise<Node> {
        return new Promise((resolve, reject) => {
            resolve(new Node(this, nodeId));
        });
    }

    public getLocation(locationId: string): Promise<Location> {
        return new Promise((resolve, reject) => {
            resolve(new Location(this, locationId));
        });
    }

    public getServer(serverId: string): Promise<Server> {
        return new Promise((resolve, reject) => {
            resolve(new Server(this, serverId));
        });
    }

    public getNest(nestId: string): Promise<Nest> {
        return new Promise((resolve, reject) => {
            resolve(new Nest(this, nestId));
        });
    }

    public getEgg(nestId: string, eggId: string): Promise<Egg> {
        return new Promise((resolve, reject) => {
            resolve(new Egg(this, nestId, eggId));
        });
    }
}

export default AdminPterodactylAPI;