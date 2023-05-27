const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.send("Cool");
});

app.listen(3000, () => {
    console.log("Port 3000 working");
});
