const assert = require("assert");
const GuestReservation = require("./models/GuestReservations")
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kalanggaman:kalanggaman@cluster0-ucrf4.mongodb.net/Reservations",
{ useNewUrlParser: true, useUnifiedTopology: true },
()=>{
    console.log("connected to DB");
});

describe("saving test",()=>{
    it("saving record to database",function(done){
        let guest1 = new GuestReservation({
            name: "Andrew",
            phoneNumber: 0917546
        });

        guest1.save().then(function(){
                assert(!guest1.isNew);
            })
            done();
    });
});

// const guest2 = new GuestReservation({
//     name: "marvin",
//     phoneNumber: 091231
// })
