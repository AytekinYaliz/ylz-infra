module.exports = {
  port: process.env.PORT || 5000,
  pgHost: process.env.PG_HOST,
  pgPort: process.env.PG_PORT,
  pgDatabase: process.env.PG_DATABASE,
  pgUser: process.env.PG_USER,
  pgPassword: process.env.PG_PASSWORD,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT
};
