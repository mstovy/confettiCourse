// requirerments 
const express = require("express"), app = express();
homeController = require("./controllers/homeController")
layouts = require("express-ejs-layouts");
errorController = require("./controllers/errorController")

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);


app.get("/", homeController.showIndex);

app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

// routing for website
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// supoport for layouts and partials
app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});
