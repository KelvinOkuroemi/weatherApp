const express = require("express");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const bodyParser = require("body-parser");

const https = require("https");
const { request } = require("http");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Render HTML file when the server receives get request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Do this when the serve receivesr a post request 
app.post("/", (req, res) => {
  let query = req.body.cityName;
  console.log(query)
  let apiKey = "cb0a438d59fce11598e57e73c602bed4";
  let metric = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${metric}`;
  https.get(url, (response) => {
    console.log(response);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        `<h1>The temperature in ${query} is ${temp} degrees celcius</h1>`
      );
      res.write(
        `<p>The weather description is ${weatherDescription}</p>`
      );
      res.write(`<img src=${imageUrl}>`);
    });
  });
});

app.listen(3000, function () {
  console.log("app is running");
});
