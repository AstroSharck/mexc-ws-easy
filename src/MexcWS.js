const WebSocket = require('ws');
const EventEmitter = require('events');

const WS_BASE_URL = 'wss://contract.mexc.com/edge'; // Futures URL correcte

class MexcWS extends EventEmitter {
    constructor() {
        super();
        this.ws = null;
        this.subscriptions = [];
    }

    connect() {
        this.ws = new WebSocket(WS_BASE_URL);

        this.ws.on('open', () => {
            console.log('[MEXC-WS] Connected.');
            this.subscriptions.forEach(sub => this.ws.send(JSON.stringify(sub)));
            this.startPing(); // Start ping automatique
        });

        this.ws.on('message', (data) => {
            const parsed = JSON.parse(data);
            this.handleMessage(parsed);
        });

        this.ws.on('close', () => {
            console.log('[MEXC-WS] Connection closed. Reconnecting...');
            setTimeout(() => this.connect(), 3000);
        });

        this.ws.on('error', (err) => {
            console.error('[MEXC-WS] Error:', err.message);
        });
    }

    subscribeKline(symbol, interval = "Min1") {
        const payload = {
            method: "sub.kline",
            param: {
                symbol: symbol,
                interval: interval,
            },
        };
        this.subscriptions.push(payload);

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(payload));
        }
    }

    subscribeTrade(symbol) {
        const payload = {
            method: "sub.deal",
            param: {
                symbol: symbol,
            },
        };
        this.subscriptions.push(payload);

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(payload));
        }
    }

    handleMessage(msg) {
        if (msg.channel === 'push.deal') {
            this.emit('trade', msg.data);
        }
        if (msg.channel === 'push.kline') {
            this.emit('kline', msg.data);
        }
    }

    startPing() {
        setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.ping();
            }
        }, 25000); // ping toutes les 25 secondes pour pas se faire deco
    }
}

module.exports = MexcWS;
