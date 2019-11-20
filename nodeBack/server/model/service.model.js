"use strict";

module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("services", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    logo: Sequelize.STRING
  });
  return Service;
};
