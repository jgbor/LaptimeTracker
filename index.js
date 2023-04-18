const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("static"));

//session
app.use(
    session({
        secret: "jujdetitkos",
        resave: false,
        saveUninitialized: true
    })
);

//routing betöltése
require("./route/routes")(app);

//error esetén
app.use((err, req, res, next) => {
    res.end("There was a problem.");
    console.log(err);
});

//szerver indítása
const server = app.listen(3000, function () {
    console.log("Szia :3000");
})