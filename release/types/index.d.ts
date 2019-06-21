declare module 'pterodactyl.js' {

    import { AxiosResponse } from 'axios';

    export class Builder {
        constructor(url?: string, apiKey?: string);

        private url: string;
        private apiKey: string;

        public setURL(url: string): void;

        public setAPIKey(apiKey: string): void;

        private build(): Promise<boolean>;

        public asUser(): Promise<UserClient>;

        public asAdmin(): Promise<AdminClient>;
    }

    export class PterodactylJSBase implements PterodactylAPIVars {
        constructor(url: string, apiKey: string);

        public url: string;
        public baseUrl: string;
        public apiKey: string;

        private getHostname(): string;

        public call(endpoint: string, method: any, data: any): Promise<AxiosResponse<any>>;
    }

    export class AdminClient extends PterodactylJSBase {
        constructor(url: string, apiKey: string);

        public testConnection(): Promise<any>;

        public getUsers(): Promise<UserModel[]>;

        public getNodes(): Promise<NodeModel[]>;

        public getLocations(): Promise<LocationModel[]>;

        public getServers(): Promise<ServerModel[]>;

        public getNests(): Promise<NestModel[]>;

        public getUser(userId: string): Promise<User>;

        public getNode(nodeId: string): Promise<Node>;

        public getLocation(locationId: string): Promise<Location>;

        public getServer(serverId: string): Promise<Server>;

        public getNest(nestId: string): Promise<Nest>

        public getEgg(nestId: string, eggId: string): Promise<Egg>;
    }

    export class UserClient extends PterodactylJSBase {
        constructor(url: string, apiKey: string);

        public testConnection(): Promise<any>;

        public getClientServers(): Promise<ClientServerModel[]>;

        public getClientServer(serverId: string): Promise<ClientServer>;
    }

    export class ClientServer {
        constructor(api: AdminClient, userId: any);

        private api: UserClient;
        private userId: any;
        private username: string;

        public getInfo(): Promise<ClientServerOptions>;

        public cpuUsage(): Promise<any>;

        public diskUsage(): Promise<any>;

        public memoryUsage(): Promise<any>;

        public powerState(): Promise<string>;

        public start(): Promise<any>;

        public stop(): Promise<any>;

        public restart(): Promise<any>;

        public kill(): Promise<any>;

        public databaseAmount(): Promise<number>;

        public allocationsAmount(): Promise<number>

        public sendCommand(command: string): Promise<any>;
    }

    export class User {
        constructor(api: AdminClient, userId: any);

        private api: AdminClient;
        private userId: any;
        private username: string;

        public getInfo(): Promise<UserOptions>;

        public setUsername(username: string): Promise<any>;

        public setEmail(email: string): Promise<any>;

        public setFirstName(firstName: string): Promise<any>;

        public setLastName(lastName: string): Promise<any>;

        public delete(): Promise<any>;
    }

    export class Node {
        constructor(api: AdminClient, nodeId: string);

        private api: AdminClient;
        private nodeId: string;

        public getInfo(): Promise<NodeOptions>;

        public setPublic(bool: boolean): Promise<any>;

        public setName(name: string): Promise<any>;

        public setDescription(description: string): Promise<any>;

        public setLocation(locationId: number): Promise<any>;

        public setFQDN(fqdn: string): Promise<any>;

        public setScheme(scheme: string): Promise<any>;

        public setBehindProxy(behindProxy: string): Promise<any>;

        public setMaintenanceMode(maintenanceMode: boolean): Promise<any>;

        public setMemory(memory: number): Promise<any>;

        public setMemoryOverAllocate(memoryOverAllocate: number): Promise<any>;

        public setDisk(disk: number): Promise<any>;

        public setDiskOverAllocate(diskOverAllocate: number): Promise<any>;

        public setDaemonListen(port: number): Promise<any>;

        public setDaemonSftp(port: number): Promise<any>;

        public setDaemonBase(daemonBase: string): Promise<any>;

        public delete(): Promise<any>;
    }

    export class Location {
        constructor(api: AdminClient, locationId: string);

        private api: AdminClient;
        private locationId: string;

        public getInfo(): Promise<LocationOptions>;

        public setShortCode(shortCode: string): Promise<any>;

        public setDescription(description: string): Promise<any>;
    }

    export class Server {
        constructor(api: AdminClient, serverId: string);

        private api: AdminClient;
        private internalId: string;

        public getInfo(): Promise<ServerOptions>;

        public suspend(): Promise<any>;

        public unsuspend(): Promise<any>;

        public reinstall(): Promise<any>;

        public rebuild(): Promise<any>;

        public isSuspended(): Promise<boolean>;

        public setName(name: string): Promise<any>;

        public setDescription(description: string): Promise<any>;

        public setOwner(user: number): Promise<any>;

        public setMemory(memory: number): Promise<any>;

        public setCPU(cpu: number): Promise<any>;

        public setDisk(disk: number): Promise<any>;

        public setIO(io: number): Promise<any>;

        public setSwap(swap: number): Promise<any>;

        public setDatabaseAmount(amount: number): Promise<any>;

        public setAllocationAmount(amount: number): Promise<any>;

        public delete(force?: boolean): Promise<any>;
    }

    export class Nest {
        constructor(api: AdminClient, nestId: string);

        private api: AdminClient;
        private nestId: string;

        public getInfo(): Promise<NestOptions>;

        public getEggs(): Promise<EggModel[]>;

        public getEgg(eggId: string): Promise<Egg>;
    }

    export class Egg {
        constructor(api: AdminClient, nestId: string, eggId: string);

        private api: AdminClient;
        private nestId: string;
        private eggId: string;

        public getInfo(): Promise<EggOptions>;
    }

    export class ClientServerModel implements ClientServerOptions {
        constructor(data: ClientServerOptionsRaw);

        public serverOwner: boolean;
        public identifier: string;
        public internalId: string;
        public uuid: string;
        public name: string;
        public description: string;
        public limits: ServerLimits;
        public featureLimits: ServerFeatureLimits;
    }

    export class UserModel implements UserOptions {
        constructor(data: UserOptionsRaw);

        public id: number;
        public externalId: any;
        public uuid: string;
        public internalId: string;
        public username: string;
        public email: string;
        public firstName: string;
        public lastName: string;
        public fullName: string;
        public language: string;
        public rootAdmin: boolean;
        public twoFactor: boolean;
        public updatedAt: Date;
        public createdAt: Date;
    }

    export class NodeModel implements NodeOptions {
        constructor(data: NodeOptionsRaw);

        public id: number;
        public public: boolean;
        public name: string;
        public description: string;
        public locationId: number;
        public fqdn: string;
        public scheme: string;
        public behindProxy: string;
        public maintenanceMode: string;
        public memory: number;
        public memoryOverAllocate: number;
        public disk: number;
        public diskOverAllocate: number;
        public uploadSize: number;
        public daemonListen: number;
        public daemonSftp: number;
        public daemonBase: string;
        public updatedAt: Date;
        public createdAt: Date;
    }

    export class LocationModel implements LocationOptions {
        constructor(data: LocationOptionsRaw);

        public id: number;
        public shortCode: string;
        public description: string;
        public updatedAt: Date;
        public createdAt: Date;
    }

    export class ServerModel implements ServerOptions {
        constructor(data: ServerOptionsRaw);

        public id: number;
        public externalId: any;
        public internalId: string;
        public uuid: string;
        public identifier: string;
        public name: string;
        public description: string;
        public suspended: boolean;
        public limits: ServerLimits;
        public featureLimits: ServerFeatureLimits;
        public user: number;
        public node: number;
        public allocation: number;
        public nest: number;
        public egg: number;
        public pack: any;
        public container: ServerContainer;
        public updatedAt: Date;
        public createdAt: Date;
    }

    export class NestModel implements NestOptions {
        constructor(data: NestOptionsRaw);

        public id: number;
        public uuid: string;
        public internalId: string;
        public author: string;
        public name: string;
        public description: string;
        public updatedAt: Date;
        public createdAt: Date;
    }

    export class EggModel implements EggOptions {
        constructor(data: EggOptionsRaw);

        public id: number;
        public uuid: string;
        public internalId: string;
        public nest: number;
        public author: string;
        public description: string;
        public dockerImage: string;
        public config: any;
        public startup: string;
        public script: any;
        public updatedAt: Date;
        public createdAt: Date;
    }

    // Type Defs

    interface PterodactylAPIVars {
        url: string;
        baseUrl: string;
        apiKey: string;
    }

    interface ServerLimits {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    }

    interface ServerFeatureLimits {
        databases: number;
        allocations: number;
    }

    interface ServerContainer {
        startupCommand: string;
        image: string;
        installed: boolean;
        environment: any;
    }

    interface ServerContainerRaw {
        startup_command: string;
        image: string;
        installed: boolean;
        environment: any;
    }

    interface ClientServerOptions {
        serverOwner: boolean;
        identifier: string;
        internalId: string;
        uuid: string;
        name: string;
        description: string;
        limits: ServerLimits;
        featureLimits: ServerFeatureLimits;
    }

    interface ClientServerOptionsRaw {
        server_owner: boolean;
        identifier: string;
        uuid: string;
        name: string;
        description: string;
        limits: ServerLimits;
        feature_limits: ServerFeatureLimits;
    }

    interface UserOptions {
        id: number;
        externalId: any;
        uuid: string;
        internalId: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        fullName: string;
        language: string;
        rootAdmin: boolean;
        twoFactor: boolean;
        updatedAt: Date;
        createdAt: Date;
    }

    interface UserOptionsRaw {
        id: number;
        external_id: any;
        uuid: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
        root_admin: boolean;
        '2fa': boolean;
        updated_at: string;
        created_at: string;
    }

    interface NodeOptions {
        id: number;
        public: boolean;
        name: string;
        description: string;
        locationId: number;
        fqdn: string;
        scheme: string;
        behindProxy: string;
        maintenanceMode: string;
        memory: number;
        memoryOverAllocate: number;
        disk: number;
        diskOverAllocate: number;
        uploadSize: number;
        daemonListen: number;
        daemonSftp: number;
        daemonBase: string;
        updatedAt: Date;
        createdAt: Date;
    }

    interface NodeOptionsRaw {
        id: number;
        public: boolean;
        name: string;
        description: string;
        location_id: number;
        fqdn: string;
        scheme: string;
        behind_proxy: string;
        maintenance_mode: string;
        memory: number;
        memory_overallocate: number;
        disk: number;
        disk_overallocate: number;
        upload_size: number;
        daemon_listen: number;
        daemon_sftp: number;
        daemon_base: string;
        updated_at: string;
        created_at: string;
    }

    interface LocationOptions {
        id: number;
        shortCode: string;
        description: string;
        updatedAt: Date;
        createdAt: Date;
    }

    interface LocationOptionsRaw {
        id: number;
        short: string;
        long: string;
        updated_at: string;
        created_at: string;
    }

    interface ServerOptions {
        id: number;
        externalId: any;
        internalId: string;
        uuid: string;
        identifier: string;
        name: string;
        description: string;
        suspended: boolean;
        limits: ServerLimits;
        featureLimits: ServerFeatureLimits;
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        pack: any;
        container: ServerContainer;
        updatedAt: Date;
        createdAt: Date;
    }

    interface ServerOptionsRaw {
        id: number;
        external_id: any;
        uuid: string;
        identifier: string;
        name: string;
        description: string;
        suspended: boolean;
        limits: ServerLimits;
        feature_limits: ServerFeatureLimits;
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        pack: any;
        container: ServerContainerRaw;
        updated_at: string;
        created_at: string;
    }

    interface ServerLimits {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    }

    interface ServerFeatureLimits {
        databases: number;
        allocations: number;
    }

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

    interface NestOptionsRaw {
        id: number;
        uuid: string;
        author: string;
        name: string;
        description: string;
        updated_at: string;
        created_at: string;
    }

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

    interface EggOptionsRaw {
        id: number;
        uuid: string;
        nest: number;
        author: string;
        description: string;
        docker_image: string;
        config: any;
        startup: string;
        script: any;
        updated_at: string;
        created_at: string;
    }
}