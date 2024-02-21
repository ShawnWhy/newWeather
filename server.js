const express = require("express");
var path = require("path");
const axios = require("axios");
console.log(process.env.apikey);
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

app.get("/api/getWeatherData",async (req,res)=>{
  var searchUrl = weatherUrlHead + weatherChoices[req.body.choice] + "?key="+apikey+" q="+ req.body.search
    try {
    const response = await axios.get(searchUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

server.listen(port, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${port}!`);
});
