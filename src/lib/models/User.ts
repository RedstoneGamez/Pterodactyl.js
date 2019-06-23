interface UserOptions {
    id: number;
    externalId: any;
    uuid: string;
    internalId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    language: string;
    rootAdmin: boolean;
    twoFactor: boolean;
    updatedAt: Date;
    createdAt: Date;
}

interface UserOptionsRaw {
    id: number;
    external_id: any;
    uuid: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
    root_admin: boolean;
    '2fa': boolean;
    updated_at: string;
    created_at: string;
}

class User implements UserOptions {
    public id: number;
    public externalId: any;
    public uuid: string;
    public internalId: string;
    public username: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public language: string;
    public rootAdmin: boolean;
    public twoFactor: boolean;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(data: UserOptionsRaw) {
        this.id = data.id;
        this.externalId = data.external_id;
        this.uuid = data.uuid;
        this.internalId = data.uuid;
        this.username = data.username;
        this.email = data.email;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.fullName = data.first_name + ' ' + data.last_name;
        this.language = data.language;
        this.rootAdmin = data.root_admin;
        this.twoFactor = data['2fa'];
        this.updatedAt = new Date(data.updated_at);
        this.createdAt = new Date(data.created_at);
    }

    public toJSON(): any {
        return {
            id: this.id,
            externalId: this.externalId,
            uuid: this.uuid,
            username: this.username,
            email: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.firstName + ' ' + this.lastName,
            language: this.language,
            rootAdmin: this.rootAdmin,
            twoFactor: this.twoFactor,
            updatedAt: this.updatedAt,
            createdAt: this.createdAt
        };
    }
}

export default User;