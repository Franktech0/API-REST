const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Student", StudentSchema);