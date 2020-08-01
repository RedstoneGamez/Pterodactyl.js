interface NestOptions {
    id: number;
    uuid: string;
    internalId: string;
    author: string;
    name: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
}

interface NestOptionsRaw {
    id: number;
    uuid: string;
    author: string;
    name: string;
    description: string;
    updated_at: string;
    created_at: string;
}

export { NestOptions, NestOptionsRaw };

class Nest implements NestOptions {
    public id: number;
    public uuid: string;
    public internalId: string;
    public author: string;
    public name: string;
    public description: string;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(data: NestOptionsRaw) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.internalId = data.uuid;
        this.author = data.author;
        this.name = data.name;
        this.description = data.description;
        this.updatedAt = new Date(data.updated_at);
        this.createdAt = new Date(data.created_at);
    }

    public toJSON(): any {
        return {
            id: this.id,
            uuid: this.uuid,
            author: this.author,
            name: this.name,
            description: this.description,
            updatedAt: this.updatedAt,
            createdAt: this.createdAt
        };
    }
}

export default Nest;