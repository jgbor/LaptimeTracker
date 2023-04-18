/*
    Egy felhasználó adatait menti el az adatbázisba
 */
const requireOption = require("../requireOption");
module.exports = function (objectrepository){

    const UserModel = requireOption(objectrepository, "UserModel");

    return function (req, res, next){
        if ((typeof req.body.name === "undefined") ||
            (typeof req.body.username === "undefined") ||
            (typeof req.body.password === "undefined") ||
            (typeof req.body.passwordagain === "undefined") ||
            (typeof req.body.question === "undefined") ||
            (typeof req.body.answer === "undefined")) {
            return next();
        }

        if ((req.body.name === "") ||
            (req.body.username === "") ||
            (req.body.password === "") ||
            (req.body.passwordagain === "") ||
            (req.body.answer === "")) {
            res.locals.error = "You have to fill in all of the above!";
            return next();
        }

        if (req.body.password !== req.body.passwordagain){
            res.locals.error = "The two passwords don't match!";
            return next();
        }

        if (typeof res.locals.user === "undefined"){
            res.locals.user = new UserModel();
        }

        res.locals.user.name = req.body.name;
        res.locals.user.username = req.body.username;
        res.locals.user.password = req.body.password;
        res.locals.user.question = req.body.question;
        res.locals.user.answer = req.body.answer;

        res.locals.user.save((err)=> {
            if (err) {
                return next(err);
            }
            return res.redirect("/login");
        });
    };
};