// Variables
var nameEl = document.getElementById("city-name");
var historyEl = document.getElementById("history");
var inputEl = document.getElementById("city-input");
var clearEl = document.getElementById("clear-history");
var searchEl = document.getElementById("search-button");
var currentWindEl = document.getElementById("wind-speed");
var currentPicEl = document.getElementById("current-pic");
var currentHumidityEl = document.getElementById("humidity");
var currentTemperatureEl = document.getElementById("temperature");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];