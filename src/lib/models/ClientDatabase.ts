interface ClientDatabaseOptions {
    id: string;
    host: {
        address: string;
        port: number;
    };
    name: string;
    username: string;
    connectionsFrom: string;
    maxConnections: string;
}

interface ClientDatabaseOptionsRaw {
    id: string;
    host: {
        address: string;
        port: number;
    };
    name: string;
    username: string;
    connections_from: string;
    max_connections: string;
}

export { ClientDatabaseOptions, ClientDatabaseOptionsRaw };

class ClientDatabase implements ClientDatabaseOptions {
    raw: ClientDatabaseOptionsRaw;
    id: string;
    host: { address: string; port: number; };
    name: string;
    username: string;
    connectionsFrom: string;
    maxConnections: string;

    constructor(data: ClientDatabaseOptionsRaw) {
        this.id = data.id;
        this.host = {
            address: data.host.address,
            port: data.host.port
        };
        this.name = data.name;
        this.username = data.username;
        this.connectionsFrom = data.connections_from;
        this.maxConnections = data.max_connections;
    }

    public toJSON(): any {
        return {
            id: this.id,
            host: this.host,
            name: this.name,
            username: this.username,
            connectionsFrom: this.connectionsFrom,
            maxConnections: this.maxConnections
        };
    }

    public toRaw(): ClientDatabaseOptionsRaw {
        return this.raw;
    }
}

export default ClientDatabase;