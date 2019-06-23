import UserAPI from './UserAPI';
import AdminAPI from './AdminAPI';

class PterodactylAPIBuilder {
    private url: string;
    private apiKey: string;

    constructor(url?: string, apiKey?: string) {
        this.url = url;
        this.apiKey = apiKey;
    }

    public setURL(url: string): void {
        this.url = url;
    }

    public setAPIKey(apiKey: string): void {
        this.apiKey = apiKey;
    }

    private build(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.url && this.apiKey) {
                resolve(true);
            } else {
                let error = new Error('Please provide both a URL and API Key to the Client Builder.');

                reject(error);
                throw error;
            }
        });
    }

    public asUser(): UserAPI {
        let func = async () => {
            let built = await this.build();

            if (typeof built === 'boolean') {
                return new UserAPI(this.url, this.apiKey);
            } else {
                return built;
            }
        };

        return this.asUserType(func());
    }

    private asUserType(value: any): UserAPI {
        return value;
    }

    public asAdmin(): AdminAPI {
        let func = async () => {
            let built = await this.build();

            if (typeof built === 'boolean') {
                return new AdminAPI(this.url, this.apiKey);
            } else {
                return built;
            }
        };

        return this.asAdminType(func());
    }

    private asAdminType(value: any): AdminAPI {
        return value;
    }
}

export default PterodactylAPIBuilder;