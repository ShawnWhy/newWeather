// const process = require("../node_modules/process")
// console.log(process);
// console.log(process.env.apikey);
var searchOptions = [
"Currentweather",
"Forecast",
"Search",
"History",
"Marine",
"Future",
"TimeZone",
"Sports",
"Astronomy",
"IP"]

for(i=0;i<searchOptions.length;i++){
  var option = $("<option>")
  option.val(searchOptions[i]);
  option.html(searchOptions[i]);
  console.log(option);
  $("#searchOptions").append(option)
}

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
