const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/jcirjl",{useNewUrlParser: true});

module.exports = mongoose;