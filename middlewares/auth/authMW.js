/*
    Ha nincs bejelentkezve a felhasználó, átírányít /-re
 */
module.exports = function (objectrepository){

    return function (req, res, next){
        if (typeof req.session.userid === "undefined") {
            return res.redirect("/login");
        }

        if (req.session.userid !== req.params.userid) {
            return res.redirect("/laptimes/" + req.session.userid);
        }

        return next();
    };
};