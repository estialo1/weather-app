function updateWeather(response) {
 
  let temperatureElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector ("#city");
  let descriptionElement = document.querySelector ("#description");
  let humidityElement = document.querySelector ("#Humidity");
  let windElement = document.querySelector ("#Wind");
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time*1000);
  let iconElement = document.querySelector("#icon");
  let iconImg = document.querySelector("#icon-img");
  
 

iconImg.src = response.data.condition.icon_url  ; 
  dateElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
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
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursaday", 
    "Friday", 
    "Saturday"];

    let formattedDay = days[date.getDay()];
    return `${formattedDay} ${hours}:${minutes}`;
}



function searchCity(city) {
  let apiKey = "caa1c809706c840c6bbeatfb4oa35a77";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);

}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  searchCity(searchInput.value)
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let  days= ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
 return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "caa1c809706c840c6bbeatfb4oa35a77"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}


function displayForecast(response) {
  console.log(response.data);
  
  let forcastHtml = "";


  response.data.daily.forEach (function (day, index) {
    if (index < 5) {
    forcastHtml +=
     
    `
   <div class = "weather-forcast-day">
      <div class = "weather-forcast-date">${formatDay(day.time)}</div>
      <div class = "weather-forcast-icon">
      <img src = "${day.condition.icon_url}" width = "85px" />
      </div>
      <div class = "weather-forcast-temperatures"></div>
      <div class = "weather-forcast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong> 
        <span class = "weather-forcast-temperature">${Math.round(day.temperature.minimum)}°</span>
      </div>
    </div>
 `;
    }
 });

  let forcastElement = document.querySelector("#forcast");
  forcastElement.innerHTML = forcastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("China");
