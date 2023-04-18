/*
    Kilépteti a felhasználót
 */
module.exports = function (objectrepository){

    return function (req, res, next){
        req.session.destroy((err) => {
            return res.redirect("/");
        });
    };
};