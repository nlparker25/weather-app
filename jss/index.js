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

let currentDateTime = document.querySelector("#current-date");
currentDateTime.innerHTML = currentTime(new Date());

function changeCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let apiKey = "5515460eda5af0ed162ca73d5a84293d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  cTemperature = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let weatherIcon = response.data.weather[0].icon;
  let windSpeed = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let city = response.data.name;
  let heading = document.querySelector("#city-name");
  let temperatureH2 = document.querySelector("#day-zero-temperature");
  let weatherDescriptionData = document.querySelector("#day-zero-description");
  let weatherIconData = document.querySelector("#day-zero-icon");
  let windSpeedData = document.querySelector("#day-zero-wind-speed");
  let humidityData = document.querySelector("#day-zero-humidity");
  temperatureH2.innerHTML = `${cTemperature}`;
  weatherDescriptionData.innerHTML = `${weatherDescription}`;
  weatherIconData.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  windSpeedData.innerHTML = `${windSpeed} km/h`;
  humidityData.innerHTML = `${humidity}%`;
  heading.innerHTML = city;
}

let changeCityForm = document.querySelector("#change-city");
changeCityForm.addEventListener("submit", changeCity);

let buttonGeolocate = document.querySelector(".geolocate-button");
buttonGeolocate.addEventListener("click", geolocate);

function geolocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "5515460eda5af0ed162ca73d5a84293d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function convertToF(event) {
  event.preventDefault();
  let fTemperature = Math.round((cTemperature * 9) / 5 + 32);
  let temperatureH2 = document.querySelector("#day-zero-temperature");
  cConversion.classList.remove("active");
  fConversion.classList.add("active");
  temperatureH2.innerHTML = `${fTemperature}`;
}

function revertToC(event) {
  event.preventDefault();
  let temperatureH2 = document.querySelector("#day-zero-temperature");
  cConversion.classList.add("active");
  fConversion.classList.remove("active");
  temperatureH2.innerHTML = cTemperature;
}

let fConversion = document.querySelector("#f-conversion");
fConversion.addEventListener("click", convertToF);

let cTemperature = null;

let cConversion = document.querySelector("#c-conversion");
cConversion.addEventListener("click", revertToC);
