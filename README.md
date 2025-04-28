
# mexc-ws-easy

  

Simple and lightweight Node.js wrapper for listening to MEXC Futures WebSocket streams.

- ✅ Easy subscription to Trades and Klines
- ✅ Auto-reconnect if connection drops
- ✅ Automatic ping to keep the connection alive
- ✅ Event-based system (`on('trade')`, `on('kline')`)
- ✅ Designed for Futures only (Spot support coming later)

  

---

  

## 🚀 Installation

```bash

npm install mexc-ws-easy

```

  

## 📚 Usage Example

```javascript
const MexcWS = require('mexc-ws-easy');

const client = new MexcWS();
client.connect();

// Subscribe to real-time trades
client.subscribeTrade('BTC_USDT');

  

// Subscribe to 1-minute klines
client.subscribeKline('BTC_USDT', 'Min1');

  

// Listen to incoming events
client.on('trade', (trade) => {
  console.log('[TRADE]', trade);
});

client.on('kline', (kline) => {
  console.log('[KLINE]', kline);
});

```

## 📦 Features

- **connect()**: Connects to the MEXC Futures WebSocket server
- **subscribeTrade(symbol)**: Subscribes to real-time trades for a given symbol
- **subscribeKline(symbol, interval)**: Subscribes to candlestick (kline) updates for a given symbol and interval
- **on(event, callback)**: Listens for `trade` and `kline` events
---
## 🌐 Futures WebSocket Server

This package connects to the following WebSocket endpoint:
arduino
CopierModifier
`wss://contract.mexc.com/edge`

---
## ⚡ Upcoming Improvements

- Support for unsubscribe feature
- Depth (Order Book) subscriptions
- Multi-symbol subscription optimization
- Spot market support (future update)

---
## 🛠 Requirements

- Node.js v16 or higher


## 📄 License

MIT License