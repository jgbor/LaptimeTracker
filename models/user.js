const Schema = require("mongoose").Schema;
const db = require("../config/db");

const User = db.model("User",{
    name: String,
    username: String,
    password: String,
    question: Number,
    answer: String
});

module.exports = User;