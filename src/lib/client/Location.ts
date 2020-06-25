import AdminAPI from '../AdminAPI';

import LocationModel, { LocationOptionsRaw, NewLocationOptions } from '../models/Location';
import Pagination, { PaginationOptionsRaw } from '../models/Pagination';

class Location extends LocationModel {
    private api: AdminAPI;
    public pagination?: Pagination;

    constructor(api: AdminAPI, data: LocationOptionsRaw, paginationOptions?: PaginationOptionsRaw) {
        super(data);
        this.api = api;
        if (paginationOptions) this.pagination = new Pagination(paginationOptions);
    }

    public static create(api: AdminAPI, options: NewLocationOptions): Promise<Location> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/locations`, 'POST', { short: options.shortCode, long: options.description });
                resolve(new Location(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getAll(api: AdminAPI, page: number = 1): Promise<Location[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/locations?page=${page}`);
                resolve(res.data.map((value: any) => new Location(api, value.attributes, res.pagination)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getById(api: AdminAPI, id: number): Promise<Location> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/locations/${id}`);
                resolve(new Location(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }

    private getRequestObject(data: any) {
        let request = {
            short: this.shortCode,
            long: this.description,
        };

        return Object.assign(request, data);
    }

    public setShortCode(shortCode: string): Promise<Location> {
        this.shortCode = shortCode;

        return new Promise((resolve, reject) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await this.api.call(`/application/locations`, 'POST', this.getRequestObject({ short: shortCode }));
                    resolve(new Location(this.api, res.data.attributes));
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public setDescription(description: string): Promise<Location> {
        this.description = description;

        return new Promise((resolve, reject) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await this.api.call(`/application/locations`, 'POST', this.getRequestObject({ long: description }));
                    resolve(new Location(this.api, res.data.attributes));
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public delete(): Promise<void> {
        return new Promise((resolve, reject) => {
            return new Promise((resolve, reject) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        await this.api.call(`/application/locations/${this.id}`, 'DELETE');
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        });
    }
}

export default Location;