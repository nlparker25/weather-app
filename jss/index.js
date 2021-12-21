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
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let heading = document.querySelector("#city-name");
  let temperatureH2 = document.querySelector("#full-temperature");
  temperatureH2.innerHTML = `${temperature}°F`;
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
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
