interface ServerDatabaseOptions {
    id: number;
    server: number;
    host: number;
    database: string;
    username: string;
    remote: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ServerDatabaseOptionsRaw {
    id: number;
    server: number;
    host: number;
    database: string;
    username: string;
    remote: string;
    created_at: Date;
    updated_at: Date;
}

export { ServerDatabaseOptions, ServerDatabaseOptionsRaw };

class ServerDatabase implements ServerDatabaseOptions {
    public id: number;
    public server: number;
    public host: number;
    public database: string;
    public username: string;
    public remote: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(data: ServerDatabaseOptionsRaw) {
        this.id = data.id;
        this.server = data.server;
        this.host = data.host;
        this.database = data.database;
        this.username = data.username;
        this.remote = data.remote;
        this.updatedAt = new Date(data.updated_at);
        this.createdAt = new Date(data.created_at);
    }

    public toJSON(): any {
        return {
            id: this.id,
            server: this.server,
            host: this.host,
            database: this.database,
            username: this.username,
            remote: this.remote,
            updatedAt: this.updatedAt,
            createdAt: this.createdAt
        };
    }
}

export default ServerDatabase;