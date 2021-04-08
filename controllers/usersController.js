"use strict";

const Users = require("../models/user");

module.exports = {
    index: (req, res, next) => {
        Users.find()
            .then(Userss => {
                res.locals.users = users;
                next()
            })
            .catch(error => {
                console.log(`Error fetching user data: ${error.messgae}`);
                next(error);
            })

    },
    indexView: (req, res) => {
        res.render("/users/index");
    },
    new: (req, res) => {
        res.render("/users/new");
    },
    create: (req, res, next) => {
        let newUsers = new Users({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        });
        user.create(newUsers)
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                next(error)
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        Users.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
            })
    },
    showView: (req, res) => {
        res.render(users / show);
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        Users.findById(userId)
            .then(user => {
                res.render("/users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error loading user: ${error.message}`)
                next(error);
            })
    },
    update: (req, res, next) => {
        let userId = req.params.id;
        let updatedUsers = new Users({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        })
        Users.findByIdAndUpdate(userId, updatedUsers)
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/users/${user._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching Users by ID: ${error.message}`);
            })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        Users.findByIdAndRemove(usersId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error fetching Users by ID: ${error.message}`);
            })
    }
}