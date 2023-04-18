const expect = require("chai").expect;
const getLaptimeMW = require("../../../../middlewares/laptime/getLaptimeMW");

describe("getLaptime middleware ", function () {

    it("should set res.locals.laptime", function (done) {
        const mw =getLaptimeMW({
            LaptimeModel: {
                findOne: (param1, cb)=>{
                    expect(param1).to.be.eql({_id:18});
                    cb(null,"laptime");
                }
            }
        });

        const resMock={
            locals:{}
        };

        mw({
                params:{
                    laptimeid: 18
                }
            },resMock,
            ()=>{
                expect(resMock.locals).to.be.eql({laptime:"laptime"});
                done();
            });
    });

    it("should get error", function (done) {
        const mw =getLaptimeMW({
            LaptimeModel: {
                findOne: (param1, cb)=>{
                    expect(param1).to.be.eql({_id:18});
                    cb("laptimeszeruseg",null);
                }
            }
        });

        const resMock={
            locals:{
                user: {
                    _id: 3
                }
            },
            redirect:(param1)=>{
                expect(param1).to.be.eql("/laptimes/3");
                done();
            }
        };

        mw({
                params:{
                    laptimeid: 18
                }
            },resMock,
            (err)=>{
               //no next
            });
    });

    it("should not found laptime", function (done) {
        const mw =getLaptimeMW({
            LaptimeModel: {
                findOne: (param1, cb)=>{
                    expect(param1).to.be.eql({_id:18});
                    cb(undefined,null);
                }
            }
        });

        const resMock={
            locals:{
                user: {
                    _id: 3
                }
            },
            redirect:(param1)=>{
                expect(param1).to.be.eql("/laptimes/3");
                done();
            }
        };

        mw({
                params:{
                    laptimeid: 18
                }
            },resMock,
            (err)=>{
                //no next
            });
    });
});