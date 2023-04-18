const renderMW = require("../middlewares/render/renderMW");
const checkLoginMW = require("../middlewares/auth/checkLoginMW");
const checkAnswerMW = require("../middlewares/auth/checkAnswerMW");
const authMW = require("../middlewares/auth/authMW");
const logoutMW = require("../middlewares/auth/logoutMW");
const saveUserMW = require("../middlewares/user/saveUserMW");
const checkUserMW = require("../middlewares/user/checkUserMW");
const getUserMW = require("../middlewares/user/getUserMW");
const getLaptimesMW = require("../middlewares/laptime/getLaptimesMW");
const getLaptimeMW = require("../middlewares/laptime/getLaptimeMW");
const saveLaptimeMW = require("../middlewares/laptime/saveLaptimeMW");
const delLaptimeMW = require("../middlewares/laptime/delLaptimeMW");

const UserModel = require("../models/user");
const LaptimeModel = require("../models/laptime");

module.exports = function (app){
    const objRepo = {
        UserModel: UserModel,
        LaptimeModel: LaptimeModel
    };

    app.use("/login",
        checkLoginMW(objRepo),
        renderMW(objRepo, "index")
    );

    app.use("/register",
        saveUserMW(objRepo),
        renderMW(objRepo, "register")
    );

    app.use("/forgotpassw/:userid",
        getUserMW(objRepo),
        checkAnswerMW(objRepo),
        renderMW(objRepo, "forpass2")
    );

    app.use("/forgotpassw",
        checkUserMW(objRepo),
        renderMW(objRepo, "forpass")
    );

    app.use("/laptimes/:userid/edit/:laptimeid",
        authMW(objRepo),
        getUserMW(objRepo),
        getLaptimeMW(objRepo),
        saveLaptimeMW(objRepo),
        renderMW(objRepo, "addedit")
    );

    app.use("/laptimes/:userid/newtime",
        authMW(objRepo),
        getUserMW(objRepo),
        saveLaptimeMW(objRepo),
        renderMW(objRepo, "addedit")
    );

    app.get("/laptimes/:userid/del/:laptimeid",
        authMW(objRepo),
        getUserMW(objRepo),
        getLaptimeMW(objRepo),
        delLaptimeMW(objRepo)
    );

    app.use("/laptimes/:userid",
        authMW(objRepo),
        getUserMW(objRepo),
        getLaptimesMW(objRepo),
        renderMW(objRepo, "profile")
    );

    app.use("/logout",
        logoutMW(objRepo)
    );

    app.get("/*",
        function(req,res){
            res.redirect("/login");
        }
    );
};