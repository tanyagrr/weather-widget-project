let weatherData = {};
let temperature;
let feelsLike;
let weatherDescription;
let humidity;
let pressure;
let wind;
let description;
let icon;
const refreshBtn = document.querySelector(".refresh");

async function fetchData() {
    try {
        const result = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=46.48&lon=30.73&appid=326412c905971ea74646f79d8b0f554e");
        const data = await result.json();
        weatherData = data;
        processWeatherData();
        renderWeather();
    } catch {
        console.log("Error");
    }
}
fetchData();

function processWeatherData() {
    temperature = Math.round(weatherData.main.temp - 273.15);
    feelsLike = Math.round(weatherData.main.feels_like - 273.15);
    weatherDescription = weatherData.weather[0].description;
    humidity = weatherData.main.humidity + "%";
    pressure = weatherData.main.pressure + " hPa";
    wind = Math.round(weatherData.wind.speed) + " km/h";
    description = weatherData.weather[0].description;
    icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
}

function renderDate() {
    const now = new Date();
    const dateOptions = {
    month: "short",  
    day: "numeric",
    year: "numeric"
    };

    const dayOptions = {
    weekday: "short"
    };

    const datePart = now.toLocaleDateString("en-US", dateOptions);
    const dayPart = now.toLocaleDateString("en-US", dayOptions);

    const dateSpan = document.querySelector(".date");
    dateSpan.textContent = `${datePart} - ${dayPart}`;
}

function renderTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeSpan = document.querySelector(".time");
    timeSpan.textContent = `${hours}:${minutes.toString().padStart(2, "0")}`;
}


function renderWeather() {
    const humiditySpan = document.querySelector(".humidity");
    humiditySpan.textContent = `Humidity: ${humidity}`;
    const pressureSpan = document.querySelector(".pressure");
    pressureSpan.textContent = `Pressure: ${pressure}`;
    const windSpan = document.querySelector(".wind");
    windSpan.textContent = `Wind: ${wind}`;
    const temperatureSpan = document.querySelector(".temperature");
    temperatureSpan.textContent = `${temperature}°C`;
    const feelsLikeSpan = document.querySelector(".feels-like");
    feelsLikeSpan.textContent = `Feels like: ${feelsLike}°C`;
    const descriptionSpan = document.querySelector(".description");
    descriptionSpan.textContent = description;
    const iconSpan = document.querySelector(".icon");
    iconSpan.setAttribute("src", icon);
}

function displayData() {
    renderDate();
    renderTime();
}

displayData();

refreshBtn.addEventListener("click", function() {
    fetchData();
    displayData();
})