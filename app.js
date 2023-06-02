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

//Method Override
app.use(methodOverride("_method"));

//For req.body to be filled with info
app.use(express.urlencoded({ extended: true }));

//Main page with all campgrounds
app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

//Page for creating new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

//Request to create new campground
app.post("/campgrounds", async (req, res) => {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
});

//Page with details about campground
app.get("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const campgroundDetails = await Campground.findById(id);
    res.render("campgrounds/show", { campgroundDetails });
});

//Page with editing feature
app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
});

//Apply changes to campground
app.put("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const campground = req.body.campground;
    await Campground.findByIdAndUpdate(id, campground);
    res.redirect(`${id}`);
});

//Delete campground
app.delete("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
});

//Test
app.listen(3000, () => {
    console.log("Port 3000 is working");
});
