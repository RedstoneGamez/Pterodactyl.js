# Pterodactyl.js

Pterodactyl.js is currently a node.js only wrapper which interfaces with the Client and Admin API on the [Pterodactyl Panel](https://pterodactyl.io). It is a fully object-oriented library which utilizes almost all functions within the API routes. The functions put forth allow for individual fields to be edited as well as all at once. This permits for creating, reading, updating and deleting for any resource in the Admin API. This library is also written in TypeScript with a comprehensive type declaration along with it. 

Pterodactyl.js uses promises for handling of the data that is provided along with update functions.

## Installation
To install pterodactyl.js, you must either use NPM or Yarn. 

### NPM
```console
npm i pterodactyl.js
```

### Yarn
```console
yarn add pterodactyl.js
```

## Basic Usage

### Admin API

```js
const Pterodactyl = require('pterodactyl.js');

const client = new Pterodactyl.Builder()
    .setURL('https://pterodactyl.app/')
    .setAPIKey('API Key')
    .asAdmin();

client.getServers()
.then(async servers => {
    let server = servers[0];

    console.log(server.toJSON());
}).catch(error => console.log(error));
```

### User API

```js
const Pterodactyl = require('pterodactyl.js');

const client = new Pterodactyl.Builder()
    .setURL('https://pterodactyl.app/')
    .setAPIKey('API Key')
    .asUser();

client.getClientServers()
.then(async servers => {
    let server = servers[0];

    console.log(server.toJSON());

    await server.start();

    await server.sendCommand('help');
}).catch(error => console.log(error));
```

## Examples

### [Linking System](https://github.com/RedstoneGamez/Pterodactyl.js/blob/master/examples/link.js)