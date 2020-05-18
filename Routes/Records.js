const express = require("express");
const router = express.Router();
const reservation = require("../models/GuestReservations")

router.post("/", async (req,res) =>{
    const post = new reservation({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
    post.save();
    res.redirect("http://127.0.0.1:5500/Front_End/index.html");
})

module.exports = router;