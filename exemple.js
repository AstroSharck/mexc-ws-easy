const MexcWS = require('mexc-ws-easy');

const client = new MexcWS();
client.connect();

// Subscribe to trades
client.subscribeTrade('BTC_USDT');

// Subscribe to 1-minute klines
client.subscribeKline('BTC_USDT', 'Min1');

// Listen to events
client.on('trade', (trade) => {
  console.log('[TRADE]', trade);
});

client.on('kline', (kline) => {
  console.log('[KLINE]', kline);
});
