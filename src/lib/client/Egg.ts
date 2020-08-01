import AdminAPI from '../AdminAPI';

import EggModel, { EggOptionsRaw } from '../models/Egg';

class Egg extends EggModel {
    private api: AdminAPI;

    constructor(api: AdminAPI, data: EggOptionsRaw) {
        super(data);
        this.api = api;
    }

    public static getAll(api: AdminAPI, nest: number): Promise<Egg[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/nests/${nest}/eggs`);
                resolve(res.data.map((value: any) => new Egg(api, value.attributes)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getById(api: AdminAPI, nest: number, id: number): Promise<Egg> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.call(`/application/nests/${nest}/eggs/${id}`);
                resolve(new Egg(api, res.data.attributes));
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default Egg;