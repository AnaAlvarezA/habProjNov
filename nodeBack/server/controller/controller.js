"use strict";

const db = require("../config/db.config.js");
const config = require("../config/config.js");
const User = db.user;
const Role = db.role;
const Service = db.service;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/** Register */

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        .then(user => {
            Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                })
                .then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "Registered successfully!" });
                    });
                })
                .catch(err => {
                    res.status(500).send({ reason: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ reason: err.message });
        });
};

/** Login  */

exports.signin = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ reason: "Email Not Found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    auth: false,
                    accessToken: null,
                    reason: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            const authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    email: user.email,
                    authorities: authorities
                });
            });
        })
        .catch(err => {
            res.status(500).send({ reason: err.message });
        });
};

exports.userContent = (req, res) => {
    User.findOne({
            where: { id: req.userId },
            attributes: ["name", "username", "email"],
            include: [{
                model: Role,
                attributes: ["id", "name"],
                through: {
                    attributes: ["userId", "roleId"]
                }
            }]
        })
        .then(user => {
            res.status(200).send({
                description: ">>> User Contents!",
                user: user
            });
        })
        .catch(err => {
            res.status(500).send({
                description: "Can not access User Page",
                error: err
            });
        });
};

exports.adminBoard = (req, res) => {
    User.findOne({
            where: { id: req.userId },
            attributes: ["name", "username", "email"],
            include: [{
                model: Role,
                attributes: ["id", "name"],
                through: {
                    attributes: ["userId", "roleId"]
                }
            }]
        })
        .then(user => {
            res.status(200).send({
                description: ">>> Admin Contents",
                user: user
            });
        })
        .catch(err => {
            res.status(500).send({
                description: "Can not access Admin Board",
                error: err
            });
        });
};

exports.managementBoard = (req, res) => {
    User.findOne({
            where: { id: req.userId },
            attributes: ["name", "username", "email"],
            include: [{
                model: Role,
                attributes: ["id", "name"],
                through: {
                    attributes: ["userId", "roleId"]
                }
            }]
        })
        .then(user => {
            res.status(200).send({
                description: ">>> Project Management Board",
                user: user
            });
        })
        .catch(err => {
            res.status(500).send({
                description: "Can not access Management Board",
                error: err
            });
        });
};

/** SERVICES */

exports.serviceAllContent = (req, res) => {
    Service.findAll({
            where: { id: req.serviceId },
            attributes: ["name", "description", "logo"]
        })
        .then(service => {
            res.status(200).send({
                description: ">>> Servicess!",
                service: service
            });
        })
        .catch(err => {
            res.status(500).send({
                description: "Can not access Servicesaccess Services Page",
                error: err
            });
        });
};

exports.findService = (req, res) => {
    Service.findOne({
            where: { id: req.serviceId },
            attributes: ["name", "description", "logo"]
        })
        .then(service => {
            res.status(200).send({
                description: ">>> Services Board",
                service: service
            });
        })
        .catch(err => {
            res.status(500).send({
                description: "Can not access Services Board",
                error: err
            });
        });
};

exports.deleteService = (req, res) => {
    Service.destroy({
            where: { id: req.serviceId },
            attributes: ["name", "description", "logo"]
        })
        .then(service => {
            res.status(200).send({
                description: ">>> Services Board",
                service: service
            });
        })
        .catch(err => {
            res.status(500).send({
                description: "Can not access Services",
                error: err
            });
        });
};

exports.createService = (req, res) => {
    Service.create({
            name: req.body.name,
            description: req.body.description,
            logo: req.body.logo
        })
        .then(service => {
            res.status(200).send({
                description: ">>> Service Created",
                service: service
            });
        })
        .catch(err => {
            res.status(500).send({
                description: "Can not access Services",
                error: err
            });
        });
};

/** ROLES */

exports.deleteRole = (req, res) => {
    Role.destroy({
            where: { id: req.roleId },
            attributes: ["id", "name"]
        })
        .then(role => {
            res.status(200).send({
                description: ">>> Roles Board",
                role: role
            });
        })
        .catch(err => {
            res.status(500).send({
                description: "Can not access Roles",
                error: err
            });
        });
};