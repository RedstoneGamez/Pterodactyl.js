import AdminAPI from '../AdminAPI';

import UserModel, { UserOptionsRaw, NewUserOptions } from '../models/User';
import Pagination, { PaginationOptionsRaw } from '../models/Pagination';

class User extends UserModel {
    private api: AdminAPI;
    public pagination?: Pagination;

    constructor(api: AdminAPI, data: UserOptionsRaw, paginationOptions?: PaginationOptionsRaw) {
        super(data);
        this.api = api;
        if (paginationOptions) this.pagination = new Pagination(paginationOptions);
    }

    public static create(api: AdminAPI, options: NewUserOptions): Promise<User> {
        return new Promise((resolve, reject) => {
            api.call(`/application/users`, 'POST', this.getCreateOptions(options)).then(res => resolve(new User(api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public static getAll(api: AdminAPI, page: number = 1): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/users?page=${page}`);
                resolve(res.data.data.map((value: any) => new User(api, value.attributes, res.data.meta)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getById(api: AdminAPI, id: number): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/users/${id}`);
                resolve(new User(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getByExternalId(api: AdminAPI, externalId: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/users/external/${externalId}`);
                resolve(new User(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    private static getCreateOptions(options: NewUserOptions) {
        let opts: any = {
            external_id: options.externalId,
            username: options.username,
            email: options.email,
            first_name: options.firstName,
            last_name: options.lastName,
            password: options.password,
            root_admin: options.admin,
            language: options.language,
        };

        return opts;
    }


    private getRequestObject(data: any) {
        let request = {
            username: this.username,
            email: this.email,
            first_name: this.firstName,
            last_name: this.lastName,
        };

        return Object.assign(request, data);
    }

    // private userId: any;
    // private internalId: string;
    // private username: string;

    // constructor(api: AdminAPI, userId: any) {
    //     this.api = api;
    //     this.userId = userId;

    //     if (!/\d/g.test(this.userId)) {
    //         this.username = this.userId;
    //         this.api.getUsers().then(users => {
    //             let user = users.filter(user => user.username === this.username);

    //             this.userId = user[0].id;
    //             this.internalId = user[0].internalId;
    //         }).catch(error => { throw error; });
    //     } else {
    //         this.getInfo().then(info => {
    //             this.username = info.username;
    //         }).catch(error => { throw error; });
    //     }
    // }

    // public getInfo(): Promise<UserOptions> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/users/${this.userId}`).then(res => resolve(new UserModel(res.data.attributes))).catch(error => reject(error));
    //     });
    // }

    public setExternalId(externalId: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'PATCH', this.getRequestObject({ external_id: externalId })).then(res => resolve(new User(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setUsername(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'PATCH', this.getRequestObject({ username })).then(res => resolve(new User(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'PATCH', this.getRequestObject({ email })).then(res => resolve(new User(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setFirstName(firstName: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'PATCH', this.getRequestObject({ first_name: firstName })).then(res => resolve(new User(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setLastName(lastName: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'PATCH', this.getRequestObject({ last_name: lastName })).then(res => resolve(new User(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setPassword(password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'PATCH', this.getRequestObject({ password })).then(res => resolve(new User(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setAdmin(admin: boolean): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'PATCH', this.getRequestObject({ root_admin: admin })).then(res => resolve(new User(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public setLanguage(language: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'PATCH', this.getRequestObject({ language })).then(res => resolve(new User(this.api, res.data.attributes))).catch(error => reject(error));
        });
    }

    public delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.id}`, 'DELETE').then(res => resolve()).catch(error => reject(error));
        });
    }
}

export default User;