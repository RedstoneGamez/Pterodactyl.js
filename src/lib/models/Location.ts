interface LocationOptions {
    id: number;
    shortCode: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
}

interface LocationOptionsRaw {
    id: number;
    short: string;
    long: string;
    updated_at: string;
    created_at: string;
}

class Location implements LocationOptions {
    public id: number;
    public shortCode: string;
    public description: string;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(data: LocationOptionsRaw) {
        this.id = data.id;
        this.shortCode = data.short;
        this.description = data.long;
        this.updatedAt = new Date(data.updated_at);
        this.createdAt = new Date(data.created_at);
    }

    public toJSON(): any {
        return {
            id: this.id,
            shortCode: this.shortCode,
            description: this.description,
            updatedAt: this.updatedAt,
            createdAt: this.createdAt
        };
    }
}

export default Location;