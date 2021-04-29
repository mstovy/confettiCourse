"use strict";

const passport = require("passport"), 
jsonWebToken = require("jsonwebtoken"), 
Users = require("../models/user"),
    getUserParams = body => {
        return {
            name: {
                first: body.first,
                last: body.last
            },
            email: body.email,
            password: body.password,
            zipCode: body.zipCode
        };
    };

module.exports = {
    login: (req, res) => {
        res.render("users/login");
    },
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
        if(req.skip) return next();
        let userParams = getUserParams(req.body);
        let newUser = new Users(userParams);
        user.register(newUser, req.body.password, (error, user) => {
            if(user) {
                req.flash("success", "User account successfully create!");
                res.locals.redirect = "/users";
            }
            else {
                req.flash("error", `User creation failed: ${error.message}`);
                res.locals.redirect = "/users/new";
                next();
            }
        });
    },
    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("email", "Email is not valid!").isEmail();
        req.checl("zipCode", "Zip Code is not valid!").notEmpty().isInt().isLength({
            min: 5,
            max: 5
        });
        req.check("password", "Password can not be empty!").notEmpty();
        req.getValidationResult().then((error) => {
            if(!error.isEmpty()) {
                let messages = error.array().map (e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/users/new";
                next();
            }
            else next();
        });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Login Failed! Check your email or password!",
        successRedirect: "/",
        successFlash: "Logged In!"
    }),
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "Successfully logged out");
        req.locals.redirect = "/";
        next();
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
        if (req.skip) return next();
        let userID = req.params.id,
        userParams = getUserParams(req.body);
        
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
    },
    apiAuthenticate: (req, res, next) => {
        passport.authenticate("local", (errors, user) => {
            if (user) {
                let signedToken = jsonWebToken.sign( {
                    data: user._id,
                    exp: new Date().setDate(new Date().getDate() + 1)
                },
                "secret_encoding_passphrase"
            );
            res.json({
                success: true,
                token: signedToken
            })
            } else
            res.json({
                success: false,
                message: "Could not authenticate user."
            });
        }) (req, res, next);
    },
    verifyJWT: (req, res, next) => {
        let token = req.headers.token;
        if (token) {
            jsonWebToken.verify(
                token, "secret_encoding_passphrase",
                (errors, payload) => {
                    if (payload) {
                        User.findById(payload.data).then(user => {
                            if (user) {
                                next();
                            } else {
                                res.status(httpStatus.FORBIDDEN).json({
                                    error: true,
                                    message: "No use account found"
                                });
                            }
                        });
                    } else {
                        res.status(httpStatus.UNAUTHORIZED).json({
                            error: true,
                            message: "Cannot verify API token."
                        });
                        next();
                    }
                }
            );
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: "Provide Token"
            });
        }
    }
}