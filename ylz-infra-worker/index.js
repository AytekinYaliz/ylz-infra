const redis = require('redis');
const configs = require('./configs');

const redisClient = redis.createClient({
    port: configs.redisPort,
    host: configs.redisHost,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
    if(index < 2) {
        return 1;
    }

    return fib(index-1) + fib(index-2);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)))
});

sub.subscribe('insert');