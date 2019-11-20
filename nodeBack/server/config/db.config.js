"use strict";

const env = require("./env.js");

/** Use Sequelize ORM */

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/user.model.js")(sequelize, Sequelize);
db.role = require("../model/role.model.js")(sequelize, Sequelize);
db.service = require("../model/service.model")(sequelize, Sequelize);

/** M:N Relations */

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.service.belongsToMany(db.user, {
  through: "user_services",
  foreignKey: "serviceId",
  otherKey: "userId"
});
db.user.belongsToMany(db.service, {
  through: "user_services",
  foreignKey: "userId",
  otherKey: "serviceId"
});

module.exports = db;
