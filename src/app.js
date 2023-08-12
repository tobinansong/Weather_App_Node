const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define Paths for Express config
const publicDirectorypath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectorypath));

app.get("", (req, res, next) => {
    res.render("index", {
        title: "Weather App",
        name: "Tobin Ansong",
    })
})

app.get("/about", (req, res, next) => {
    res.render("about", {
        title: "About Owner",
        name: "Tobin Ansong",
    })
})

app.get("/help", (req, res, next) => {
    res.render("help", {
        title: "Help Page",
        name: "Tobin Ansong",
        helpText: "This is some helpful text."
    })
})

app.get("/weather", (req, res, next) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a location"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast: "It always sunnny",
    //     location: "New York",
    //     address: req.query.address
    // })
})


app.get("/products", (req, res, next) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
       
    })
})

app.get("/help/*", (req, res, next) => {
    res.render("help_404", {
    name: "Tobin Ansong",
    })
})

app.get("*", (req, res, next) => {
    res.render("404", {
    name: "Tobin Ansong",
    })
})

app.listen(3000, () => {
    console.log("Server is online on port 3000.")
})