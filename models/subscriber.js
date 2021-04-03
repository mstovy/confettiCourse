const mongoose = require("mongoose"),
    subscriberSchema =  mongoose.Schema({
        name: String,
        email: String,
        zipCode: Number
    });

module.exportss = mongoose.model("Subscriber", subscriberSchema);
