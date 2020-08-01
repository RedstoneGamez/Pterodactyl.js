import UserClient from '../UserAPI';
import Account from '../client/ClientAccount';
import ClientAPIKeys from './ClientAPIKeys';

class ClientAccount {
    private api: UserClient;
    private apiKeys: ClientAPIKeys;

    constructor(api: UserClient) {
        this.api = api;
        this.apiKeys = new ClientAPIKeys(api);
    }

    public get() {
        return Account.get(this.api);
    }

    public setEmail(email: string, currentPassword: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                let account = await this.get();
                resolve(account.setEmail(email, currentPassword));
            } catch (error) {
                reject(error);
            }
        });
    }

    public setPassword(currentPassword: string, newPassword: string, newPasswordConfirm: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                let account = await this.get();
                resolve(account.setPassword(currentPassword, newPassword, newPasswordConfirm));
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default ClientAccount;