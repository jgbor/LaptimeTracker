const expect = require("chai").expect;
const getUserMW = require("../../../../middlewares/user/getUserMW");

describe("getUser middleware ", function () {

    it("should set res.locals.user", function (done) {
        const mw =getUserMW({
            UserModel: {
                findOne: (param1, cb)=>{
                    expect(param1).to.be.eql({_id:6});
                    cb(null,"user");
                }
            }
        });

        const resMock={
            locals:{}
        };

        mw({
            params:{
                userid: 6
            }
        },resMock,
            ()=>{
            expect(resMock.locals).to.be.eql({user:"user"});
            done();
        });
    });

    it("should get error", function (done) {
        const mw =getUserMW({
            UserModel: {
                findOne: (param1, cb)=>{
                    expect(param1).to.be.eql({_id:6});
                    cb("userszeruseg",null);
                }
            }
        });

        const resMock={
            locals:{}
        };

        mw({
                params:{
                    userid: 6
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql("userszeruseg");
                done();
            });
    });

    it("should not found user", function (done) {
        const mw =getUserMW({
            UserModel: {
                findOne: (param1, cb)=>{
                    expect(param1).to.be.eql({_id:6});
                    cb(undefined,null);
                }
            }
        });

        const resMock={
            locals:{}
        };

        mw({
                params:{
                    userid: 6
                }
            },resMock,
            (err)=>{
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({});
                done();
            });
    });
});