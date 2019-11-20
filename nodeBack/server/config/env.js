"use strict";

const env = {
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;
