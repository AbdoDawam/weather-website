const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const public_dir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static Directory to serve
app.use(express.static(public_dir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abdo Dawam",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Abdo Dawam",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Abdo",
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address must be provided",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please Enter the Search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help Article Not Found",
    name: "Abdo Dawam",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page Not Found",
    name: "Abdo Dawam",
  });
});

app.listen(3000, () => {
  console.log("Server is listen in port 3000");
});
