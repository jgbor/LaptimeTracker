/*
    Törli a res.locals.laptime-ot az adatok közül
 */

module.exports = function (objectrepository){

    return function (req, res, next){
        if (typeof res.locals.laptime === "undefined") {
            return next();
        }

        res.locals.laptime.remove((err)=>{
            if (err){
                return next(err);
            }
        })

        return res.redirect("/laptimes/"+res.locals.user._id);
    };
};