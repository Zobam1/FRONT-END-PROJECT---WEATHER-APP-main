//function to modify the html elements to suit the current weather of city
function showCurrent(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let temp = Math.round(response.data.temperature.current);
  let temps = document.querySelector("#temps");
  temps.innerHTML = temp;
  let status = document.querySelector("#condition");
  status.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  let iconUrl = response.data.condition.icon_url;
  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `<img src=${iconUrl} alt="weather-icon">`;
  let grabDate = document.querySelector("#date");
  let urlDate = new Date(response.data.time * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[urlDate.getDay()];
  let hour = urlDate.getHours();
  let minute = urlDate.getMinutes();
  grabDate.innerHTML = `${day}, ${hour}:${minute}`;
}
//create a function to extract day from api
function getUrlDay(urltime) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let newDay = new Date(urltime * 1000);
  return days[newDay.getDay()];
}

//function to change html elements for forecast section
function showForecast(response) {
  let forecastDays = response.data.daily;
  let forecastSectionInnerHtml = "";
  forecastDays.forEach(function (row, index) {
    if (index < 5) {
      let forecastSection = document.querySelector("#forecast-section");
      let day = getUrlDay(row.time);
      let imageUrl = row.condition.icon_url;
      let minTemp = row.temperature.minimum;
      let maxTemp = row.temperature.maximum;
      forecastSectionInnerHtml =
        forecastSectionInnerHtml +
        `<span
          ><div>${day}</div>
          <img src=${imageUrl} />
          <div><span class ="forecast-maxdegree">${Math.round(
            maxTemp
          )}° </span><span class="forecast-mindegree"> ${Math.round(
          minTemp
        )}°</span></div></span
        >`;
      forecastSection.innerHTML = forecastSectionInnerHtml;
    }
  });
}
//function to get the url of both current and forecast weather api
function callAxios(event) {
  event.preventDefault();
  let city1 = document.querySelector("#city-input");
  city1 = city1.value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city1}&key=at32a2043d2f18b00363437fb0ffa1ob&units=metric`;
  let urlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city1}&key=at32a2043d2f18b00363437fb0ffa1ob&units=metric`;
  axios.get(urlForecast).then(showForecast);
  axios.get(url).then(showCurrent);
}

//to grab the form element and listen for any event, then take the event to call axios function
let grabForm = document.querySelector("#form");
grabForm.addEventListener("submit", callAxios);

//get Paris current and forecast url and run it through the showCurrent function to display after loading website
axios
  .get(
    "https://api.shecodes.io/weather/v1/current?query=paris&key=at32a2043d2f18b00363437fb0ffa1ob&units=metric"
  )
  .then(showCurrent);
axios
  .get(
    "https://api.shecodes.io/weather/v1/forecast?query=paris&key=at32a2043d2f18b00363437fb0ffa1ob&units=metric"
  )
  .then(showForecast);

//to create a section for the html element that will contain the forcast.
