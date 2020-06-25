import UserAPI from './UserAPI';
import AdminAPI from './AdminAPI';

class ClientBuilder {
    private url: string;
    private apiKey: string;

    constructor(url?: string, apiKey?: string) {
        this.url = url;
        this.apiKey = apiKey;
    }

    public setURL(url: string): ClientBuilder {
        this.url = url;
        return this;
    }

    public setAPIKey(apiKey: string): ClientBuilder {
        this.apiKey = apiKey;
        return this;
    }

    private build(): boolean {
        if (this.url && this.apiKey) {
            return true;
        } else {
            throw new Error('Please provide both a URL and API Key to the client builder.');
        }
    }

    public asUser(): UserAPI {
        try {
            this.build();
            return new UserAPI(this.url, this.apiKey);
        } catch (error) {
            throw error;
        }
    }

    public asAdmin(): AdminAPI {
        try {
            this.build();
            return new AdminAPI(this.url, this.apiKey);
        } catch (error) {
            throw error;
        }
    }
}

export default ClientBuilder;