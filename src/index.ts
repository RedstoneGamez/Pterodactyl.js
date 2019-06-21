import APIBuilder from './lib/Builder';

import AdminPterodactylAPI from './lib/AdminAPI';
import UserPterodactylAPI from './lib/UserAPI';

import User from './lib/client/User';
import Node from './lib/client/Node';
import Location from './lib/client/Location';
import Server from './lib/client/Server';
import Nest from './lib/client/Nest';
import Egg from './lib/client/Egg';

import ClientServerModel from './lib/models/ClientServer';
import UserModel from './lib/models/User';
import NodeModel from './lib/models/Node';
import LocationModel from './lib/models/Location';
import ServerModel from './lib/models/Server';
import NestModel from './lib/models/Nest';
import EggModel from './lib/models/Egg';

export {
    APIBuilder as Builder,

    AdminPterodactylAPI as AdminClient,
    UserPterodactylAPI as UserClient,

    User,
    Node,
    Location,
    Server,
    Nest,
    Egg,

    ClientServerModel,
    UserModel,
    NodeModel,
    LocationModel,
    ServerModel,
    NestModel,
    EggModel
};