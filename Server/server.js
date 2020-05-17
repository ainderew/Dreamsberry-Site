const express = require("express");
const app = express();
const DB_CONNECT = require("./connection");
const cors = require("cors");

DB_CONNECT();

//Import Routes
const reserveRoute = require("../Routes/Reserve");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/reserve", reserveRoute);
    

app.get("/",(req,res) => {
    res.send("Home");
});

app.get("/user", (req,res) => {
    res.send("THIS IS THE USER PAGE");
})


app.listen(3000);