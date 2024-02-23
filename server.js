
const random = require("canvas-sketch-util/random");

import style from "./main.css";
import koro from "./koro.mp4";
import troika from "./troika.mp4";
const express = require("express");
var path = require("path");
const axios = require("axios");
const app = express();
const server = require("http").createServer(app);

var port = process.env.PORT || 3011;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("local"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "local", "index.html"));
});

const weatherUrlHead = "http://api.weatherapi.com/v1";

const weatherChoices={
"Currentweather":	"/current.json",
"Forecast":	"/forecast.json",
"Search":"/search.json",
"History":	"/history.json",
"Marine":	"/marine.json",
"Future":	"/future.json",
"TimeZone":	"/timezone.json",
"Sports":	"/sports.json",
"Astronomy":	"/astronomy.json",
"IP":"/ip.json"
}
const dotenv = require("dotenv");
dotenv.config();
var apikey = process.env.apikey;
console.log("apikey")
console.log(apikey)

app.post("/api/getWeatherData",async (req,res)=>{
  console.log(req.body);
  var searchUrl = weatherUrlHead + weatherChoices[req.body.choice] + "?key="+apikey+"&q="+ req.body.search
  console.log(searchUrl);
    try {
    const response = await axios.get(searchUrl);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

server.listen(port, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${port}!`);
});
