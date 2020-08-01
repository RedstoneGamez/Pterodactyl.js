import PterodactylAPI from './index';

import User from './client/User';
import Node from './client/Node';
import Location from './client/Location';
import Server from './client/Server';
import Nest from './client/Nest';
import Egg from './client/Egg';

import { NewServerOptions } from './models/Server';
import { NewUserOptions } from './models/User';
import { NewLocationOptions } from './models/Location';
import { NewNodeOptions } from './models/Node';

class AdminClient extends PterodactylAPI {
    constructor(url: string, apiKey: string, beta: boolean) {
        super(url, apiKey, beta);

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
            this.call('/application/servers').then(res => {
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

    public getUsers(page?: number): Promise<User[]> {
        return User.getAll(this, page);
    }

    public getNodes(page?: number): Promise<Node[]> {
        return Node.getAll(this, page);
    }

    public getLocations(page?: number): Promise<Location[]> {
        return Location.getAll(this, page);
    }

    public getServers(page?: number): Promise<Server[]> {
        return Server.getAll(this, page);
    }

    public getNests(page?: number): Promise<Nest[]> {
        return Nest.getAll(this, page);
    }

    public getUser(userId: number): Promise<User> {
        return User.getById(this, userId);
    }

    public getNode(nodeId: number): Promise<Node> {
        return Node.getById(this, nodeId);
    }

    public getLocation(locationId: number): Promise<Location> {
        return Location.getById(this, locationId);
    }

    public getServer(serverId: number): Promise<Server> {
        return Server.getById(this, serverId);
    }

    public getNest(nestId: number): Promise<Nest> {
        return Nest.getById(this, nestId);
    }

    public getEgg(nestId: number, eggId: number): Promise<Egg> {
        return Egg.getById(this, nestId, eggId);
    }

    public createServer(options: NewServerOptions): Promise<Server> {
        return Server.create(this, options);
    }

    public createUser(options: NewUserOptions): Promise<User> {
        return User.create(this, options);
    }

    public createLocation(options: NewLocationOptions): Promise<Location> {
        return Location.create(this, options);
    }

    public createNode(options: NewNodeOptions): Promise<Node> {
        return Node.create(this, options);
    }
}

export default AdminClient;