import fetch from 'node-fetch';

import { PaginationOptionsRaw } from './models/Pagination';

const pkg = require('../package.json');

interface ResponseData {
    statusCode: number,
    data: any,
    pagination: PaginationOptionsRaw
}

class PterodactylAPI {
    public url: string;
    public baseUrl: string;
    public apiKey: string;
    public beta: boolean;

    constructor(url: string, apiKey: string, beta: boolean) {
        this.url = url;
        this.apiKey = apiKey;
        this.beta = beta;

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

    public call(endpoint: string = '/', method: any = 'GET', data?: any, noBody: boolean = false): Promise<ResponseData> {
        let url = this.baseUrl + endpoint;

        console.log(url);
        

        return new Promise(async (resolve, reject) => {
            try {
                let options: any = {
                    method,
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                        'User-Agent': `Pterodactyl.js v${pkg.version}`,
                        'Accept': 'application/json'
                    },
                };

                if (data) options.body = JSON.stringify(data);

                let res = await fetch(url, options);

                let body: any = null;
                let resp: any = null;
                let pagination: any = null;

                if (!noBody) {
                    body = await res.json();
                    if (body.errors) return reject(this.handleError(body.errors, res.status));
                    resp = body.data ? body.data : body;
                    pagination = body.meta ? body.meta.pagination : null;
                }

                resolve({
                    statusCode: res.status,
                    data: resp,
                    pagination,
                });
            } catch (error) {
                reject(this.handleError(error));
            }
        });
    }

    public handleError(error: any, statusCode?: number) {
        if (typeof statusCode === 'number') {
            switch (statusCode) {
                case 400:
                    return { statusCode, message: 'The request sent was invalid. (400 Bad Request)' };
                case 401:
                    return { statusCode, message: 'Authorization header was invalidated by the panel. (401 Unauthorized)' };
                case 403:
                    return { statusCode, message: 'Your key is invalid or it doesn\'t have access to that endpoint. (403 Forbidden)' };
                case 404:
                    return { statusCode, message: 'The endpoint requested could not be found. (404 Not Found)' };
                case 405:
                    return { statusCode, message: 'The method used was invalid for this endpoint. (405 Method Not Allowed)' };
                case 406:
                    return { statusCode, message: 'The requested data was a format that isn\'t json. (406 Not Acceptable)' };
                case 410:
                    return { statusCode, message: 'The requested data was removed from the server. (410 Gone)' };
                case 412:
                    return { statusCode, message: 'Some data is missing from the request. (412 Precondition Failed)' };
                case 418:
                    return { statusCode, message: '(418 I\'m a teapot)' };
                case 429:
                    return { statusCode, message: 'You have reached the rate limit! Slow down. (429 Too Many Requests)' };
                case 500:
                    return { statusCode, message: 'An error occurred on the server. (500 Internal Server Error)' };
                case 503:
                    return { statusCode, message: 'The server is temporarily offline for maintenance. Please try again later. (503 Service Unavailable)' };
            }
        }

        if (typeof error.push === 'function') {
            let errors: any[] = error;

            if (errors.length < 1) return error;

            if (error.length < 2) {
                let err = errors[0];
                if (err.code === 'required') {
                    return { message: 'A field was not provided in the request that is required.', field: err.source.field, detail: err.detail, };
                }
            } else {
                return errors;
            }
        }

        if (error.code === 'ENOTFOUND') {
            return { message: 'A connection could not be made to the server through the URL provided.', code: 'ENOTFOUND' };
        }

        return error;
    }
}

export default PterodactylAPI;