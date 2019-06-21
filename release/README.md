# Pterodactyl.js
A javascript wrapper to interact with the Admin and User API of [Pterodactyl Panel](https://pterodactyl.io).

## Installation

```console
npm i pterodactyl.js
```

## Usage

### Admin API

```js
const Pterodactyl = require('pterodactyl.js');

const client = new Pterodactyl.Builder()
    .setURL('https://pterodactyl.app/')
    .setAPIKey('API Key')
    .asAdmin();

client.getServers()
.then(async servers => {
    let server = await client.getServer(servers[0].id);

    let info = await server.getInfo();

    await server.setName('Server Name');
    await server.setDescription('Minecraft Server');
}).catch(error => {
    console.log(error);
});
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
    let server = await client.getClientServer(servers[0].identifier);

    let info = await server.getInfo();

    await server.start();

    await server.sendCommand('help');
}).catch(error => {
    console.log(error);
});
```

## Examples

### Linking System

```js
const Pterodactyl = require('pterodactyl.js');

const client = new Pterodactyl.Builder()
    .setURL('https://pterodactyl.app/')
    .setAPIKey('API Key')
    .asAdmin();

let isAccountCredentials = (username, email) => {
    return new Promise((resolve, reject) => {
        client.getUsers()
        .then(async users => {
            let user = users.filter(user => user.username === username);

            if (user) {
                let info = await user.getInfo();

                if (info.email === email) {
                    resolve({ correct: true, user });
                } else {
                    resolve({ correct: false });
                }
            } else {

            }
        }).catch(error => reject(error));
    });
};

isAccountCredentials('demo', 'demo@pterodactyl.io').then(account => {
    if (account.correct) {
        console.log('Correct! The username and email provided are valid.');
    } else {
        console.log('Incorrect! The username and email provided are invalid.');
    }
}).catch(error => console.log(error));
```