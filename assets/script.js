// Variables
var nameEl = document.querySelector("#city-name");
var historyEl = document.querySelector("#history");
var inputEl = document.querySelector("#city-input");
var clearEl = document.querySelector("#clear-history");
var searchEl = document.querySelector("#search-button");
var currentWindEl = document.querySelector("#wind-speed");
var currentPicEl = document.querySelector("#current-pic");
var currentHumidityEl = document.querySelector("#humidity");
var currentTemperatureEl = document.querySelector("#temperature");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

var apiKey = "a1758075041b34824c88af5ed3a5b0df";

function getWeather(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            var currentDate = new Date(data.dt * 1000);
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();
            var year = currentDate.getFullYear();
                nameEl.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ")";
                currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
                currentPicEl.setAttribute("alt", data.weather[0].description);
                currentTemperatureEl.innerHTML = "Temperature: " + Math.floor(data.main.temp) + " &#176F";
                currentHumidityEl.innerHTML = "Humidity: " + Math.floor(data.main.humidity) + "%";
                currentWindEl.innerHTML = "Wind Speed: " + Math.floor(data.wind.speed) + "mph";
            })
        }
        else {        
        alert("Error: " + response.statusText);
        }
    })
}

searchEl.addEventListener("click", function() {
    var searched = inputEl.value; 
        getWeather(searched);
        searchHistory.push(searched);
        localStorage.setItem("search", JSON.stringify(searchHistory));

})

