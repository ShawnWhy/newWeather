// const process = require("../node_modules/process")
// console.log(process);
// console.log(process.env.apikey);
var searchOptions = [
"Currentweather",
"Forecast"
// "Search",
// "History",
// "Marine",
// "Future",
// "TimeZone",
// "Sports",
// "Astronomy",
// "IP"
]

videoUrls={
  "rain":"./night clear.mov",
  "clear":"./day.mov",
  "cloudy":"./day.mov",
  "overcast":"./day.mov",
  "snow":"./snow.mp4",
  "nightClear":"./night clear.mov",
  "nightCloudy":"./night.mov",
  "nightOvercast":"./night wind.mov",
  "nightRain":"./night wind.mov",
  "nightSnow":"./night wind.mov",
}
//list the current.text variations in the weatherapi documentation
weatherconditions = [
"Partly cloudy", 
"Clear",
"Cloudy",
"Overcast",
"Patchy rain possible",
"Patchy snow possible",
"Patchy sleet possible",
"Patchy freezing drizzle possible",
"Thundery outbreaks possible",
"Blowing snow",
"Blizzard",
"Fog",
"Freezing fog",
"Patchy light drizzle",
"Light drizzle",
"Freezing drizzle",
"Heavy freezing drizzle",
"Patchy light rain",
"Light rain",
"Moderate rain at times",
"Moderate rain",
"Heavy rain at times",
"Heavy rain",
"Light freezing rain",
"Moderate or heavy freezing rain",
"Light sleet",
"Moderate or heavy sleet",
"Patchy light snow",
"Light snow",
"Patchy moderate snow",
"Moderate snow",
"Patchy heavy snow",
"Heavy snow",
"Ice pellets",
"Light rain shower",
"Moderate or heavy rain shower",
"Torrential rain shower",
"Light sleet showers",
"Moderate or heavy sleet showers",
"Light snow showers",
"Moderate or heavy snow showers",
"Light showers of ice pellets",
"Moderate or heavy showers of ice pellets",
"Patchy light rain in area with thunder",
"Moderate or heavy rain in area with thunder",
"Patchy light snow in area with thunder",
"Moderate or heavy snow in area with thunder"
]
// console.log(weatherconditions);
// last_updated_epoch
// last_updated
// temp_c
// temp_f
// is_day
// text
// icon
// code
// wind_mph
// wind_kph
// wind_degree
// wind_dir
// pressure_mb
// pressure_in
// precip_mm
// precip_in
// humidity
// cloud
// feelslike_c
// feelslike_f
// vis_km
// vis_miles
// gust_mph
// gust_kph
// uv
function processWeatherData(data){

  if(data.forecast){
    console.log("forecast")
  //interate through the forecast array
  for(i=0;i<data.forecast.forecastday.length;i++){
    //create a new div for each day
    console.log("forcsrday")
    console.log(data.forecast.forecastday[i]);
    var day = $("<div>");
    //add the date to the div
    //add another div to store the date 
    var date = $("<div>");
    //add the date to the div
    date.html(data.forecast.forecastday[i].date);
    //create a div to store the array of weather conditions
    var conditions = $("<div>");
    //add the conditions to the div
    for(j=0;j<data.forecast.forecastday[i].hour.length;j++){
      //create a div to store the weather conditions
      console.log('hour')
      var condition = $("<div>");
      console.log(data.forecast.forecastday[i].hour[j].condition.text)
      //add the conditions to the div
      condition.html(
        data.forecast.forecastday[i].hour[j].time + ":" +  data.forecast
          .forecastday[i].hour[j].condition.text
      );
      //append the div to the forecast div
      conditions.append(condition);
      

  }
  day.append(day)
  //append conditions to the day div
  day.append(conditions);
}
    $("#forecast").append(day);
}

  console.log(data);
  console.log(data.current.condition);
if(data.error){
  console.log(data.error.message);
  return;

}
//if the string "rain" is in the data.text string

if(data.current.is_day){
  console.log(data.current.condition.text.toLowerCase());
  console.log(data.current.condition.text.toLowerCase().includes("sunny"))
  //if data.text string contains the string "rain"
if(data.current.condition.text.toLowerCase().includes("rain")
|| data.current.condition.text.toLowerCase().includes("drizzle")
|| data.current.condition.text.toLowerCase().includes("shower")
|| data.current.condition.text.toLowerCase().includes("thunder")
|| data.current.condition.text.toLowerCase().includes("torrential")
){
  $("#video").attr("src", videoUrls.rain)
}
else if(data.current.condition.text.toLowerCase().includes("snow")
|| data.current.condition.text.toLowerCase().includes("sleet")
|| data.current.condition.text.toLowerCase().includes("ice")
|| data.current.condition.text.toLowerCase().includes("blizzard")
|| data.current.condition.text.toLowerCase().includes("pellets")
){
  $("#video").attr("src", videoUrls.snow)
  
}
else if(data.current.condition.text.toLowerCase().includes("cloud")
|| data.current.condition.text.toLowerCase().includes("overcast")
|| data.current.condition.text.toLowerCase().includes("fog")
|| data.current.condition.text.toLowerCase().includes("blowing")
|| data.current.condition.text.toLowerCase().includes("patchy")
){
  $("#video").attr("src", videoUrls.cloudy)
}

else{
  console.log("clear");
  console.log(videoUrls.clear);
  $("#video").attr("src", videoUrls.clear)
  console.log($("#video").attr("src"));
}
}
else{

  if (
    data.current.condition.text.toLowerCase().includes("rain") ||
    data.current.condition.text.toLowerCase().includes("drizzle") ||
    data.current.condition.text.toLowerCase().includes("shower") ||
    data.current.condition.text.toLowerCase().includes("thunder") ||
    data.current.condition.text.toLowerCase().includes("torrential")
  ) {
    $("#video").attr("src", videoUrls.nightRain);
  } else if (
    data.current.condition.text.toLowerCase().includes("snow") ||
    data.current.condition.text.toLowerCase().includes("sleet") ||
    data.current.condition.text.toLowerCase().includes("ice") ||
    data.current.condition.text.toLowerCase().includes("blizzard") ||
    data.current.condition.text.toLowerCase().includes("pellets")
  ) {
    $("#video").attr("src", videoUrls.nightSnow);
  } else if (
    data.current.condition.text.toLowerCase().includes("cloud") ||
    data.current.condition.text.toLowerCase().includes("overcast") ||
    data.current.condition.text.toLowerCase().includes("fog") ||
    data.current.condition.text.toLowerCase().includes("blowing") ||
    data.current.condition.text.toLowerCase().includes("patchy")
  ) {
    $("#video").attr("src", videoUrls.nightCloudy);
  } else {
    $("#video").attr("src", videoUrls.nightClear);
  }


}



console.log(data.current.temp_c)
console.log(data.current.temp_f);
console.log(data.current.is_day);
$("#condition").html(data.current.condition.text);
$("#condition").css("background","url("+ data.current.condition.icon+")")
$("#tempc").html(data.current.temp_c);
$("#tempf").html(data.current.temp_f);
if (data.current.is_day){
$("#isDay").html("Day time");
} 
else{
$("#isDay").html("Night time");
}



}

for(i=0;i<searchOptions.length;i++){
  var option = $("<option>")
  option.val(searchOptions[i]);
  option.html(searchOptions[i]);
  // console.log(option);
  
  $("#searchOptions").append(option)
}

$("#submitForm").submit((e) => {
  console.log("submit")
  console.log({
    search: $("#query").val(),
    choice: $("#searchOptions").val(),
  });
  e.stopPropagation()
  e.preventDefault()

  if ($("#query").val().length>3){
    $.ajax({
      type: "post",
      url: "http://localhost:3011/api/getWeatherData",
      data: {
        search: $("#query").val(),
        choice: $("#searchOptions").val(),
      },
      dataType: "JSON",
      success: function (response) {processWeatherData(response)},
    });
  }
})




// api key =

// location entered in input
// for the following
// tempereture - toggle c and F
// weather description
// windspeed
// huminity percentage
