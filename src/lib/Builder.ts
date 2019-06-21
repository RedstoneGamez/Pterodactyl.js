// import axios from 'axios';

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

    public asUser(): Promise<UserAPI> {
        return new Promise((resolve, reject) => {
            this.build().then(result => {
                if (result) resolve(new UserAPI(this.url, this.apiKey));
            }).catch(error => reject(error));
        });
    }

    public asAdmin(): Promise<AdminAPI> {
        return new Promise((resolve, reject) => {
            this.build().then(result => {
                if (result) resolve(new AdminAPI(this.url, this.apiKey));
            }).catch(error => reject(error));
        });
    }
}

export default PterodactylAPIBuilder;