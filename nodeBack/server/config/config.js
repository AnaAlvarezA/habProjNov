"use strict";

module.exports = {
    secret: process.env.JWT_SECRET_KEY,
    ROLEs: ["CLIENTE", "PROVEEDOR", "ADMIN"]
};