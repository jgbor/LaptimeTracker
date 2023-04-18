/*
    A felhasználó által megadott új köridőt (laptime-ot) menti el
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository){

    const LaptimeModel= requireOption(objectrepository, "LaptimeModel");

    return function (req, res, next){
        if ((typeof req.body.car === "undefined") ||
            (typeof req.body.track === "undefined") ||
            (typeof req.body.weather === "undefined") ||
            (typeof req.body.time === "undefined")){
            return next();
        }

        if ((req.body.car === "") ||
            (req.body.track === "") ||
            (req.body.time === "")) {
            res.locals.error = "You have to fill in all of the above!";
            return next();
        }

        if(typeof res.locals.laptime === "undefined"){
            res.locals.laptime = new LaptimeModel();
        }

        res.locals.laptime.car = req.body.car;
        res.locals.laptime.track = req.body.track;
        res.locals.laptime.weather = req.body.weather;
        res.locals.laptime.time = req.body.time;
        res.locals.laptime._driver = res.locals.user;

        res.locals.laptime.save((err) => {
            if (err){
                return next(err);
            }

            return res.redirect("/laptimes/" + res.locals.user.username);
        })
    };
};