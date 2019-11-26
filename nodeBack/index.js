"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const Cors = require("cors");
app.use(Cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

require("./server/router/router.js")(app);

const db = require("./server/config/db.config.js");

const Role = db.role;

const controller = require("./server/controller/controller.js");


/**  Force Create table  */

db.sequelize
    .sync({
        force: true
    })
    .then(() => {
        console.log("Create table");
        app.delete("/api/deleterole/:id", controller.deleteRole);
        initial();

    });

/** Create a Server */


app.listen(process.env.API_PORT, () =>
    console.log(`Listening on port ${process.env.API_PORT}`)
);




function initial() {

    Role.create({
        id: 1,
        name: "CLIENTE"
    });

    Role.create({
        id: 2,
        name: "PROVEEDOR"
    });

    Role.create({
        id: 3,
        name: "ADMIN"
    });

}