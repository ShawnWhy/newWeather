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

function processWeatherData(data){
console.log(data);
console.log(data.current.condition)
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
