import UserAPI from '../UserAPI';

import ClientAccountModel, { ClientAccountOptionsRaw, } from '../models/ClientAccount';
import ClientTwoFactor from '../controllers/ClientTwoFactor';

class ClientAccount extends ClientAccountModel {
    private api: UserAPI;
    public twoFactor: ClientTwoFactor;

    constructor(api: UserAPI, data: ClientAccountOptionsRaw) {
        super(data);
        this.api = api;
        this.twoFactor = new ClientTwoFactor(api);
    }

    public static get(api: UserAPI): Promise<ClientAccount> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/client/account`);
                resolve(new ClientAccount(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setEmail(email: string, currentPassword: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/account/email`, 'PUT', {
                    email,
                    password: currentPassword
                }, true);
                resolve(res.statusCode === 201);
            } catch (error) {
                reject(error);
            }
        });
    }

    public setPassword(currentPassword: string, newPassword: string, newPasswordConfirm: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/account/password`, 'PUT', {
                    current_password: currentPassword,
                    password: newPassword,
                    password_confirmation: newPasswordConfirm,
                }, true);
                resolve(res.statusCode === 204);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default ClientAccount;