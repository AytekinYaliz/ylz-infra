const redis = require("redis");
const configs = require("./configs");

const redisClient = redis.createClient({
  port: configs.redisPort,
  host: configs.redisHost,
  retry_strategy: () => 1000
});

const redisSubscriber = redisClient.duplicate();
redisSubscriber.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});
redisSubscriber.subscribe("insert");

function fib(index) {
  if (index < 2) {
    return 1;
  }

  return fib(index - 1) + fib(index - 2);
}
