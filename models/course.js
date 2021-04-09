const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        maxStudents: {
            type: Number,
            default: 0,
            min: [0, "Course can not have a negative number or students"]
        },
        cost: {
            type: Number,
            deafult: 0,
            min: [0, "Cost can not be a negative value"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Course", courseSchema);