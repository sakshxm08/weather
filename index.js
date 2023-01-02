function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("weather").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=780a7148f84f612fa10e2531266d0faf"
  )
    .then((resp) => resp.json())
    .then((data) => drawWeather(data))
    .catch(function () {});
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function drawWeather(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    var description = d.weather[0].description;
    document.getElementById("description").innerHTML =
      capitalizeFirstLetter(description);
    document.getElementById("temp").innerHTML = celcius + " &deg;C";
    document.getElementById("location").innerHTML = d.name;
  }
}
window.onload = function () {
  getLocation();
};
