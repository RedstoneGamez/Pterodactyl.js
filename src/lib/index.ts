import axios, { AxiosResponse } from 'axios';

const packageJson = require('../package.json');

interface PterodactylAPIOptions {
    url: string;
    baseUrl: string;
    apiKey: string;
}

class PterodactylAPI implements PterodactylAPIOptions {
    public url: string;
    public baseUrl: string;
    public apiKey: string;

    constructor(url: string, apiKey: string) {
        this.url = url;
        this.apiKey = apiKey;

        this.baseUrl = this.getHostname();
    }

    private getHostname(): string {
        let url;
        let ip = false;

        if (/(?!127\.0{1,3}\.0{1,3}\.0{0,2}$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g.test(this.url)) {
            ip = true;

            if (/^http(s|):\/\//g.test(this.url)) {
                url = this.url;
            } else {
                url = `https://${this.url}`;
            }
        } else {
            if (/^http(s|):\/\//g.test(this.url)) {
                url = this.url;
            } else {
                url = `https://${this.url}`;
            }
        }

        if (/\/$/g.test(url)) {
            return url + 'api';
        } else {
            return url + '/api';
        }
    }

    public call(endpoint: string = '/', method: any = 'GET', data: any = {}): Promise<AxiosResponse<any>> {
        let url = this.baseUrl + endpoint;

        return new Promise((resolve, reject) => {
            axios.request({
                url,
                method,
                data: JSON.stringify(data),
                maxRedirects: 5,
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': `Pterodactyl.js v${packageJson.version}`
                }
            }).then(response => resolve(response)).catch(error => reject(this.handleError(error.response.data)));
        });
    }

    private handleError(error: any): any {
        if (error.code === 'ENOTFOUND') {
            console.log('Panel URL Not Found!');
            return error;
        }

        // console.log(error);
        return error;

    }
}

export default PterodactylAPI;