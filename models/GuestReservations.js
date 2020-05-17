const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: Number,
});

const GuestReservation = mongoose.model("GuestReservation",ReservationSchema);

module.exports = GuestReservation;