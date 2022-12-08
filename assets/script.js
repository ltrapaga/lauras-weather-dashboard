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

// API key for OpenWeatherMap
var apiKey = "a1758075041b34824c88af5ed3a5b0df";

function getWeather(city) {
    /* GET request for current weather conditions in the city typed in the search box by the user. 
    This city is saved to local storage once searched.
    GET request also functions when a city that was previously saved to local storage is selected from the search history list. */
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    fetch(apiURL).then(function (response) {
        // Returns promise and resolves by parsing the body text as JSON
        response.json().then(function (data) {
        // Print current conditions JSON data to the console
        console.log(data)
        // Date objects used to obtain the current date
        var currentDate = new Date(data.dt * 1000);
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();
        var year = currentDate.getFullYear();
            nameEl.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ")";
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            currentPicEl.setAttribute("alt", data.weather[0].description);
            // Obtains current temperature in fahrenheit
            currentTemperatureEl.innerHTML = "Temperature: " + Math.floor(data.main.temp) + " &#176F";
            // Obtains current humidity percentage
            currentHumidityEl.innerHTML = "Humidity: " + Math.floor(data.main.humidity) + "%";
            // Obtains current wind speed in miles per hour
            currentWindEl.innerHTML = "Wind Speed: " + Math.floor(data.wind.speed) + " mph";

            /* GET request for 5-day forecast of the city typed in the search box by the user. 
            This city is saved to local storage once searched.
            GET request also functions when a city that was previously saved to local storage is selected from the search history list. */
            var cityID = data.id;
            var forecastURl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey + "&units=imperial";
            fetch(forecastURl).then(function (response) {
                // Returns promise and resolves by parsing the body text as JSON
                response.json().then(function (forecastData) {
                // Print forecast JSON data to the console
                console.log(forecastData);
                var forecast = document.querySelectorAll(".forecast");
                    for (i = 0; i < forecast.length; i++) {
                        forecast[i].innerHTML = "";
                        // forecastIndex variable selects data from forecast.length array for every five days only
                    var forecastIndex = i * 8 + 4;
                        // Date objects used to obtain the date for each day of the forecast
                    var forecastDate = new Date(forecastData.list[forecastIndex].dt * 1000);
                    var forecastDay = forecastDate.getDate();
                    var forecastMonth = forecastDate.getMonth() + 1;
                    var forecastYear = forecastDate.getFullYear();
                    var forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecast[i].append(forecastDateEl);
                        // Obtains weather icons for each day of the forecast
                    var forecastWeatherEl = document.createElement("img");
                        forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastData.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastWeatherEl.setAttribute("alt", forecastData.list[0].description);
                        forecast[i].append(forecastWeatherEl);
                        // Obtains temperature in fahrenheit for each day of the forecast
                    var forecastTempEl = document.createElement("p");
                        forecastTempEl.innerHTML = "Temperature: " + Math.floor(forecastData.list[forecastIndex].main.temp) + " &#176F";
                        forecast[i].append(forecastTempEl);
                        // Obtains humidity percentage for each day of the forecast
                    var forecastHumidityEl = document.createElement("p");
                        forecastHumidityEl.innerHTML = "Humidity: " + forecastData.list[forecastIndex].main.humidity + "%";
                        forecast[i].append(forecastHumidityEl);
                        // Obtains wind speed in miles per hour for each day of the forecast
                    var forecastWindEl = document.createElement("p");
                        forecastWindEl.innerHTML = "Wind Speed: " + Math.floor(forecastData.list[forecastIndex].wind.speed) + " mph";
                        forecast[i].append(forecastWindEl);
                    }
                })
            });
        });
        
    })
}

function renderSearchHistory() {
    // Creates list of previously searched cities
    historyEl.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
        let historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("style", "margin-bottom: 10px;");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block text-center bg-grey font-weight-bold");
        historyItem.setAttribute("value", searchHistory[i]);
        // Adds click event to each city in the search history list
        historyItem.addEventListener("click", function() {
            // Calls getWeather function when a city is clicked to obtain that city's current weather conditions and 5-day forecast
            getWeather(historyItem.value);
        })
        // Displays current weather conditions and 5-day forecast
        historyEl.append(historyItem);
    }
}

// Adds click event to search button
searchEl.addEventListener("click", function() {
    var searched = inputEl.value;
        // Calls getWeather function to obtain current weather conditions and 5-day forecast of the city typed in by the user
        getWeather(searched);
        searchHistory.push(searched);
        // Saves searched city to local storage
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
})

// Adds click event to clear history button
clearEl.addEventListener("click", function() {
    // Sets search history to empty array
    searchHistory = [];
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

renderSearchHistory();