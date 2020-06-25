declare module 'pterodactyl.js' {
    import { AxiosResponse } from 'axios';

    export class Builder {
        constructor(url?: string, apiKey?: string);

        private url: string;
        private apiKey: string;

        public setURL(url: string): Builder;

        public setAPIKey(apiKey: string): Builder;

        private build(): Promise<boolean>;

        public asUser(): UserClient;

        public asAdmin(): AdminClient;
    }

    export class PterodactylAPI {
        constructor(url: string, apiKey: string);

        public url: string;
        public baseUrl: string;
        public apiKey: string;

        private getHostname(): string;

        public call(endpoint: string, method: any, data: any): Promise<AxiosResponse<any>>;

        private handleError(error: any): any;
    }

    export class AdminClient extends PterodactylAPI {
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

        public createServer(options: NewServerOptions): Promise<Server>;

        public createUser(options: NewUserOptions): Promise<User>;

        public createLocation(options: NewLocationOptions): Promise<Location>;

        public createNode(options: NewNodeOptions): Promise<Node>;
    }

    export class UserClient extends PterodactylAPI {
        constructor(url: string, apiKey: string);

        public testConnection(): Promise<any>;

        public getClientServers(): Promise<ClientServerModel[]>;

        public getClientServer(serverId: string): Promise<ClientServer>;
    }

    export class ClientServer extends ClientServerModel {
        constructor(api: UserClient, options: ClientServerOptionsRaw, paginationOptions?: PaginationOptionsRaw);

        private api: UserClient;
        public pagination?: Pagination;

        public static getAll(api: UserClient, page: number): Promise<ClientServer[]>;

        public static getById(api: UserClient, id: string): Promise<ClientServer>;

        public cpuUsage(): Promise<UtilizationData>;

        public diskUsage(): Promise<UtilizationData>;

        public memoryUsage(): Promise<UtilizationData>;

        public powerState(): Promise<UtilizationData>;

        public powerAction(signal: 'start' | 'stop' | 'restart' | 'kill'): Promise<void>;

        public start(): Promise<void>;

        public stop(): Promise<void>;

        public restart(): Promise<void>;

        public kill(): Promise<void>;

        public databases(): Promise<number>;

        public allocations(): Promise<number>

        public sendCommand(command: string): Promise<any>;
    }

    export class User extends UserModel {
        constructor(api: AdminClient, data: UserOptionsRaw, paginationOptions?: PaginationOptionsRaw);

        private api: AdminClient;
        public pagination?: Pagination;

        public static create(api: AdminClient, options: NewUserOptions): Promise<User>;

        public static getAll(api: AdminClient, page: number): Promise<User[]>;

        public static getById(api: AdminClient, id: number): Promise<User>;

        public static getByExternalId(api: AdminClient, externalId: string): Promise<User>;

        public setExternalId(externalId: string): Promise<User>;

        public setUsername(username: string): Promise<any>;

        public setEmail(email: string): Promise<any>;

        public setFirstName(firstName: string): Promise<any>;

        public setLastName(lastName: string): Promise<any>;

        public setPassword(password: string): Promise<User>;

        public setAdmin(admin: boolean): Promise<User>;

        public setLanguage(language: string): Promise<User>;

        public delete(): Promise<void>;
    }

    export class Node extends NodeModel {
        constructor(api: AdminClient, data: NodeOptionsRaw, paginationOptions?: PaginationOptionsRaw);

        private api: AdminClient;
        public pagination?: Pagination;

        public static create(api: AdminClient, options: NewNodeOptions): Promise<Node>;

        public static getAll(api: AdminClient, page: number): Promise<Node[]>;

        public static getById(api: AdminClient, id: number): Promise<Node>;

        public setPublic(isPublic: boolean): Promise<Node>;

        public setName(name: string): Promise<Node>;

        public setDescription(description: string): Promise<Node>;

        public setLocation(locationId: number): Promise<Node>;

        public setFQDN(fqdn: string): Promise<Node>;

        public setScheme(scheme: string): Promise<Node>;

        public setBehindProxy(behindProxy: string): Promise<Node>;

        public setMaintenanceMode(maintenanceMode: boolean): Promise<Node>;

        public setMemory(memory: number): Promise<Node>;

        public setMemoryOverAllocate(memoryOverAllocate: number): Promise<Node>;

        public setDisk(disk: number): Promise<Node>;

        public setDiskOverAllocate(diskOverAllocate: number): Promise<Node>;

        public setDaemonPort(port: number): Promise<Node>;

        public setDaemonSftpPort(port: number): Promise<Node>;

        public setDaemonBase(baseDirectory: string): Promise<Node>;

        public allocations(): Promise<NodeAllocation[]>;

        public createAllocations(ip: string, alias: string, ports: string[]): Promise<void>;

        public delete(): Promise<void>;
    }

    export class Location extends LocationModel {
        constructor(api: AdminClient, data: LocationOptionsRaw, paginationOptions?: PaginationOptionsRaw);

        private api: AdminClient;
        public pagination?: Pagination;

        public static create(api: AdminClient, options: NewLocationOptions): Promise<Location>;

        public static getAll(api: AdminClient, page: number): Promise<Location[]>;

        public static getById(api: AdminClient, id: number): Promise<Location>;

        public setShortCode(shortCode: string): Promise<Location>;

        public setDescription(description: string): Promise<Location>;

        public delete(): Promise<void>;
    }

    export class Server extends ServerModel {
        constructor(api: AdminClient, data: ServerOptionsRaw, paginationOptions?: PaginationOptionsRaw);

        private api: AdminClient;
        public pagination?: Pagination;

        public static create(api: AdminClient, options: NewServerOptions): Promise<Server>;

        public static getAll(api: AdminClient, page: number): Promise<Server[]>;

        public static getById(api: AdminClient, id: number): Promise<Server>;

        public static getByExternalId(api: AdminClient, externalId: string): Promise<Server>;

        public updateDetails(options: ServerDetailsRequestOptions): Promise<Server>;

        public updateBuild(options: ServerBuildConfigRequestOptions): Promise<Server>;

        public updateStartup(options: ServerStartupRequestOptions): Promise<Server>;

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

        public setStartupCommand(command: string): Promise<Server>;

        public setEgg(egg: number): Promise<Server>;

        public setPack(pack: number): Promise<Server>;

        public setImage(image: string): Promise<Server>;

        public createDatabase(name: string, remote: string, host: number): Promise<ServerDatabase>;

        public databases(): Promise<ServerDatabase[]>;

        public getDatabase(database: number): Promise<ServerDatabase>;

        public delete(force?: boolean): Promise<any>;
    }

    export class Nest extends NestModel {
        constructor(api: AdminClient, data: NestOptionsRaw, paginationOptions?: PaginationOptionsRaw);

        private api: AdminClient;
        public pagination?: Pagination;

        public static getAll(api: AdminClient, page: number): Promise<Nest[]>;

        public static getById(api: AdminClient, id: number): Promise<Nest>;

        public getEggs(): Promise<Egg[]>;

        public getEgg(eggId: string): Promise<Egg>;
    }

    export class Egg extends EggModel {
        constructor(api: AdminClient, data: EggOptionsRaw);

        private api: AdminClient;

        public static getAll(api: AdminClient): Promise<Egg[]>;

        public static getById(api: AdminClient, id: number): Promise<Egg>;
    }

    export class ServerDatabase extends ServerDatabaseModel {
        constructor(api: AdminClient, data: ServerDatabaseOptionsRaw);

        private api: AdminClient;

        public static getAll(api: AdminClient, server: number): Promise<ServerDatabase[]>;

        public static getById(api: AdminClient, server: number, id: number): Promise<ServerDatabase>;

        public resetPassword(): Promise<ServerDatabase>;

        public delete(): Promise<void>;
    }

    export class NodeAllocation extends NodeAllocationModel {
        constructor(api: AdminClient, node: number, data: NodeAllocationOptions, paginationOptions?: PaginationOptionsRaw);

        private api: AdminClient;
        public pagination?: Pagination;

        public static getAll(api: AdminClient, node: number, page: number): Promise<NodeAllocation[]>;
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

        public toJSON(): any;
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

        public toJSON(): any;
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

        public toJSON(): any;
    }

    export class Pagination implements PaginationOptions {
        constructor(data: PaginationOptionsRaw);

        public total: number;
        public count: number;
        public pageSize: number;
        public currentPage: number;
        public totalPages: number;
        public links: any[];

        public nextPage(): number;
    }

    export class LocationModel implements LocationOptions {
        constructor(data: LocationOptionsRaw);

        public id: number;
        public shortCode: string;
        public description: string;
        public updatedAt: Date;
        public createdAt: Date;

        public toJSON(): any;
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

        public toJSON(): any;
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

        public toJSON(): any;
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
        public createdAt: Date;
        public updatedAt: Date;

        public toJSON(): any;
    }

    export class ServerDatabaseModel implements ServerDatabaseOptions {
        constructor(data: ServerDatabaseOptionsRaw);

        public id: number;
        public server: number;
        public host: number;
        public database: string;
        public username: string;
        public remote: string;
        public createdAt: Date;
        public updatedAt: Date;

        public toJSON(): any;
    }

    export class NodeAllocationModel implements NodeAllocationOptions {
        constructor(data: NodeAllocationOptions);

        public id: number;
        public ip: string;
        public alias: string;
        public port: number;
        public assigned: boolean;
        public node: number;

        public toJSON(): any;
    }

    // Type Defs

    interface PterodactylAPIOptions {
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

    interface ServerDetailsRequestOptions {
        external_id?: string;
        name: string;
        user: number;
        description?: string;
    }

    interface ServerBuildConfigRequestOptions {
        allocation: number;
        oom_disabled?: boolean;
        limits?: ServerLimits;
        add_allocations?: Array<number>;
        remove_allocations?: Array<number>;
        feature_limits: ServerFeatureLimits;
    }

    interface ServerStartupRequestOptions {
        startup: string;
        environment?: Array<string>;
        egg: number;
        pack?: number;
        image: string;
        skip_scripts?: boolean;
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

    interface UtilizationData {
        used: number;
        total: number;
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

    interface ServerDatabaseOptions {
        id: number;
        server: number;
        host: number;
        database: string;
        username: string;
        remote: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface ServerDatabaseOptionsRaw {
        id: number;
        server: number;
        host: number;
        database: string;
        username: string;
        remote: string;
        created_at: Date;
        updated_at: Date;
    }

    interface NodeAllocationOptions {
        id: number;
        ip: string;
        alias: string;
        port: number;
        assigned: boolean;
        node: number;
    }

    interface PaginationOptions {
        total: number;
        count: number;
        pageSize: number;
        currentPage: number;
        totalPages: number;
        links: any[];
    }

    interface PaginationOptionsRaw {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: any[];
        };
    }

    interface NewServerOptions {
        externalId?: string;
        name: string;
        user: number;
        description?: string;
        egg: number;
        pack?: number;
        image?: string;
        startup: string;
        limits: ServerLimits;
        featureLimits: ServerFeatureLimits;
        environment: {
            [key: string]: any;
        };
        allocation?: {
            default?: number;
            additional: number[];
        };
        deploy?: {
            locations?: number[];
            dedicatedIp: boolean;
            portRange: any[];
        };
        startWhenInstalled?: boolean;
        skipScripts?: boolean;
        outOfMemoryKiller?: boolean;
    }

    interface NewUserOptions {
        externalId?: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        password?: string;
        admin?: boolean;
        language?: string;
    }

    interface NewLocationOptions {
        shortCode: string;
        description: string;
    }

    interface NewNodeOptions {
        name: string;
        description?: string;
        locationId: number;
        public?: boolean;
        fqdn: string;
        scheme: string;
        behindProxy: string;
        maintenanceMode: string;
        memory: number;
        memoryOverAllocate: number;
        disk: number;
        diskOverAllocate: number;
        uploadSize: number;
        daemonPort: number;
        daemonSftpPort: number;
        daemonBase: string;
    }
}