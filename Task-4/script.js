const API_KEY = "d1fc989e444e098009af4c5b557bd2ff";

let searchBtn = document.getElementById("search-btn");
let cityInput = document.getElementById("city-input");

let temp = document.getElementById("temperature");
let cityEl = document.getElementById("city");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind-speed");

let error = document.getElementById("error-message");

searchBtn.addEventListener("click", () => {
    let cityValue = cityInput.value.trim();

    if (cityValue === "") {
        showError("Please enter a city name.");
        return;
    }

    getWeather(cityValue);
});

async function getWeather(cityValue) {
    try {
        error.textContent = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        temp.textContent = Math.round(data.main.temp) + "°C";
        cityEl.textContent = data.name;
        humidity.textContent = "Humidity: " + data.main.humidity + "%";
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + " m/s";

    } catch (err) {
        showError(err.message);
    }
}

function showError(message) {
    error.textContent = message;
}