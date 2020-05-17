const express = require("express");
const router = express.Router();
const post = require("../models/GuestReservations")


router.get("/", async (req,res) => {
    try{
        const data = await post.find()
        res.json(data);
    }catch(err){
        res.json(err);
    }
});


module.exports = router;