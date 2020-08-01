import UserClient from './UserAPI';
import AdminClient from './AdminAPI';

class ClientBuilder {
    private url: string;
    private apiKey: string;
    private beta: boolean;

    constructor(url?: string, apiKey?: string, beta: boolean = false) {
        this.url = url;
        this.apiKey = apiKey;
        this.beta = beta;
    }

    public setURL(url: string): ClientBuilder {
        this.url = url;
        return this;
    }

    public setAPIKey(apiKey: string): ClientBuilder {
        this.apiKey = apiKey;
        return this;
    }

    public setBeta(beta: boolean): ClientBuilder {
        this.beta = beta;
        return this;
    }

    private build(): boolean {
        if (this.url && this.apiKey) {
            return true;
        } else {
            throw new Error('Please provide both a URL and API Key to the client builder.');
        }
    }

    public asUser(): UserClient {
        try {
            this.build();
            return new UserClient(this.url, this.apiKey, this.beta);
        } catch (error) {
            throw error;
        }
    }

    public asAdmin(): AdminClient {
        try {
            this.build();
            return new AdminClient(this.url, this.apiKey, this.beta);
        } catch (error) {
            throw error;
        }
    }
}

export default ClientBuilder;