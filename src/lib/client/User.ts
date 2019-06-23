import AdminAPI from '../AdminAPI';

import UserModel from '../models/User';

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

class User {
    private api: AdminAPI;
    private userId: any;
    private internalId: string;
    private username: string;

    constructor(api: AdminAPI, userId: any) {
        this.api = api;
        this.userId = userId;

        if (!/\d/g.test(this.userId)) {
            this.username = this.userId;
            this.api.getUsers().then(users => {
                let user = users.filter(user => user.username === this.username);

                this.userId = user[0].id;
                this.internalId = user[0].internalId;
            }).catch(error => { throw error; });
        } else {
            this.getInfo().then(info => {
                this.username = info.username;
            }).catch(error => { throw error; });
        }
    }

    public getInfo(): Promise<UserOptions> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.userId}`).then(res => resolve(new UserModel(res.data.attributes))).catch(error => reject(error));
        });
    }

    // public setUsername(username: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/users/${this.userId}`, 'PATCH', { username }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setEmail(email: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/users/${this.userId}`, 'PATCH', { email }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setFirstName(firstName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/users/${this.userId}`, 'PATCH', { first_name: firstName }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setLastName(lastName: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/users/${this.userId}`, 'PATCH', { last_name: lastName }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    public delete(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/users/${this.userId}`, 'DELETE').then(res => resolve(res.data.attributes)).catch(error => reject(error));
        });
    }
}

export default User;