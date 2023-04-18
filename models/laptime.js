const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Laptime = db.model("Laptime",{
    car: String,
    track: String,
    weather: String,
    time: String,
    _driver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = Laptime;