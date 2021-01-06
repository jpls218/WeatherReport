$(document).ready(function() {
var date = moment().format('MMMM Do YYYY');
var APIkey = "e9cacb88c04b1384f06dcfa1e16680a8";
var tRow = $("#today");
var forRow = $("#forecast");
var searchValue;
var longitude;
var latitude;

$("#search-button").on("click", function(){
    searchValue  = $("#search-value").val()
    $("#search-value").val("")
    searchWeather(searchValue);
})

function createRow(response) {
    // Create a new table row element
    var todaysForecast = $("<h5>").text(searchValue + ": " + date)
    var weatherIcon = $("<img>");
    weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon+ ".png")
    todaysForecast.append(weatherIcon);
    console.log(weatherIcon);
    

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var temp = $("<div>")
    temp.text("Temperature: " + response.main.temp);
    console.log("test");
    var humidity = $("<div>").text("Humidity: " + response.main.humidity);
    var windSpeed = $("<div>").text("Wind Speed: " + response.wind.speed);
    

    latitude = response.coord.lat;
    longitude = response.coord.lon;

      
    // Append the newly created table data to the table row
    tRow.append(todaysForecast, temp, humidity, windSpeed);
    // Append the table row to the table body
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey
    
    }).then(function(UVIndex) {
        console.log(UVIndex)
        // tRow.append(UVIndex)
        var UVIndex = $("<div>").text("UV Index: ");
        var UVIndexIcon = $("<div>").text(UVIndex.value);
        UVIndexIcon.attr("class", "badge badge-danger");
        UVIndex.append(UVIndexIcon);
        console.log(UVIndex);
        // var UVIndexValue = UVIndex.value;
        // UVIndexIcon.attr("class", "badge badge-danger");
        // var UVIndex = $("<div>").text("UV Index: " + UVIndexValue);
        // // UVIndex.attr("class", "badge badge-danger");
        tRow.append(UVIndex);
    })
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&units=imperial" + "&appid=" + APIkey
    }).then(function(fiveDay) {
        console.log(fiveDay)
        var forTemp = $("<div>").text("Temperature: " + fiveDay.list[4].main.temp + "°F")
        $("#day1").append(forTemp)
        console.log(fiveDay.list[12].main.temp)
        
        
    })
};

function searchWeather(searchValue) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial" + "&appid=" + APIkey,
    
    }).then(function(response) {
        console.log(response);
        createRow(response);
    })
}


})