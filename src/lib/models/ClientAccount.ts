interface ClientAccountOptions {
    id: number;
    admin: boolean;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    language: string;
}

interface ClientAccountOptionsRaw {
    id: number;
    admin: boolean;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
}

export { ClientAccountOptions, ClientAccountOptionsRaw };

class ClientAccount implements ClientAccountOptions {
    raw: ClientAccountOptionsRaw;
    id: number;
    admin: boolean;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    language: string;

    constructor(data: ClientAccountOptionsRaw) {
        this.raw = data;
        this.id = data.id;
        this.admin = data.admin;
        this.username = data.username;
        this.email = data.email;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.language = data.language;
    }

    public toJSON(): any {
        return {
            id: this.id,
            admin: this.admin,
            username: this.username,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            language: this.language,
        };
    }

    public toRaw(): ClientAccountOptionsRaw {
        return this.raw;
    }
}

export default ClientAccount;