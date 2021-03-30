//express is actually an object/function
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

//const port = process.env.PORT || 3000;

//Define paths for the ex[ress config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

//setup handle bars and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Lj Santos",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Lj Santos",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "What can I do for you my friend",
    name: "Lj Santos",
  });
});
//this method will get the resources that accepts 2 arguments the route and the next one is a a function that will describe when we enter the first argument or when we get the domain route
// this function called to argument first is the containing the information about the incoming request server "REQ" short for request
// the second is response or "res" that contains a bunch of methods allowing us to customize what we're going to send back to the requester

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: "You must provide address to search",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/product", (req, res) => {
  if (!res.query.search) {
    return res.send({
      errorMessage: "You must provide search term",
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Lj Santos",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Lj Santos",
    errorMessage: "Page not found",
  });
});

// app.com
// app.com/help
// app.com/about

//We need to open a server to open this we need to call this method
app.listen(port, () => {
  console.log("server is up on port " + port);
});
