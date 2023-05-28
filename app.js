//Connecting all needed npm modules
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

//Connecting to MongoDB
mongoose
    .connect("mongodb://localhost:27017/yelp-camp", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB is working");
    })
    .catch(err => {
        console.log(err);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.send("Cool");
});

app.listen(3000, () => {
    console.log("Port 3000 is working");
});
