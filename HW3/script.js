const API_KEY = '5481258e8584bdbe98025c95b449e62b'; 

// UI elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const errorMessage = document.getElementById('errorMessage');
const weatherResult = document.getElementById('weatherResult');

// Handle form submit
weatherForm.addEventListener('submit', function(event) {
    event.preventDefault(); // stop page refresh
    
    const cityName = cityInput.value.trim();

    // Check if input is empty
    if (cityName === "") {
        errorMessage.textContent = "Please enter a city name! It cannot be empty.";
        weatherResult.classList.add('hidden');
        return; 
    }

    // Clear old errors and fetch data
    errorMessage.textContent = "";
    fetchWeatherData(cityName);
});

// Get data from API
function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(url)
        .then(response => {
            // Check if city exists
            if (!response.ok) {
                throw new Error("City not found. Please check your spelling.");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            errorMessage.textContent = error.message;
            weatherResult.classList.add('hidden');
        });
}

// Show info on the page
function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('windSpeed').textContent = data.wind.speed;

    // Pick emoji based on weather condition
    const mainWeather = data.weather[0].main; 
    const iconElement = document.getElementById('weatherIcon');

    if (mainWeather === "Clear") {
        iconElement.textContent = "☀️";
    } else if (mainWeather === "Clouds") {
        iconElement.textContent = "☁️";
    } else if (mainWeather === "Rain" || mainWeather === "Drizzle") {
        iconElement.textContent = "🌧️";
    } else if (mainWeather === "Thunderstorm") {
        iconElement.textContent = "⛈️";
    } else if (mainWeather === "Snow") {
        iconElement.textContent = "❄️";
    } else {
        iconElement.textContent = "✨"; 
    }

    // Show result block
    weatherResult.classList.remove('hidden');
}