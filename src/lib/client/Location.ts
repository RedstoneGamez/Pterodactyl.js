import PterodactylAPI from '../index';

import LocationModel from '../models/Location';

interface LocationOptions {
    id: number;
    shortCode: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
}

/**
 * @todo
 * - DELETE
 * 
 */

class Location {
    private api: PterodactylAPI;
    private locationId: string;

    constructor(api: PterodactylAPI, locationId: string) {
        this.api = api;
        this.locationId = locationId;
    }

    public getInfo(): Promise<LocationOptions> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/locations/${this.locationId}`).then(res => resolve(new LocationModel(res.data.attributes))).catch(error => reject(error));
        });
    }

    // public setShortCode(shortCode: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/locations/${this.locationId}`, 'PATCH', { short: shortCode }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }

    // public setDescription(description: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.api.call(`/application/locations/${this.locationId}`, 'PATCH', { long: description }).then(res => resolve(res.data.attributes)).catch(error => reject(error));
    //     });
    // }
}

export default Location;