import PterodactylAPI from '../index';

import EggModel from '../models/Egg';

interface EggOptions {
    id: number;
    uuid: string;
    internalId: string;
    nest: number;
    author: string;
    description: string;
    dockerImage: string;
    config: any;
    startup: string;
    script: any;
    updatedAt: Date;
    createdAt: Date;
}

class Egg {
    private api: PterodactylAPI;
    private nestId: string;
    private eggId: string;

    constructor(api: PterodactylAPI, nestId: string, eggId: string) {
        this.api = api;
        this.nestId = nestId;
        this.eggId = eggId;
    }

    public getInfo(): Promise<EggOptions> {
        return new Promise((resolve, reject) => {
            this.api.call(`/application/nests/${this.nestId}/eggs/${this.eggId}`).then(res => resolve(new EggModel(res.data.attributes))).catch(error => reject(error));
        });
    }
}

export default Egg;