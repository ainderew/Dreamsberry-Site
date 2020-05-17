const mongoose = require("mongoose");
require("dotenv/config");


//connect to mongodb
const DB_CONNECT = () => {
    mongoose.connect(process.env.DB_CONNECTION,
        { useNewUrlParser: true, useUnifiedTopology: true }, () => {
            console.log("DB connected")
        });
}

module.exports = DB_CONNECT;
    


