// import Sockette from 'sockette';
import { EventEmitter } from 'events';
import WebSocket from 'ws';
import UserClient from '../UserAPI';
// const WebSocket = require( 'ws' );

export const SOCKET_EVENTS = [
    'SOCKET_OPEN',
    'SOCKET_RECONNECT',
    'SOCKET_CLOSE',
    'SOCKET_ERROR',
];

class $WebSocket extends EventEmitter {
    private timer: any = null;

    private backoff = 5000;

    private socket: WebSocket | null = null;

    private url: string | null = null;

    private token = '';

    connect(api: UserClient, url: string): this {
        this.url = url;

        console.log(api);


        this.socket = new WebSocket(this.url, {
            origin: api.baseUrl
        });

        this.socket.on('message', (data: string) => {
            try {
                const { event, args } = JSON.parse(data);
                args ? this.emit(event, ...args) : this.emit(event);
                console.log(event);
            } catch (ex) {
                console.warn('Failed to parse incoming websocket message.', ex);
            }
        });

        this.socket.on('open', () => {
            this.timer && clearTimeout(this.timer);
            this.backoff = 5000;

            this.emit('SOCKET_OPEN');
            this.authenticate();
        });

        this.socket.on('close', (code, reason) => this.emit('SOCKET_CLOSE', { code, reason }));

        this.socket.on('error', error => this.emit('SOCKET_ERROR', error));

        this.timer = setTimeout(() => {
            this.backoff = (this.backoff + 2500 >= 20000) ? 20000 : this.backoff + 2500;
            this.socket && this.socket.close();
            clearTimeout(this.timer);

            this.connect(api, url);
        }, this.backoff);

        return this;
    }
    setToken(token: string, isUpdate = false): this {
        this.token = token;

        if (isUpdate) {
            this.authenticate();
        }

        return this;
    }

    authenticate() {
        if (this.url && this.token) {
            this.send('auth', this.token);
        }
    }

    close(code?: number, reason?: string) {
        this.url = null;
        this.token = '';
        this.socket && this.socket.close(code, reason);
    }

    send(event: string, payload?: string | string[]) {
        this.socket && this.socket.send(JSON.stringify({
            event,
            args: Array.isArray(payload) ? payload : [payload],
        }));
    }
}

export default $WebSocket;