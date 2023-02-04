const mongoose = require("mongoose");

const ClassRoomSchema = mongoose.Schema({
    Class: {
        type: String,
        required: true
    },
    Order: {
        type: Number,
        required: true
    },
    numberOfStudents: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    students: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("ClassRoom", ClassRoomSchema);