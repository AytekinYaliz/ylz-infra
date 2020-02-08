const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const configs = require('./configs');

// Express setup
const app = express();
app.use(cors());
app.use(bodyParser.json());


// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  host: configs.pgHost,
  port: configs.pgPort,
  database: configs.pgDatabase,
  user: configs.pgUser,
  password: configs.pgPassword
});

pgClient.on('error', () => 
  console.log('Lost PG Connection')
);

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));