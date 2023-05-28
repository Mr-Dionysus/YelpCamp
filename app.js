//Connecting all needed npm modules
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

//Connecting to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/yelp-camp", {
        useNewUrlParser: true,
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

app.get("/makecampground", async (req, res) => {
    const camp = new Campground({
        title: "My Backyard",
        price: "$100",
    });
    await camp.save();
    res.send(camp);
});

app.listen(3000, () => {
    console.log("Port 3000 is working");
});
