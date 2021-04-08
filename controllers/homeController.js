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

module.exports = {
    index: (req, res) => {
        res.render("index");
    }
}