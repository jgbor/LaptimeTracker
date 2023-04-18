/*
    A userid-hoz (felhasználóhoz) kapcsolódó összes köridőt lekéri
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository){

    const LaptimeModel= requireOption(objectrepository, "LaptimeModel");

    return function (req, res, next){
        if (typeof res.locals.user === "undefined"){
            return next();
        }

        LaptimeModel.find({_driver: req.params.userid}, (err, laptimes)=> {
            if (err){
                return next(err);
            }

            res.locals.laptimes = laptimes;
            return next();
        });
    };
};