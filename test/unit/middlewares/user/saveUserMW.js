const expect = require("chai").expect;
const saveUserMW = require("../../../../middlewares/user/saveUserMW");

describe("saveUser middleware ", function () {

    it("should save user", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
                expect(param1).to.be.eql("/login");
                done();
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                //no next
            });
    });

    it("should call next with error, save failed", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb("hiba");
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql("hiba");
                done();
            });
    });

    it("should warn when passwords are not the same", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1235",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(resMock.locals.error).to.be.eql("The two passwords don't match!");
                done();
            });
    });

    it("should create user", function (done) {
        class UserMockModel{
            save(cb){
                cb(null);
            }
        }

        const mw =saveUserMW({
            UserModel: UserMockModel
        });

        const resMock={
            redirect:(param1)=>{
                expect(param1).to.be.eql("/login");
                done();
            },
            locals:{
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                //no next
            });
    });

    it("should warn when name is empty", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(resMock.locals.error).to.be.eql("You have to fill in all of the above!");
                done();
            });
    });

    it("should warn when username is empty", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(resMock.locals.error).to.be.eql("You have to fill in all of the above!");
                done();
            });
    });

    it("should warn when password is empty", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(resMock.locals.error).to.be.eql("You have to fill in all of the above!");
                done();
            });
    });

    it("should warn when password again is empty", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(resMock.locals.error).to.be.eql("You have to fill in all of the above!");
                done();
            });
    });

    it("should warn when answer is empty", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                    answer: ""
                }
            },resMock,
            (err)=>{
                expect(resMock.locals.error).to.be.eql("You have to fill in all of the above!");
                done();
            });
    });

    it("should call next when name is undefined", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                done();
            });
    });

    it("should call next when username is undefined", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                done();
            });
    });

    it("should call next when password is undefined", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    passwordagain: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                done();
            });
    });

    it("should call next when password again is undefined", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    question: 1,
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                done();
            });
    });

    it("should call next when question is undefined", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1234",
                    answer: "Buksi"
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                done();
            });
    });

    it("should call next when answer is undefined", function (done) {
        const mw =saveUserMW({
            UserModel: "usermodel"
        });

        const resMock={
            redirect:(param1)=>{
            },
            locals:{
                user:{
                    save: (cb)=>{
                        cb(null);
                    }
                }
            }
        };

        mw({
                body:{
                    name: "Pista",
                    username: "pityu1987",
                    password: "1234",
                    passwordagain: "1234",
                    question: 1,
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                done();
            });
    });
});