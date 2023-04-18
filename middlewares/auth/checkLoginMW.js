/*
    Ellenőrzi, hogy megfeleő felhasználónév-jelszó páros lett-e megadva bejelentkezésnél, ha nem jó, jelzi
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository){

    const UserModel = requireOption(objectrepository,"UserModel");

    return function (req, res, next){
        if (typeof req.body.password === "undefined" || typeof req.body.username === "undefined"){
            return next();
        }

        UserModel.findOne({username: req.body.username}, (err, user)=>{

            if (err || !user) {
                res.locals.error = "User not found!";
                return next();
            }

            if (user.password !== req.body.password) {
                res.locals.error = "Wrong username-password combination!";
                return next();
            }

            req.session.userid = user._id;

            return req.session.save((err) => {
                res.redirect("/laptimes/"+ req.session.userid)
            });
        });
    };
};