function currentTime(date) {
  let dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let currentDayOfWeek = dayOfWeek[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${currentDayOfWeek} ${hour}:${minute}`;
}

function search(searchCity) {
  let apiKey = "5515460eda5af0ed162ca73d5a84293d";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function changeCity(event) {
  event.preventDefault();
  hiddenConversion.classList.remove("hidden");
  cConversion.classList.remove("active");
  fConversion.classList.add("active");
  let currentCity = document.querySelector("#current-city");
  let apiKey = "5515460eda5af0ed162ca73d5a84293d";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let heading = document.querySelector("#city-name");
  let temperatureH2 = document.querySelector("#day-zero-temperature");
  let weatherDescriptionData = document.querySelector("#day-zero-description");
  let weatherIconData = document.querySelector("#day-zero-icon");
  let windSpeedData = document.querySelector("#day-zero-wind-speed");
  let humidityData = document.querySelector("#day-zero-humidity");
  heading.innerHTML = response.data.name;
  temperatureH2.innerHTML = Math.round(response.data.main.temp);
  weatherDescriptionData.innerHTML = response.data.weather[0].description;
  weatherIconData.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  windSpeedData.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  humidityData.innerHTML = `${response.data.main.humidity}%`;
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "5515460eda5af0ed162ca73d5a84293d";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastHTML =
        forecastHTML +
        `<div class="col day-forecast">
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" id="day-forecast-icon" height="50" />
            <br>
           <strong>${formatDay(forecastDay.dt)}</strong> 
            <br>
           <span class="high-temp" id="forecast-high-temp">${Math.round(
             forecastDay.temp.max
           )}°F</span> | <span class="low-temp" id="forecast-low-temp">${Math.round(
          forecastDay.temp.min
        )}°F</span>
            <br>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function convertToF(event) {
  event.preventDefault();
  cConversion.classList.remove("active");
  fConversion.classList.add("active");
  let currentCity = document.querySelector("#current-city");
  let apiKey = "5515460eda5af0ed162ca73d5a84293d";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function convertToC(event) {
  event.preventDefault();
  cConversion.classList.add("active");
  fConversion.classList.remove("active");
  let currentCity = document.querySelector("#current-city");
  let apiKey = "5515460eda5af0ed162ca73d5a84293d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperatureC);
}

function showTemperatureC(response) {
  let heading = document.querySelector("#city-name");
  let temperatureH2 = document.querySelector("#day-zero-temperature");
  let weatherDescriptionData = document.querySelector("#day-zero-description");
  let weatherIconData = document.querySelector("#day-zero-icon");
  let windSpeedData = document.querySelector("#day-zero-wind-speed");
  let humidityData = document.querySelector("#day-zero-humidity");
  heading.innerHTML = response.data.name;
  temperatureH2.innerHTML = `${Math.round(response.data.main.temp)}`;
  weatherDescriptionData.innerHTML = `${response.data.weather[0].description}`;
  weatherIconData.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  windSpeedData.innerHTML = `${Math.round(response.data.wind.speed)} kph`;
  humidityData.innerHTML = `${response.data.main.humidity}%`;
  getForecastC(response.data.coord);
}

function getForecastC(coordinates) {
  let apiKey = "5515460eda5af0ed162ca73d5a84293d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecastC);
}

function displayForecastC(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastHTML =
        forecastHTML +
        `<div class="col day-forecast">
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" id="day-forecast-icon" height="50" />
            <br>
           <strong>${formatDay(forecastDay.dt)}</strong> 
            <br>
           <span class="high-temp" id="forecast-high-temp">${Math.round(
             forecastDay.temp.max
           )}°C</span> | <span class="low-temp" id="forecast-low-temp">${Math.round(
          forecastDay.temp.min
        )}°C</span>
            <br>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let currentDateTime = document.querySelector("#current-date");
currentDateTime.innerHTML = currentTime(new Date());

let changeCityForm = document.querySelector("#change-city");
changeCityForm.addEventListener("submit", changeCity);

let fConversion = document.querySelector("#f-conversion");
fConversion.addEventListener("click", convertToF);

let cConversion = document.querySelector("#c-conversion");
cConversion.addEventListener("click", convertToC);

let hiddenConversion = document.querySelector("#hidden-text");

search("Atlanta");
