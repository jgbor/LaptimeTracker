/*
    Ellenőrzi, hogy van-e a felhasználó által megadott userid a rendszerben, mikor az elfelejtett jelszó funkciónál megadja.
    Ha nincs, jelzi ezt felé
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository){

    const UserModel = requireOption(objectrepository,"UserModel");

    return function (req, res, next){
        if (typeof req.body.username === "undefined"){
            return next();
        }

        UserModel.findOne({username: req.body.username}, (err, user)=>{

            if (err || !user) {
                res.locals.error = "User not found!";
                return next();
            }
            return res.redirect("/forgotpassw/"+ user._id);
        });
    };
};