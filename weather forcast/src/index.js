const selector = (ev)=>document.querySelector(ev)
const log = console.log;
log(selector("#temp"))

function updateWeather(response) {
  let temperatureElement = selector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector ("#city");
  let descriptionElement = document.querySelector ("#description");
  let humidityElement = document.querySelector ("#Humidity");
  let windElement = document.querySelector ("#Wind");
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time*1000);
  
  console.log(response.data)

  dateElement.innerHTML = `${date.getDay} ${date.getHours}:${date.getMinutes}`
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes<10) {
    minutes = `0${minutes}`
  }

  if (hours<10) {
    hours =`0${hours}`
  }

  let days = [
    "Sunday", 
    "monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursaday", 
    "Friday", 
    "Saturday"];

    let formattedDay = days[day]
    return `${formattedDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);

}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("China");
