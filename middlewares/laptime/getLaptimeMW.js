/*
    A laptimeid-nak megfelelő laptime-ot adja meg az adatbázisból, ha nincs ilyen, átirányít /laptimes/:userid-ra
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository){

    const LaptimeModel= requireOption(objectrepository, "LaptimeModel");

    return function (req, res, next){

        LaptimeModel.findOne({_id: req.params.laptimeid},(err,time)=>{
            if (err || !time){
                return res.redirect("/laptimes/" + res.locals.user._id);
            }
            res.locals.laptime = time;
            return next();
        });
    };
};