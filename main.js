const user = require("./models/user");

const express = require("express"),
    app = express(),
    router = express.Router(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscribersController = require("./controllers/subscribersController"),
    usersController = require("./controllers/usersController"),
    coursesController = require("./controllers/coursesController"),
    methodOverride = require("method-override"),
    layouts = require("express-ejs-layouts"), 
    mongoose = require("mongoose"),
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    User = require(".models/user");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());
router.use(layouts);
router.use(express.static("public"));
router.use(expressValidator());
router.use(methodOverride("_method", {methods: ["POST", "GET"]}));

// session & cookie parser
router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

// connect flash
router.use(connectFlash());

// passport setup
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStregy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

// flash messages
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedin = req.isAuthenticated();
    res.locals.currentUser = req.user;
})

// routing for website
router.get("/", homeController.index);

// subscribers pages
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

// user pages
router.get("/users", usersController.index,usersController.indexView);
router.get("/users/new",usersController.new);
router.post("/users/create",usersController.validate, usersController.create,usersController.redirectView);

router.get("/users/login", userController.login);
router.post("/users/login", usersController.autherntiate);
router.get("/users/logout", usersController.logout, usersController.redirectView);

router.get("/users/:id",usersController.show,usersController.showView);
router.get("/users/:id/edit",usersController.edit);
router.put("/users/:id/update",usersController.validate, usersController.update,usersController.redirectView);
router.delete("/users/:id/delete",usersController.delete,usersController.redirectView);

// courses page
router.get("/courses", coursesController.index,coursesController.indexView);
router.get("/courses/new",coursesController.new);
router.post("/courses/create",coursesController.create,coursesController.redirectView);
router.get("/courses/:id",coursesController.show,coursesController.showView);
router.get("/courses/:id/edit",coursesController.edit);
router.put("/courses/:id/update",coursesController.update,coursesController.redirectView);
router.delete("/courses/:id/delete",coursesController.delete,coursesController.redirectView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

// manages all routes that start with a "/"
app.use("/", router);

// supoport for layouts and partials
app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});
