// const process = require("../node_modules/process")
// console.log(process);
// console.log(process.env.apikey);

$("#submitForm").submit((e) => {
  if ($("#query").val().length>3){
    fetch("http://localhost:3011/api/getWeatherData", {
      searchdata: $("#query").val(),
    })
      .then((response) => response.json())
      .then((data) => {
        processWeatherData(data);
      })
      .catch((error) => console.error("Error:", error));
}
});

// api key =

// location entered in input
// for the following
// tempereture - toggle c and F
// weather description
// windspeed
// huminity percentage
