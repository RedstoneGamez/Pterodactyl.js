interface EggOptions {
    id: number;
    uuid: string;
    internalId: string;
    nest: number;
    author: string;
    description: string;
    dockerImage: string;
    config: any;
    startup: string;
    script: any;
    updatedAt: Date;
    createdAt: Date;
}

interface EggOptionsRaw {
    id: number;
    uuid: string;
    nest: number;
    author: string;
    description: string;
    docker_image: string;
    config: any;
    startup: string;
    script: any;
    updated_at: string;
    created_at: string;
}

export { EggOptions, EggOptionsRaw };

class Egg implements EggOptions {
    public id: number;
    public uuid: string;
    public internalId: string;
    public nest: number;
    public author: string;
    public description: string;
    public dockerImage: string;
    public config: any;
    public startup: string;
    public script: any;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(data: EggOptionsRaw) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.internalId = data.uuid;
        this.nest = data.nest;
        this.author = data.author;
        this.description = data.description;
        this.dockerImage = data.docker_image;
        this.config = data.config;
        this.startup = data.startup;
        this.script = data.script;
        this.updatedAt = new Date(data.updated_at);
        this.createdAt = new Date(data.created_at);
    }

    public toJSON(): any {
        return {
            id: this.id,
            uuid: this.uuid,
            nest: this.nest,
            author: this.author,
            description: this.description,
            dockerImage: this.dockerImage,
            config: this.config,
            startup: this.startup,
            script: this.script,
            updatedAt: this.updatedAt,
            createdAt: this.createdAt
        };
    }
}

export default Egg;