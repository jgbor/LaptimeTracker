/*
    A biztonsági kérdésre adott választ ellenőrzi, ha az nem jó, jelzi a felhasználónak
    Ha helyes a válasz, megmutatja az elfelejtett jelszót a felhasználónak
 */
module.exports = function (objectrepository){

    return function (req, res, next){
        if (typeof req.body.answer === "undefined"){
            return next();
        }

        if (req.body.answer !== res.locals.user.answer){
            res.locals.error = "Wrong answer!";
            return next();
        }

        if (req.body.answer === res.locals.user.answer){
            res.locals.error = "Password: " + res.locals.user.password;
            return next();
        }
    };
};