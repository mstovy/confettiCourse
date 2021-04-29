const course = require("./models/course");
const user = require("./models/user");

const express = require("express"),
    app = express(),
    router = require("./routes/index"),
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
    User = require("./models/user");



mongoose.connect("mongodb://localhost:27017/confetti_cuisine", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());
app.use(layouts);
app.use(express.static("public"));
app.use(expressValidator());
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

// session & cookie parser
app.use(cookieParser("my_passcode"));
app.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

// connect flash
app.use(connectFlash());

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash messages
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedin = req.isAuthenticated();
    res.locals.currentUser = req.user;
})

// manages all routes that start with a "/"
app.use("/", router);

// supoport for layouts and partials
app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});
