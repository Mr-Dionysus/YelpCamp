//Connecting all needed npm modules
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const methodOverride = require("method-override");

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

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.send("Cool");
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

//app.get("/campgrounds/new", (req, res) => {});

app.get("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const campgroundDetails = await Campground.findById(id);
    res.render("campgrounds/show", { campgroundDetails });
});

app.listen(3000, () => {
    console.log("Port 3000 is working");
});
