const configs = require("./configs");

/**
 * Express setup
 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morganBody = require("morgan-body");

const app = express();
app.use(cors());
app.use(bodyParser.json());
morganBody(app);
app.get("/", (req, res) => {
  res.send("Hi..");
});
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");

  res.send(values.rows);
});
app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});
app.post("/values", async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high!");
  }

  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO  values(number) VALUES($1)", [index]);

  res.send({ working: true });
});
app.listen(configs.port, err => {
  console.log(`Listening on port: ${configs.port}`);
});

/**
 * Postgres Client Setup
 */
const { Pool } = require("pg");

// const pgClient = new Pool({
//   host: configs.pgHost,
//   port: configs.pgPort,
//   database: configs.pgDatabase,
//   user: configs.pgUser,
//   password: configs.pgPassword
// });

// pgClient.on("error", () => console.log("Lost PG Connection"));

// pgClient
//   .query("CREATE TABLE IF NOT EXISTS values (number INT)")
//   .catch(err => console.log(err));

/**
 * Redis Client Setup
 */
const redis = require("redis");
// const redisClient = redis.createClient({
//   port: configs.redisPort,
//   host: configs.redisHost,
//   retry_strategy: () => 1000
// });
// const redisPublisher = redisClient.duplicate();
