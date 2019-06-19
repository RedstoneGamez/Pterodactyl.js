import PterodactylAPI from '../index';

import Egg from './Egg';

import NestModel from '../models/Nest';
import EggModel from '../models/Egg';

interface NestOptions {
    id: number;
    uuid: string;
    internalId: string;
    author: string;
    name: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
}

class Nest {
    private api: PterodactylAPI;
    private nestId: string;

    constructor(api: PterodactylAPI, nestId: string) {
        this.api = api;
        this.nestId = nestId;
    }

    public getInfo(): Promise<NestOptions> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nests/${this.nestId}`).then(res => resolve(new NestModel(res.data.attributes))).catch(error => reject(error));
        });
    }

    public getEggs(): Promise<EggModel[]> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nests/${this.nestId}/eggs`).then(res => {
                let data: EggModel[] = [];

                res.data.data.forEach((element: any) => {
                    data.push(new EggModel(element.attributes));
                });

                return data;
            }).catch(error => reject(error));
        });
    }

    public getEgg(eggId: string): Promise<Egg> {
        return new Promise((resolve, reject) => {
            resolve(new Egg(this.api, this.nestId, eggId));
        });
    }
}

export default Nest;