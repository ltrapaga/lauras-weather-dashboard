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
        response.json().then(function (data) {
        console.log(data)
        var currentDate = new Date(data.dt * 1000);
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();
        var year = currentDate.getFullYear();
            nameEl.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ")";
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            currentPicEl.setAttribute("alt", data.weather[0].description);
            currentTemperatureEl.innerHTML = "Temperature: " + Math.floor(data.main.temp) + " &#176F";
            currentHumidityEl.innerHTML = "Humidity: " + Math.floor(data.main.humidity) + "%";
            currentWindEl.innerHTML = "Wind Speed: " + Math.floor(data.wind.speed) + " mph";

            var cityID = data.id;
            var forecastURl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey + "&units=imperial";
            fetch(forecastURl).then(function (response) {
                response.json().then(function (forecastData) {
                console.log(forecastData);
                var forecast = document.querySelectorAll(".forecast");
                    for (i = 0; i < forecast.length; i++) {
                        forecast[i].innerHTML = "";
                    var forecastIndex = i * 8 + 4;
                    var forecastDate = new Date(forecastData.list[forecastIndex].dt * 1000);
                    var forecastDay = forecastDate.getDate();
                    var forecastMonth = forecastDate.getMonth() + 1;
                    var forecastYear = forecastDate.getFullYear();
                    var forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecast[i].append(forecastDateEl);
                        
                    var forecastWeatherEl = document.createElement("img");
                        forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastData.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastWeatherEl.setAttribute("alt", forecastData.list[0].description);
                        forecast[i].append(forecastWeatherEl);
            
                    var forecastTempEl = document.createElement("p");
                        forecastTempEl.innerHTML = "Temperature: " + Math.floor(forecastData.list[forecastIndex].main.temp) + " &#176F";
                        forecast[i].append(forecastTempEl);

                    var forecastHumidityEl = document.createElement("p");
                        forecastHumidityEl.innerHTML = "Humidity: " + forecastData.list[forecastIndex].main.humidity + "%";
                        forecast[i].append(forecastHumidityEl);
                    
                    var forecastWindEl = document.createElement("p");
                        forecastWindEl.innerHTML = "Wind Speed: " + Math.floor(forecastData.list[forecastIndex].wind.speed) + " mph";
                        forecast[i].append(forecastWindEl);
                    }
                })
            });
        });
        
    })
}

searchEl.addEventListener("click", function() {
    var searched = inputEl.value; 
        getWeather(searched);
        searchHistory.push(searched);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
})

clearEl.addEventListener("click", function() {
    searchHistory = [];
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

function renderSearchHistory() {
    historyEl.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
        let historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("style", "margin-bottom: 10px;");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block text-center bg-grey font-weight-bold");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function() {
            getWeather(historyItem.value);
        })
        historyEl.append(historyItem);
    }
}

renderSearchHistory();