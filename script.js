$(document).ready(function() {
var date = moment().format('MMMM Do YYYY');
var APIkey = "e9cacb88c04b1384f06dcfa1e16680a8";
var tRow = $("#today");
var forRow = $("#forecast");
var searchValue;
var longitude;
var latitude;
var city;
var historyEl = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];    

$("#search-button").on("click", function(){
    searchValue  = $("#search-value").val()
    searchWeather(searchValue);
    searchHistory.push(searchValue);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();     
})

$("#clear-history").on("click",function() {
    searchHistory = [];
    renderSearchHistory();
    localStorage.clear();
})

function renderSearchHistory() {
    $("#history").text("");
    for (let i=0; i<searchHistory.length; i++) {
        const historyItem = $("<button>");
        historyItem.text(searchHistory[i]);
        historyItem.attr("readonly",true);
        historyItem.attr("class", "form-control d-block bg-white");
        // historyItem.attr("value", searchHistory[i]);
        historyItem.on("click",function() {
            getWeather(historyItem.val());
        })
        $("#history").prepend(historyItem);
    }
}

renderSearchHistory();
if (searchHistory.length > 0) {
    createRow(searchHistory[searchHistory.length - 1]);
}

function createRow(response) {
    tRow.empty();
    // Create a new table row element
    var todaysForecast = $("<h5>").text(searchValue + ": " + date)
    var weatherIcon = $("<img>");
    weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon+ ".png")
    todaysForecast.append(weatherIcon);

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var temp = $("<div>")
    temp.text("Temperature: " + response.main.temp + "°F");  
    var humidity = $("<div>").text("Humidity: " + response.main.humidity + "%");
    var windSpeed = $("<div>").text("Wind Speed: " + response.wind.speed + "MPH");
    latitude = response.coord.lat;
    longitude = response.coord.lon;   
    // Append the newly created table data to the table row
    tRow.append(todaysForecast, temp, humidity, windSpeed);
    // Append the table row to the table body
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey  
    }).then(function(UVIndex) {
        console.log(UVIndex)     
        var UVIndex = $("<div>").text("UV Index: " + UVIndex.value);      
        tRow.append(UVIndex);          
    })
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&units=imperial" + "&appid=" + APIkey
    }).then(function(fiveDay) {
        // Ensures only one city forecast is seen
        $("#fiveFor").empty();
        var fiveFor = $("<div>").text("5-Day Forecast");
        $("#fiveFor").append(fiveFor);
        // $("#forecast").prepend(forecastAlert);
        $("#day1").empty();
        // Creating date in forecast
        var forDate = $("<div>").text(moment().add(1, 'days').format('MMMM Do YYYY'));
        $("#day1").append(forDate)
        var forIcon = $("<img>");
        forIcon.attr("src", "https://openweathermap.org/img/wn/" + fiveDay.list[4].weather[0].icon+ ".png")
        $("#day1").append(forIcon);
        var forTemp = $("<div>").text("Temperature: " + fiveDay.list[4].main.temp + "°F")
        $("#day1").append(forTemp) 
        var forHum = $("<div>").text("Humidity: " + fiveDay.list[4].main.humidity + "%")
        $("#day1").append(forHum)
        $("#day2").empty();
        var forDate = $("<div>").text(moment().add(2, 'days').format('MMMM Do YYYY'));
        $("#day2").append(forDate)
        var forIcon = $("<img>");
        forIcon.attr("src", "https://openweathermap.org/img/wn/" + fiveDay.list[11].weather[0].icon+ ".png")
        $("#day2").append(forIcon);
        var forTemp = $("<div>").text("Temperature: " + fiveDay.list[11].main.temp + "°F")
        $("#day2").append(forTemp) 
        var forHum = $("<div>").text("Humidity: " + fiveDay.list[11].main.humidity + "%")
        $("#day2").append(forHum)
        $("#day3").empty();
        var forDate = $("<div>").text(moment().add(3, 'days').format('MMMM Do YYYY'));     
        $("#day3").append(forDate)
        var forIcon = $("<img>");
        forIcon.attr("src", "https://openweathermap.org/img/wn/" + fiveDay.list[19].weather[0].icon + ".png")
        $("#day3").append(forIcon);
        var forTemp = $("<div>").text("Temperature: " + fiveDay.list[19].main.temp + "°F")
        $("#day3").append(forTemp)   
        var forHum = $("<div>").text("Humidity: " + fiveDay.list[19].main.humidity + "%")
        $("#day3").append(forHum)
        $("#day4").empty();
        var forDate = $("<div>").text(moment().add(4, 'days').format('MMMM Do YYYY'));   
        $("#day4").append(forDate)
        var forIcon = $("<img>");
        forIcon.attr("src", "https://openweathermap.org/img/wn/" + fiveDay.list[27].weather[0].icon+ ".png")
        $("#day4").append(forIcon);
        var forTemp = $("<div>").text("Temperature: " + fiveDay.list[27].main.temp + "°F")
        $("#day4").append(forTemp)  
        var forHum = $("<div>").text("Humidity: " + fiveDay.list[27].main.humidity + "%")
        $("#day4").append(forHum)  
        $("#day5").empty();
        var forDate = $("<div>").text(moment().add(5, 'days').format('MMMM Do YYYY'));
        $("#day5").append(forDate)
        var forIcon = $("<img>");
        forIcon.attr("src", "https://openweathermap.org/img/wn/" + fiveDay.list[35].weather[0].icon+ ".png")
        $("#day5").append(forIcon);
        var forTemp = $("<div>").text("Temperature: " + fiveDay.list[35].main.temp + "°F")
        $("#day5").append(forTemp)
        var forHum = $("<div>").text("Humidity: " + fiveDay.list[35].main.humidity + "%")
        $("#day5").append(forHum)      
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