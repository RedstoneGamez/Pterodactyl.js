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

    private build(): boolean | Error {
        if (this.url && this.apiKey) {
            return true;
        } else {
            let error = new Error('Please provide both a URL and API Key to the Client Builder.');

            return error;
        }
    }

    public asUser(): UserAPI {
        let built = this.build();

        if (typeof built === 'boolean') {
            return new UserAPI(this.url, this.apiKey);
        } else {
            throw built;
        }
    }

    public asAdmin(): AdminAPI {
        let built = this.build();

        if (typeof built === 'boolean') {
            return new AdminAPI(this.url, this.apiKey);
        } else {
            throw built;
        }
    }
}

export default PterodactylAPIBuilder;