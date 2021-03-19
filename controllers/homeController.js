const { render } = require("ejs");

var courses = [
    {
        title: "Raspberry Cake",
        cost: 50
    },
    {
        title: "Artichoke Chicken",
        cost: 20
    },
    {
        title: "Smashburger",
        cost: 100
    },
]

exports.showIndex = (req, res) => {
    res.render("index");
}

exports.showCourses = (req, res) => {
    res.render("courses", {offeredCourse: courses});
}

exports.showSignUp = (req, res) => {
    res.render("contact");
}

exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
}
