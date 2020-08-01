import UserAPI from '../UserAPI';

class ClientTwoFactor {
    private api: UserAPI;

    constructor(api: UserAPI) {
        this.api = api;
    }

    public getQR(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/account/two-factor`);
                resolve(res.data.image_url_data);
            } catch (error) {
                reject(error);
            }
        });
    }

    public enable(code: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/account/two-factor`, 'POST', {
                    code
                }, true);
                resolve(res.statusCode === 204);
            } catch (error) {
                reject(error);
            }
        });
    }

    public disable(currentPassword: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.api.call(`/client/account/two-factor`, 'DELETE', {
                    password: currentPassword
                }, true);
                resolve(res.statusCode === 204);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default ClientTwoFactor;