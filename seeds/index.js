const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias corporis impedit magnam cupiditate iusto in eius sunt error, id ad autem a tempore placeat itaque nam voluptatibus voluptate qui reprehenderit.",
            price,
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connect.close();
});
